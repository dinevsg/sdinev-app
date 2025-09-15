from django.db import models

# Create your models here.
class CV(models.Model):
    cv_file = models.FileField(upload_to='cv/')

    def __str__(self):
        return self.name
    
    