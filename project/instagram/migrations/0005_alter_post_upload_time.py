# Generated by Django 4.1.6 on 2023-02-21 10:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('instagram', '0004_post_upload_time'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='upload_time',
            field=models.DateField(auto_now_add=True, null=True),
        ),
    ]
