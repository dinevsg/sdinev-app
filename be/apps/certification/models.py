from django.db import models

# Create your models here.
class Certification(models.Model):
    """
    Model for certification list
    """
    
    title = models.CharField(max_length=255)
    provider = models.CharField(max_length=100)
    picture = models.ImageField(upload_to='certification_images/', blank=True, null=True)
    description = models.TextField(max_length=255, blank=True, null=True)
    credentials_link = models.URLField(max_length=200, null=True, blank=True)

    # def save(self, *args, **kwargs):
    #     if not self.slug:
    #         self.slug = slugify(self.title)  # Auto-generate slug from title
    #     super().save(*args, **kwargs)

    def __str__(self):
        return self.title