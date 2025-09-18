from django.contrib import admin
from .models import Category, BlogPost


class CategoryAdmin(admin.ModelAdmin):
    prepopulated_fields = {"slug": ("name",)}  # live slug from name

admin.site.register(Category, CategoryAdmin)


class BlogPostAdmin(admin.ModelAdmin):
    prepopulated_fields = {"slug": ("title",)}  # live slug from title
    list_display = ("title", "category", "published_at")
    list_filter = ("category",)
    search_fields = ("title", "content")

admin.site.register(BlogPost, BlogPostAdmin)