from django.db.models.signals import pre_save, post_delete
from django.dispatch import receiver
from django.core.files.storage import default_storage
from django.db.models import Model
import os

@receiver(pre_save)
def delete_old_picture(sender, instance, **kwargs):
    """Deletes old picture file when a new one is uploaded."""
    if not hasattr(instance, 'picture'):
        return

    if not instance.pk:
        # New instance, no old picture to delete
        return

    try:
        old_instance = sender.objects.get(pk=instance.pk)
    except sender.DoesNotExist:
        return

    old_picture = old_instance.picture
    new_picture = instance.picture

    # Check if old picture exists and is different from new one
    if old_picture and old_picture != new_picture:
        if old_picture.name and default_storage.exists(old_picture.name):
            default_storage.delete(old_picture.name)


@receiver(post_delete)
def delete_picture_on_delete(sender, instance, **kwargs):
    """Delete the picture when the object is deleted."""
    if not hasattr(instance, 'picture'):
        return

    picture = instance.picture
    if picture and hasattr(picture, 'name') and default_storage.exists(picture.name):
        default_storage.delete(picture.name)