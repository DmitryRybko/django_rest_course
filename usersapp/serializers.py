from rest_framework import serializers
from .models import CustomUser


class UserModelSerializer(serializers.HyperlinkedModelSerializer):
    projects = serializers.StringRelatedField(many=True)

    def create(self, validated_data):
        return CustomUser(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.birthday_year = validated_data.get('birthday_year', instance.birthday_year)

    class Meta:
        model = CustomUser
        fields = ['id', 'url', 'email', 'first_name', 'last_name', 'projects', ]
