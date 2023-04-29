from django.utils import timezone
from .models import Story
from datetime import timedelta
import schedule


def delete_expired_objects():
    # print('function running')
    # calculate the expiration time (24 hours ago)
    expiration_time = timezone.now() - timedelta(hours=24)
    # find all objects that were created before the expiration time
    expired_objects = Story.objects.filter(created_at__lt=expiration_time)

    # delete the expired objects
    expired_objects.delete()


def schedule_delete_expired_objects():
    # schedule the function to run every hour
    # print('task running')
    delete_expired_objects()
    # schedule.every(1).second.do(delete_expired_objects)
