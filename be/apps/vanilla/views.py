from django.core.mail import send_mail
from django.views.generic.edit import FormView
from django import forms
from django.shortcuts import render
from django.views.generic import TemplateView
from django.http import JsonResponse, HttpResponse
from apps.certification.models import Certification
from apps.blog.models import BlogPost
from .forms import ContactForm



class HomepageView(TemplateView):
    
    """
    A view for displaying the homepage of the website.
    
    This view renders the 'home.html' template and adds a context 
    variable with a welcome message.
    """
    
    template_name = 'home.html'  # Specify the template for the homepage



    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['latest_certifications'] = Certification.objects.order_by('-id')[:3]  # Fetch latest 3 certifications
        context['latest_blog_posts'] = BlogPost.objects.order_by('-id')[:4]
        return context


class ContactView(FormView):
    template_name = "contact.html"  # Make sure this is the correct template path
    form_class = ContactForm

    def form_valid(self, form):
        name = form.cleaned_data["name"]
        email = form.cleaned_data["email"]
        message = form.cleaned_data["message"]
        
        send_mail(
            subject=f"New Contact Form Submission from {name}",
            message=f"From: {email}\n\nName: {name}\n\nMessage:\n{message}",
            from_email=email,
            recipient_list=["dinevs@outlook.com"],  # Make sure this is the correct recipient
        )
        
        return HttpResponse("Thank you for your message! We will get back to you soon.")

    def form_invalid(self, form):
        return HttpResponse("There was an error with your submission. Please try again.")

# class YesView(TemplateView):
#     """
#     A view for displaying the yes page.
#     """
#     template_name = 'yes.html'  # Specify the template for the yes page