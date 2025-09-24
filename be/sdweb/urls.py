from django.conf.urls import handler404
from django.shortcuts import render
from django.contrib import admin
from django.urls import path, include
from django.conf import settings  # Import settings from django.conf
from django.conf.urls.static import static # Import static from django.conf.urls.static


def custom_404_view(request, exception):
    return render(request, "404.html", status=404)

handler404 = custom_404_view

urlpatterns = [
    path("__reload__/", include("django_browser_reload.urls")),
    path('admin/', admin.site.urls),

    # Add your API routes here under 'api/' path to keep it separate from your normal views
    path('api/certifications/', include('apps.certification.api_urls')),
    path('api/blog/', include('apps.blog.api_urls', namespace="blog")),
    path('api/projects/', include('apps.projects.api_urls', namespace="projects")),
    path("api/vanilla/", include("apps.vanilla.api_urls", namespace="vanilla")),
    path('ckeditor/', include('ckeditor_uploader.urls')),

]

if settings.DEBUG:

    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    
# else:
# # Production: Let Whitenoise serve media files
#     from django.views.static import serve

#     urlpatterns += [
#         path('media/<path:path>', serve, {'document_root': settings.MEDIA_ROOT}),
#     ]
