# Generated by Django 4.1.6 on 2023-03-15 08:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('instagram', '0018_remove_post_comment_id_comment_post_id'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='comment',
            name='post_id',
        ),
        migrations.RemoveField(
            model_name='comment',
            name='user_id',
        ),
    ]
