from rest_framework import viewsets
from .models import Project
from .serializers import ProjectSerializer
from rest_framework import generics

class AllProjectsAPIView(generics.ListAPIView):
    queryset = Project.objects.all().order_by('-id')  # newest first
    serializer_class = ProjectSerializer

# Return last 3-4 projects for frontpage
class LatestProjectsAPIView(generics.ListAPIView):
    serializer_class = ProjectSerializer

    def get_queryset(self):
        return Project.objects.all().order_by('-id')[:4]  # latest 4 projects