from django.shortcuts import render

from .models import Certification
from rest_framework import status
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Certification
from .serializers import CertificationSerializer



# class CertificationViewSet(viewsets.ModelViewSet):
#     queryset = Certification.objects.all()
#     serializer_class = CertificationSerializer

#     def get_serializer_context(self):
#         context = super().get_serializer_context()
#         context.update({"request": self.request})
#         return context

class CertificationListView(APIView):
    def get(self, request):
        certifications = Certification.objects.all()
        serializer = CertificationSerializer(certifications, many=True, context={"request": request})
        return Response(serializer.data, status=status.HTTP_200_OK)

class LatestCertificationsView(APIView):
    def get(self, request):
        certifications = Certification.objects.all().order_by('-id')[:3]
        serializer = CertificationSerializer(certifications, many=True, context={"request": request})
        return Response(serializer.data)