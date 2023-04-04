from rest_framework import routers
from .views import UserViewSet
from .views import PostViewSet
from .views import LikeViewSet
from .views import CommentViewSet
from .views import StoryViewSet

router = routers.DefaultRouter()
router.register(r'api/users', UserViewSet, 'users')
router.register(r'api/posts', PostViewSet, 'posts')
router.register(r'api/stories', StoryViewSet, 'stories')
router.register(r'api/posts/:id', PostViewSet, 'delete_post')
router.register(r'api/likes', LikeViewSet, 'likes')
router.register(r'api/likes/:id', LikeViewSet, 'delete_likes')
router.register(r'api/comments', CommentViewSet, 'comments')

urlpatterns = router.urls