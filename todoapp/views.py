from django_filters import rest_framework as filters
from rest_framework import permissions
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from .models import Project, ToDoList
from .serializers import ProjectModelSerializer, ToDoListModelSerializer, ToDoListSerializerBase


class TaskLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class ProjectFilter(filters.FilterSet):
    name = filters.CharFilter(lookup_expr='contains')


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    filterset_class = ProjectFilter
    pagination_class = TaskLimitOffsetPagination


class ToDoListModelViewSet(ModelViewSet):
    # permission_classes = [permissions.IsAuthenticated]
    queryset = ToDoList.objects.all()
    serializer_class = ToDoListModelSerializer
    filterset_fields = {'project': ['exact'], 'created': ['gte', 'lte']}

    pagination_class = TaskLimitOffsetPagination

    def destroy(self, request, *args, **kwargs):
        task = self.get_object()
        task.completed = True
        task.save()

        return Response({"message": "task completed"})

    def get_serializer_class(self):
        if self.request.method in ['GET']:
            return ToDoListModelSerializer
        return ToDoListSerializerBase
