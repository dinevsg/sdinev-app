# vanila/api_urls.py
from django.urls import path
from .views import ContactAPIView, AboutSectionAPIView, CVDownloadAPIView

app_name = "vanilla"

urlpatterns = [
    path("contact/", ContactAPIView.as_view(), name="contact"),
    path("about/", AboutSectionAPIView.as_view(), name="about"),
    path("cv/", CVDownloadAPIView.as_view(), name="cv"),
]