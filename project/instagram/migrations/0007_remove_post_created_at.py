# Generated by Django 4.1.6 on 2023-02-21 10:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('instagram', '0006_remove_post_upload_time_post_created_at'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='post',
            name='created_at',
        ),
    ]