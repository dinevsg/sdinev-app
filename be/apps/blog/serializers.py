from rest_framework import serializers
from .models import BlogPost
import re
from django.conf import settings


# Function to convert plain-text numbered lists into HTML <ol>
def text_to_html(text: str) -> str:
    """
    Converts plain-text editor content into HTML:
    - Numbered lists (1., 2., 3.)
    - Bulleted lists (-, *)
    - Paragraphs
    - Preserves line breaks
    """
    lines = text.splitlines()
    html = []
    list_buffer = []
    list_type = None  # 'ol' or 'ul'

    def flush_list():
        nonlocal list_buffer, list_type
        if list_buffer:
            html.append(f"<{list_type}>{''.join(list_buffer)}</{list_type}>")
            list_buffer = []
            list_type = None

    for line in lines:
        stripped = line.strip()
        if not stripped:
            flush_list()
            html.append("<br/>")
            continue

        # Numbered list
        m_num = re.match(r'^\d+\.\s+(.*)', stripped)
        if m_num:
            if list_type != 'ol':
                flush_list()
                list_type = 'ol'
            list_buffer.append(f"<li>{m_num.group(1)}</li>")
            continue

        # Bulleted list (- or *)
        m_bul = re.match(r'^[-*]\s+(.*)', stripped)
        if m_bul:
            if list_type != 'ul':
                flush_list()
                list_type = 'ul'
            list_buffer.append(f"<li>{m_bul.group(1)}</li>")
            continue

        # Regular paragraph line
        flush_list()
        html.append(f"<p>{stripped}</p>")

        
    flush_list()
    return ''.join(html)


class BlogPostSerializer(serializers.ModelSerializer):
    category = serializers.StringRelatedField()
    read_time = serializers.SerializerMethodField()
    category_slug = serializers.CharField(source='category.slug', read_only=True)
    content_html = serializers.SerializerMethodField()  # only once

    class Meta:
        model = BlogPost
        fields = [
            'id',
            'title',
            'slug',
            'category_slug',
            'picture',
            'category',
            'content',
            'content_html',
            'published_at',
            'published_by',
            'read_time',
            'get_absolute_url',
        ]

    def get_read_time(self, obj):
        return obj.get_read_time()

    def get_content_html(self, obj):
        request = self.context.get("request")  # <-- safer
        base_url = request.build_absolute_uri(settings.MEDIA_URL) if request else settings.MEDIA_URL
        html = obj.content
        html = html.replace('src="/media/', f'src="{base_url}')
        return html