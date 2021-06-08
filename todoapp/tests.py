import json
from django.test import TestCase
from mixer.backend.django import mixer
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
# from mixer.backend.django import mixer
from django.contrib.auth.models import User
from .views import ProjectModelViewSet
from .models import Project, ToDoList


class TestProjectViewSet(TestCase):

    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/projects/')
        view = ProjectModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_detail(self):
        project = mixer.blend(Project)
        client = APIClient()
        response = client.get(f'/api/projects/{project.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class TestToListViewSet(APITestCase):

    def test_get_list(self):
        response = self.client.get('/api/todolist/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)