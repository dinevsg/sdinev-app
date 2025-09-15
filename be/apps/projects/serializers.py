from rest_framework import serializers
from .models import Project
from bs4 import BeautifulSoup

class ProjectSerializer(serializers.ModelSerializer):
    stack = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field="name"  # this way you get ["Python", "Django", "Tailwind"]
    )
    
     # Use SerializerMethodField for description
    description = serializers.SerializerMethodField()


    class Meta:
        model = Project
        fields = ["id", "title", "slug", "picture", "description", "stack", "github_link", "live_link"]

    def get_description(self, obj):
        if not obj.description:
            return ""
        # Use BeautifulSoup to extract only text, stripping all HTML tags
        soup = BeautifulSoup(obj.description, "html.parser")
        text = soup.get_text(separator=" ", strip=True)
        return text