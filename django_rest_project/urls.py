from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from graphene_django.views import GraphQLView
from rest_framework import permissions
from rest_framework.authtoken import views
from rest_framework.routers import DefaultRouter
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from usersapp.views import UserModelViewSet
from todoapp.views import ProjectModelViewSet, ToDoListModelViewSet


router = DefaultRouter()
router.register('users', UserModelViewSet, basename='users')
router.register('projects', ProjectModelViewSet)
router.register('todolist', ToDoListModelViewSet)

user_detail = UserModelViewSet.as_view({
    'get': 'retrieve',
    'patch': 'partial_update',
})

schema_view = get_schema_view(
    openapi.Info(
        title="ToDo App",
        default_version='0.1',
        description="Documentation to project",
        contact=openapi.Contact(email="admin@admin.local"),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include(router.urls)),

    path('api/users/<int:pk>/', user_detail, name='customuser-detail'),
    path('api-token-auth/', views.obtain_auth_token),

    path('openapi', schema_view.without_ui(cache_timeout=0), name='openapi-schema'),

    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),

    path('swagger-ui/', TemplateView.as_view(
        template_name='swagger_ui.html',
        extra_context={'schema_url': 'openapi-schema'}
    ), name='swagger-ui'),

    path("graphql/", GraphQLView.as_view(graphiql=True))
]
