# Generated by Django 4.1.6 on 2023-03-01 12:48

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('instagram', '0014_alter_like_unique_together'),
    ]

    operations = [
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('comment', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('post_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comment_post', to='instagram.post')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comment_user', to='instagram.user')),
            ],
            options={
                'unique_together': {('user_id', 'post_id')},
            },
        ),
    ]
