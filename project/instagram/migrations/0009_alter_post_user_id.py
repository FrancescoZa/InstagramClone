# Generated by Django 4.1.6 on 2023-02-22 10:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('instagram', '0008_alter_post_user_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='user_id',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to='instagram.user', verbose_name='id'),
        ),
    ]
