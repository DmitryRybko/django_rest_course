from rest_framework import serializers
from .models import Project, ToDoList


class ProjectModelSerializer(serializers.HyperlinkedModelSerializer):

    users = serializers.StringRelatedField(many=True)

    class Meta:
        model = Project
        fields = ['id', 'name', 'users', 'url']


class ToDoListModelSerializer(serializers.ModelSerializer):

    created_by = serializers.StringRelatedField()

    class Meta:
        model = ToDoList
        fields = '__all__'


# for tests
class ToDoListSerializerBase(serializers.ModelSerializer):
    class Meta:
        model = ToDoList
        fields = '__all__'
