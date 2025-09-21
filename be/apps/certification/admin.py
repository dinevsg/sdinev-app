from django.contrib import admin
from .models import Certification, Provider
from django.utils.html import format_html

@admin.register(Provider)
class ProviderAdmin(admin.ModelAdmin):
    list_display = ['name']
    search_fields = ['name']


@admin.register(Certification)
class CertificationAdmin(admin.ModelAdmin):
    list_display = ['title', 'provider', 'picture_thumbnail']

    def picture_thumbnail(self, obj):
        if obj.picture:
            return format_html('<img src="{}" style="width: 50px; height: auto;" />', obj.picture.url)
        return "-"
    picture_thumbnail.short_description = 'Picture'