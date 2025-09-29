from rest_framework import serializers
from .models import BlogPost
import re
from django.conf import settings
from bs4 import BeautifulSoup

# Function to convert plain-text numbered lists into HTML <ol>
def text_to_html(text: str) -> str:
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


def clean_blog_html(html_content):
    soup = BeautifulSoup(html_content, "html.parser")

    # Clean headings
    for heading in soup.find_all(["h1", "h2", "h3", "h4", "h5", "h6"]):
        if heading.has_attr("style"):
            del heading["style"]

        for child in heading.find_all(True):
            # Convert <span style="font-weight:bold"> → <strong>
            if child.name == "span" and "font-weight:bold" in (child.get("style") or ""):
                child.name = "strong"
                del child["style"]

            # Convert <span style="font-style:italic"> → <em>
            elif child.name == "span" and "font-style:italic" in (child.get("style") or ""):
                child.name = "em"
                del child["style"]

            # Convert <span style="text-decoration:underline"> → <u>
            elif child.name == "span" and "underline" in (child.get("style") or ""):
                child.name = "u"
                del child["style"]

            # If style exists but not a font style, just drop it
            elif child.has_attr("style"):
                del child["style"]

    # Clean <p>
    for p in soup.find_all("p"):
        if p.has_attr("style"):
            del p["style"]

    return str(soup)


class BlogPostSerializer(serializers.ModelSerializer):
    category = serializers.StringRelatedField()
    read_time = serializers.SerializerMethodField()
    category_slug = serializers.CharField(source='category.slug', read_only=True)
    content_html = serializers.SerializerMethodField()  # cleaned HTML

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
        request = self.context.get("request")
        base_url = request.build_absolute_uri(settings.MEDIA_URL) if request else settings.MEDIA_URL
        html = obj.content
        html = html.replace('src="/media/', f'src="{base_url}')
        # Clean headings and paragraphs
        html = clean_blog_html(html)
        return html