from django.db import models

# Create your models here.

class User(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    pro_pic = models.ImageField(null = True, blank = True, upload_to = "images/")
    password = models.CharField(max_length=100)
    caption = models.TextField(default="", blank=True)
    fullName = models.CharField(max_length=100, default="")


class Post(models.Model):
    id = models.AutoField(primary_key=True)
    description = models.TextField()
    image = models.ImageField(null = True, blank = True, upload_to = "images/")
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name="posts")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Story(models.Model):
    id = models.AutoField(primary_key=True)
    image = models.ImageField(null = True, blank = True, upload_to = "images/")
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name="stories")
    created_at = models.DateTimeField(auto_now_add=True)

class Like(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user")
    post_id = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="post")
    class Meta:
        unique_together = ('user_id', 'post_id') 

class Comment(models.Model):
    id = models.AutoField(primary_key=True)
    post_id = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="comment_post")
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name="comment_user")
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    