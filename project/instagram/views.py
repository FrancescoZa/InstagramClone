from django.shortcuts import render
from rest_framework import viewsets
from .serializers import UserSerializer
from .serializers import PostSerializer
from .serializers import LikeSerializer
from .serializers import CommentSerializer
from .serializers import StorySerializer

from .models import User
from .models import Post
from .models import Like
from .models import Comment
from .models import Story

from django.contrib.auth import get_user_model
from rest_framework import generics
# Create your views here.

class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer

    def get_queryset(self):
        user_id = self.request.GET.get('id')
        if user_id == '-1':
            return User.objects.all()
        else:
            return User.objects.filter(id = user_id)

class PostViewSet(viewsets.ModelViewSet):
 
    serializer_class = PostSerializer

    def get_queryset(self):
        user_id = self.request.GET.get('id')
        if user_id == '-1':
            return Post.objects.all()
        else:
            return Post.objects.filter(user_id = user_id)

class StoryViewSet(viewsets.ModelViewSet):

    serializer_class = StorySerializer
    queryset = Story.objects.all()


class LikeViewSet(viewsets.ModelViewSet):
    serializer_class = LikeSerializer
    queryset = Like.objects.all()

class CommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()




