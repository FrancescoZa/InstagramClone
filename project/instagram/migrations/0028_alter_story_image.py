# Generated by Django 3.2.16 on 2023-04-04 19:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('instagram', '0027_alter_story_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='story',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='images/'),
        ),
    ]