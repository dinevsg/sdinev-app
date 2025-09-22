from django.db import models
from django.utils.text import slugify
from ckeditor_uploader.fields import RichTextUploadingField
from django.urls import reverse
import math
from django.utils.html import strip_tags

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(unique=True, blank=True)
    tag = models.CharField(max_length=100, unique=True, blank=False, null=False)
    
    class Meta:
        verbose_name_plural = "Categories"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name
    
    
class BlogPost(models.Model):
    """
    Model for blog posts
    """

    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, blank=True)  # Slug for URL
    picture = models.ImageField(upload_to='blog_images/', blank=True, null=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='blog_posts')
    content = RichTextUploadingField()
    published_at = models.DateTimeField(auto_now_add=True)
    published_by = models.CharField(max_length=255, default="S. Dinev")

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)  # Auto-generate slug from title
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title
    
    def get_absolute_url(self):
        return reverse("blog:post-detail",
                kwargs={
                    "category_slug": self.category.slug,
                    "slug": self.slug
                }
            )
    
    def get_read_time(self):
        plain_text = strip_tags(self.content)
        word_count = len(plain_text.split())
        reading_speed = 200  # Average reading speed (words per minute)
        read_time = math.ceil(word_count / reading_speed)
        return read_time