from django.views.generic import ListView, DetailView
from django.shortcuts import get_object_or_404
from .models import BlogPost, Category
from django.core import serializers
from rest_framework.generics import ListAPIView, RetrieveAPIView
from .models import BlogPost
from .serializers import BlogPostSerializer
from rest_framework import viewsets

# all posts for /blog
class AllBlogPostsAPIView(ListAPIView):
    queryset = BlogPost.objects.all().order_by('-published_at')
    serializer_class = BlogPostSerializer


# posts by category for /blog/category
class CategoryPostsAPIView(ListAPIView):
    serializer_class = BlogPostSerializer

    def get_queryset(self):
        category_slug = self.kwargs['category_slug']
        return BlogPost.objects.filter(category__slug=category_slug).order_by('-published_at')

# specific post for /blog/category/slug
class BlogPostDetailAPIView(RetrieveAPIView):
    serializer_class = BlogPostSerializer

    def get_queryset(self):
        return BlogPost.objects.all()

    def get_object(self):
        category_slug = self.kwargs['category_slug']
        post_slug = self.kwargs['slug']
        return get_object_or_404(
            BlogPost,
            slug=post_slug,
            category__slug=category_slug
        )
    
class LatestBlogPostsAPIView(ListAPIView):
    queryset = BlogPost.objects.order_by('-published_at')[:4]  # latest 4 posts
    serializer_class = BlogPostSerializer

    
# class BlogListView(ListView):
#     model = BlogPost
#     template_name = 'blog_list.html'  # Load all posts in blog.html
#     context_object_name = 'posts'
#     ordering = ['-published_at']

#     def get_context_data(self, **kwargs):
#         context = super().get_context_data(**kwargs)
#         context['categories'] = Category.objects.all()  # Get all categories
#         context['latest_blog_posts'] = BlogPost.objects.order_by('-id')[:4]  # Get latest 4 posts
#         context['categories_count'] = Category.objects.count()  # Count unique categories
#         return context
    

# class BlogDetailView(DetailView):
#     model = BlogPost
#     template_name = 'post_details.html'
#     context_object_name = 'post'

#     def get_object(self):
#         return get_object_or_404(BlogPost, slug=self.kwargs['slug'])  # Fetch by slug


# class CategoryDetailView(ListView):
#     model = Category
#     template_name = 'category_detail.html'
#     context_object_name = 'category'

#     def get_object(self):
#         return get_object_or_404(Category, slug=self.kwargs['slug'])
    

# class BlogPostViewSet(viewsets.ModelViewSet):
#     queryset = BlogPost.objects.all().order_by('-published_at')
#     serializer_class = BlogPostSerializer
#     lookup_field = 'slug'

