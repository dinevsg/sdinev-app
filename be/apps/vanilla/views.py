from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from utils.send_email import send_email_via_sendgrid
from .models import AboutSection, CV
from .serializers import AboutSectionSerializer, CVSerializer
from django.http import FileResponse, Http404
from .models import CV



class ContactAPIView(APIView):
    def post(self, request):
        first_name = request.data.get("firstName", "").strip()
        last_name = request.data.get("lastName", "").strip()
        email = request.data.get("email", "").strip()
        message = request.data.get("message", "").strip()

        # Validate required fields
        if not first_name or not last_name or not email or not message:
            return Response(
                {"error": "All fields are required."}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        full_name = f"{first_name} {last_name}"
        email_subject = f"New Contact Form Submission from {full_name}"
        email_content = f"From: {full_name} <{email}>\n\nMessage:\n{message}"
        recipient = "sd@sdinev.com"  # your inbox

        try:
            sent = send_email_via_sendgrid(
                subject=email_subject,
                content=email_content,
                to_email=recipient  # <-- use to_email, not recipient_email
            )

            if not sent:
                raise Exception("SendGrid rejected the email")

        except Exception as e:
            return Response(
                {"error": f"Failed to send email: {str(e)}"}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        return Response({"success": "Message sent successfully!"}, status=status.HTTP_200_OK)

class AboutSectionAPIView(APIView):
    def get(self, request):
        about = AboutSection.objects.first()  # get first AboutSection
        serializer = AboutSectionSerializer(about, context={'request': request})
        return Response(serializer.data)


class CVDownloadAPIView(APIView):
    """
    Serve the latest uploaded CV at /cv
    """
    def get(self, request):
        cv = CV.objects.order_by('-id').first()  # latest CV
        if not cv or not cv.cv_file:
            raise Http404("CV not found")
        
        response = FileResponse(
            cv.cv_file.open(),
            as_attachment=True,
            filename=cv.cv_file.name.split('/')[-1]  # keep original uploaded filename
        )
        return response