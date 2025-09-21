from django.db import models
from ckeditor.fields import RichTextField
from django.utils.text import slugify
from taggit.managers import TaggableManager
from django.core.exceptions import ValidationError



def validate_max_430(value):
    if len(value) > 430:
        raise ValidationError("Description cannot exceed 430 characters.")

# Create your models here.
class Project(models.Model):
    title = models.CharField(max_length=255, default="Untitled Project")
    slug = models.SlugField(unique=True, blank=True)  # Slug for URL
    picture = models.ImageField(upload_to='project_images/', blank=True, null=True)
    description = RichTextField(validators=[validate_max_430])
    stack = TaggableManager(help_text="Technologies used (e.g. python, django, tailwind)")
    github_link = models.URLField(blank=True, null=True)
    live_link = models.URLField(blank=True, null=True, help_text="Optional: link to live demo or deployed app")

    class Meta:
        verbose_name = "Project"
        verbose_name_plural = "Projects"

    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)
