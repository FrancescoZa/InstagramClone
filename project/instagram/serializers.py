from rest_framework import serializers
from .models import User
from .models import Post
from .models import Like
from .models import Comment
from .models import Story


class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = '__all__'


class CommentSerializer(serializers.ModelSerializer):

    username = serializers.SerializerMethodField()
    proPic = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = '__all__'

    def get_username(self, obj):
        try:
            return obj.user_id.username
        except:
            pass

    def get_proPic(self, obj):
        try:
            return obj.user_id.pro_pic.url
        except:
            pass
   
class PostSerializer(serializers.ModelSerializer):
   
    username = serializers.SerializerMethodField()
    proPic = serializers.SerializerMethodField()
    comments = serializers.SerializerMethodField()
    class Meta:
        model = Post
        fields = '__all__'

    def get_comments(self, obj):
        queryset = Comment.objects.filter(post_id = obj.id)
        serializer = CommentSerializer(queryset, many=True)
        return serializer.data

    def get_username(self, obj):
        try:
            return obj.user_id.username
        except:
            pass

    def get_proPic(self, obj):
        try:
            return obj.user_id.pro_pic.url
        except:
            pass

class StorySerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    proPic = serializers.SerializerMethodField()

    class Meta:
        model = Story
        fields = '__all__'

    def get_username(self, obj):
        try:
            return obj.user_id.username
        except:
            pass

    def get_proPic(self, obj):
        try:
            return obj.user_id.pro_pic.url
        except:
            pass



class LikeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Like
        fields = '__all__'

