from django.db import models


class Provider(models.Model):
    name = models.CharField(max_length=255, unique=True)

    class Meta:
        verbose_name = "Provider"
        verbose_name_plural = "Providers"

    def __str__(self):
        return self.name

# Create your models here.
class Certification(models.Model):
    """
    Model for certification list
    """
    
    title = models.CharField(max_length=255)
    provider = models.ForeignKey(
        Provider, 
        on_delete=models.CASCADE, 
        related_name="certifications"
    )
    picture = models.ImageField(upload_to='certification_images/', blank=True, null=True)
    description = models.TextField(max_length=255, blank=True, null=True)
    credentials_link = models.URLField(max_length=200, null=True, blank=True)   

    def __str__(self):
        return self.title
    