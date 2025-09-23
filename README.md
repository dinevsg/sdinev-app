# S. Dinev Personal Website

A full-stack personal website showcasing my projects, apps, and certificates.  
Built with Django, Django REST Framework, React, Tailwind CSS, and PostgreSQL,  
fully deployed with custom domain.



## Features

- Dynamic Content: Projects, Certifications, and Blog are editable via Django Admin
- Rich Text Descriptions: CKEditor with character limits and optional word count
- Frontend SPA: React + Tailwind CSS for fast, responsive UI
- Backend API: Django REST Framework provides endpoints
- Secure Configurations: Environment-driven `ALLOWED_HOSTS`, `CORS_ALLOWED_ORIGINS`, DB credentials, secret keys, and email API keys via `.env` for security
- Email Integration: SendGrid for contact forms.
- Error Handling & Validation: Robust input validation and API error catching.
- CORS & HTTPS: Proper cross-origin handling and secure connections.



## Tech Stack

- Backend: Django, Django REST Framework, CKEditor, Taggit, PostgreSQL
- Frontend: React, Tailwind CSS
- Dev Tools: Poetry, dotenv
- Email: SendGrid



## Project Highlights

- Seamless integration between React frontend and Django backend APIs.
- Fully production-ready with SSL, secure backend, and dynamic, editable content.
- Editable About Page: Update personal bio and info directly from Django Admin.
- Custom Certificates: Add or remove certificate providers and details via Admin.
- CV / Resume Upload: Upload or update your CV directly from Django Admin.
- Blog / Content Management: Create custom blog categories, manage posts, and feature content dynamically.
- Projects & Apps Management: Add, edit, or remove projects and apps with rich text descriptions and tags.
- Debug / Dev Support: django-browser-reload enabled for fast frontend/backend iteration during development



### Notes

This project demonstrates best practices for full-stack development, secure deployment, and modern frontend-backend integration with a focus on maintainability and dynamic content management.