from rest_framework import serializers
from .models import Project, ToDoList
from usersapp.serializers import UserModelSerializer


class ProjectModelSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Project
        fields = ['name', 'users']


class ToDoListModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = ToDoList
        fields = '__all__'
