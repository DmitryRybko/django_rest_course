from rest_framework import serializers
from .models import Project, ToDoList


class ProjectModelSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Project
        fields = ['id', 'name', 'users', 'url']


class ToDoListModelSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = ToDoList
        fields = '__all__'
