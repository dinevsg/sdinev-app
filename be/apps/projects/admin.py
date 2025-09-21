from django.contrib import admin
from .models import Project
# Register your models here.
@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    prepopulated_fields = {"slug": ("title",)}
    list_display = ('title',)
    search_fields = ('title', 'description', 'stack')