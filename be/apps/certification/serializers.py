from rest_framework import serializers
from .models import Certification

class CertificationSerializer(serializers.ModelSerializer):
    picture = serializers.SerializerMethodField()
    provider = serializers.CharField(source='provider.name', read_only=True)

    class Meta:
        model = Certification
        fields = ['id', 'title', 'provider', 'picture', 'description', 'credentials_link']

    def get_picture(self, obj):
        request = self.context.get('request')
        if obj.picture and hasattr(obj.picture, 'url'):
            return request.build_absolute_uri(obj.picture.url)
        return None