# Generated by Django 3.2.2 on 2021-05-22 16:25

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('todoapp', '0002_project_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='project',
            name='user',
        ),
    ]
