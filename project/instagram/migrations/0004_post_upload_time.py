# Generated by Django 4.1.6 on 2023-02-21 10:30

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('instagram', '0003_post'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='upload_time',
            field=models.DateField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]