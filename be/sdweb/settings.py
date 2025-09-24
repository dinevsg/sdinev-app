from pathlib import Path
import os
from dotenv import load_dotenv

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Load .env file
load_dotenv()

SECRET_KEY = os.environ.get("SECRET_KEY")
# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.environ.get("DEBUG", "False") == "True"

ALLOWED_HOSTS = os.environ.get("ALLOWED_HOSTS", "*").split(", ")


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'django_browser_reload',
    'rest_framework',
    'corsheaders',
    'storages',

    'apps.certification',
    'apps.blog',
    'apps.vanilla',
    # 'apps.hub',
    'apps.projects',
    
    'ckeditor',
    'widget_tweaks',
    'taggit',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django_browser_reload.middleware.BrowserReloadMiddleware',
    'corsheaders.middleware.CorsMiddleware',
]

ROOT_URLCONF = 'sdweb.urls'

CORS_ALLOWED_ORIGINS = [
    origin.strip() for origin in os.environ.get("CORS_ALLOWED_ORIGINS", "").split(",")
]
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            BASE_DIR / 'templates',
            ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'sdweb.wsgi.application'

# Database
# https://docs.djangoproject.com/en/5.1/ref/settings/#databases

# if postgres is not configured, use sqlite
DATABASES = {
    'default': {
        'ENGINE': os.environ.get("DB_ENGINE", "django.db.backends.sqlite3"),
        'NAME': os.environ.get("DB_NAME", BASE_DIR / "db.sqlite3"),
        'USER': os.environ.get("DB_USER", ""),
        'PASSWORD': os.environ.get("DB_PASSWORD", ""),
        'HOST': os.environ.get("DB_HOST", "localhost"),
        'PORT': os.environ.get("DB_PORT", "5432"),
        "OPTIONS": {
            "sslmode": os.environ.get("DB_SSLMODE", "require").strip()
        }
    }
}


# Password validation
# https://docs.djangoproject.com/en/5.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.1/howto/static-files/

STATIC_URL = 'static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_DIRS = [
    BASE_DIR / 'static',
]
# STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# # Use Supabase (S3) as default storage
# DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'

# AWS_ACCESS_KEY_ID = os.environ.get("SUPABASE_ACCESS_KEY")
# AWS_SECRET_ACCESS_KEY = os.environ.get("SUPABASE_SECRET_KEY")
# AWS_STORAGE_BUCKET_NAME = os.environ.get("SUPABASE_BUCKET_NAME")
# AWS_S3_ENDPOINT_URL = "https://tlveapgzoxcunhpwzxup.storage.supabase.co/storage/v1/s3"
# AWS_QUERYSTRING_AUTH = False  # Set True if bucket is private

STORAGES = {
    "staticfiles": {
        "BACKEND": "django.contrib.staticfiles.storage.StaticFilesStorage",
    },
    "default": {
        "BACKEND": "storages.backends.s3boto3.S3Boto3Storage",
        # if DEBUG
#         # else "storages.backends.s3boto3.S3Boto3Storage",
        "OPTIONS": {
            "access_key": os.environ.get("SUPABASE_S3_ACCESS_KEY_ID"),
            "secret_key": os.environ.get("SUPABASE_S3_SECRET_ACCESS_KEY"),
            "bucket_name": os.environ.get("SUPABASE_S3_BUCKET_NAME"),
            "region_name": os.environ.get("SUPABASE_S3_REGION_NAME"),
            "endpoint_url": os.environ.get("SUPABASE_S3_ENDPOINT_URL"),
        },
    },
}


# STORAGES = {
#     # Default storage → Supabase S3 (via django-storages)
#     "default": {
#         "BACKEND": "storages.backends.s3boto3.S3Boto3Storage"
#         # if DEBUG
#         # else "storages.backends.s3boto3.S3Boto3Storage",
#     },
#     # Static files
#     "staticfiles": {
#         "BACKEND": "django.contrib.staticfiles.storage.StaticFilesStorage"
#         if DEBUG
#         else "whitenoise.storage.CompressedManifestStaticFilesStorage",
#     },
# }

# AWS_ACCESS_KEY_ID = os.environ.get("SUPABASE_S3_ACCESS_KEY_ID")
# AWS_SECRET_ACCESS_KEY = os.environ.get("SUPABASE_S3_SECRET_ACCESS_KEY")
# AWS_STORAGE_BUCKET_NAME = os.environ.get("SUPABASE_S3_BUCKET_NAME")
# AWS_S3_REGION_NAME = os.environ.get("SUPABASE_S3_REGION_NAME")
# AWS_S3_ENDPOINT_URL = os.environ.get("SUPABASE_S3_ENDPOINT_URL")
# AWS_QUERYSTRING_AUTH = False  # Set True if your bucket is private


# media_url could be removed if using only S3
# MEDIA_URL = f"https://tlveapgzoxcunhpwzxup.supabase.co/storage/v1/object/public/sdinev-media/"
# MEDIA_ROOT = BASE_DIR / 'media'

if DEBUG:
    # Local dev
    MEDIA_ROOT = BASE_DIR / "media"
    MEDIA_URL = "/media/"
else:
    # Production (Supabase S3)
    MEDIA_ROOT = None  # not used
    MEDIA_URL = f"https://tlveapgzoxcunhpwzxup.supabase.co/storage/v1/object/public/sdinev-media/"


# Default primary key field type
# https://docs.djangoproject.com/en/5.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# APPEND_SLASH = False

CKEDITOR_CONFIGS = {
    "default": {
        "toolbar": "Full",
        "height": 400,
        "width": "100%",
        "extraPlugins": "uploadimage, liststyle, indentblock, colorbutton, font",
        "wordcount": {
            "showCharCount": True,
            "maxCharCount": 430
        },  
        "toolbar_Full": [
            {"name": "clipboard", "items": ["Undo", "Redo"]},
            {"name": "styles", "items": ["Format", "Font", "FontSize"]},
            {"name": "basicstyles", "items": ["Bold", "Italic", "Underline", "Strike", "RemoveFormat", "TextColor", "BGColor"]},
            {"name": "paragraph", "items": ["NumberedList", "BulletedList", "Outdent", "Indent", "Blockquote"]},
            {"name": "insert", "items": ["Image", "Table", "HorizontalRule", "Link", "Unlink"]},
            {"name": "editing", "items": ["Scayt"]},
            {"name": "tools", "items": ["Maximize", "Source"]},
        ],
        "format_tags": "p;h1;h2;h3;pre",
        "removePlugins": "stylesheetparser",
        "allowedContent": True,  # allow all HTML tags
    }
}


CKEDITOR_UPLOAD_PATH = "blog_images/"
CKEDITOR_ALLOW_NONIMAGE_FILES = False


# Email backend
EMAIL_BACKEND = "anymail.backends.sendgrid.EmailBackend"
ANYMAIL = {
    "SENDGRID_API_KEY": os.environ.get("SENDGRID_API_KEY"),
}
DEFAULT_FROM_EMAIL = os.environ.get("DEFAULT_FROM_EMAIL")
EMAIL_TIMEOUT = 10

