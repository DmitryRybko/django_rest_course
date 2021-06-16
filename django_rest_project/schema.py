import graphene
from graphene_django import DjangoObjectType
from todoapp.models import Project, ToDoList
from usersapp.models import CustomUser


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class UserType(DjangoObjectType):
    class Meta:
        model = CustomUser
        fields = '__all__'


class ToDoType(DjangoObjectType):
    class Meta:
        model = ToDoList
        fields = '__all__'


class Query(graphene.ObjectType):
    all_projects = graphene.List(ProjectType)

    def resolve_all_projects(root, info):
        return Project.objects.all()

    all_todos = graphene.List(ToDoType)

    def resolve_all_todos(root, info):
        return ToDoList.objects.all()


schema = graphene.Schema(query=Query)
