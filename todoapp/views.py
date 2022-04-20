from rest_framework.viewsets import ModelViewSet
from .models import Project, ToDoList
from .serializers import ProjectModelSerializer, ToDoListModelSerializer


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer


class ToDoListModelViewSet(ModelViewSet):
    queryset = ToDoList.objects.all()
    serializer_class = ToDoListModelSerializer
