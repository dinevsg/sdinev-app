from django.urls import path
from .views import LatestCertificationsView, CertificationListView


urlpatterns = [
    path('', CertificationListView.as_view(), name='all-certifications'),
    path('latest/', LatestCertificationsView.as_view(), name='latest-certifications'),
]
