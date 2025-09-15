from rest_framework import serializers
from .models import BlogPost

class BlogPostSerializer(serializers.ModelSerializer):
    category = serializers.StringRelatedField()  # returns category name
    read_time = serializers.SerializerMethodField()
    category_slug = serializers.CharField(source='category.slug', read_only=True)  # returns category slug

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
            'published_at',
            'published_by',
            'read_time',
            'get_absolute_url',
        ]

    def get_read_time(self, obj):
        return obj.get_read_time()