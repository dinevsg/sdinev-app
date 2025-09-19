from django.db import models
from ckeditor.fields import RichTextField
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status




class CV(models.Model):
    cv_file = models.FileField(upload_to='cv/')

    def __str__(self):
        # Show filename in admin instead of missing "name"
        return self.cv_file.name if self.cv_file else "No CV uploaded"


class AboutSection(models.Model):
    title = models.CharField(max_length=255)
    content = RichTextField()  # CKEditor field
    image = models.ImageField(upload_to="about/", blank=True, null=True)

    class Meta:
        verbose_name = "About Section"
        verbose_name_plural = "About Section"

    def __str__(self):
        return self.title
    