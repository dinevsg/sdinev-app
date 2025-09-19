from rest_framework import serializers
from .models import AboutSection
from .models import CV

class CVSerializer(serializers.ModelSerializer):
    cv_url = serializers.SerializerMethodField()

    class Meta:
        model = CV
        fields = ["id", "cv_url"]

    def get_cv_url(self, obj):
        request = self.context.get("request")
        if obj.cv_file:
            return request.build_absolute_uri(obj.cv_file.url)
        return None


class AboutSectionSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    cv_url = serializers.SerializerMethodField()

    class Meta:
        model = AboutSection
        fields = ['title', 'content', 'image', 'cv_url']

    def get_image(self, obj):
        request = self.context.get("request")
        if obj.image:
            return request.build_absolute_uri(obj.image.url)
        return None
    
    def get_cv_url(self, obj):
        request = self.context.get('request')
        cv = CV.objects.first()  # get the first CV in the DB
        if cv and cv.cv_file and request:
            return request.build_absolute_uri(cv.cv_file.url)
        return None