# Generated by Django 4.1.6 on 2023-03-01 12:59

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('instagram', '0015_comment'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='comment',
            unique_together=set(),
        ),
        migrations.AddField(
            model_name='post',
            name='comment_id',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='posts', to='instagram.comment'),
            preserve_default=False,
        ),
        migrations.RemoveField(
            model_name='comment',
            name='post_id',
        ),
    ]