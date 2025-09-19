from django.contrib import admin
from .models import CV, AboutSection

@admin.register(CV)
class CVAdmin(admin.ModelAdmin):
    list_display = ("id",)  # adjust depending on CV fields

@admin.register(AboutSection)
class AboutSectionAdmin(admin.ModelAdmin):
    list_display = ("title",)  # removed extra bracket