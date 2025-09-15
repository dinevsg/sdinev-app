from django.urls import path

from .views import LatestBlogPostsAPIView, AllBlogPostsAPIView, BlogPostDetailAPIView, CategoryPostsAPIView

app_name = 'blog'

urlpatterns = [
    path('latest/', LatestBlogPostsAPIView.as_view(), name='latest-posts'),  # Use the same view for latest posts
    path('', AllBlogPostsAPIView.as_view(), name='all-posts'),  # No trailing /
    path('<slug:category_slug>/<slug:slug>/', BlogPostDetailAPIView.as_view(), name='post-detail'),
    path('<slug:category_slug>/', CategoryPostsAPIView.as_view(), name='category-posts'),# Use slug instead of ID
]
