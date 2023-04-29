"""project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.urls.conf import include
from django.conf import settings
from django.conf.urls.static import static

import atexit

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('instagram.urls')),


] + static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)

# start the scheduler
from apscheduler.schedulers.background import BackgroundScheduler
from django.conf import settings
from instagram import models

scheduler = BackgroundScheduler()
# scheduler.add_jobstore('django', django_jobs=True)
scheduler.add_job(func= models.schedule_delete_expired_objects, trigger="interval", seconds=3)

scheduler.start()

# schedule the delete_expired_objects function to run every hour
# from ..instagram.models import schedule_delete_expired_objects
models.schedule_delete_expired_objects()

# stop the scheduler when the app is unloaded
def close_scheduler():
    scheduler.shutdown()

atexit.register(close_scheduler)
