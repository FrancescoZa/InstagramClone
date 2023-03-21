from django.contrib import admin
from .models import User
from .models import Post
from .models import Like
from .models import Comment

# Register your models here.
class UserAdmin(admin.ModelAdmin):
    pass
admin.site.register(User, UserAdmin)

class PostAdmin(admin.ModelAdmin):
    pass
admin.site.register(Post, PostAdmin)

class LikeAdmin(admin.ModelAdmin):
    pass
admin.site.register(Like, LikeAdmin)

class CommentAdmin(admin.ModelAdmin):
    pass
admin.site.register(Comment, LikeAdmin)