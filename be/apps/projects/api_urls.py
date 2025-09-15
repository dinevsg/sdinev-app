from django.urls import path
from .views import LatestProjectsAPIView, AllProjectsAPIView

app_name = 'projects'

urlpatterns = [
    path('', AllProjectsAPIView.as_view(), name='all-projects'),           # GET all projects
    path('latest/', LatestProjectsAPIView.as_view(), name='latest-projects'),  # GET last 3-4 projects
]