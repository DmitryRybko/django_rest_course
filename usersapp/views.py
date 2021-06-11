from rest_framework import viewsets, mixins
from rest_framework.generics import ListAPIView, get_object_or_404
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from .models import CustomUser
from .serializers import UserModelSerializer, UserModelSerializerFull


# class UserModelViewSet(ModelViewSet):
#     queryset = CustomUser.objects.all()
#     serializer_class = UserModelSerializer

class UserModelViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin,
                       mixins.UpdateModelMixin, viewsets.GenericViewSet):

    queryset = CustomUser.objects.all()
    serializer_class = UserModelSerializer

    def get_serializer_class(self):
        if self.request.version == '2.0':
            return UserModelSerializerFull
        return UserModelSerializer

    # renderer_classes = [JSONRenderer]

    # def list(self, request):
    #     users = CustomUser.objects.all()
    #     context = {'request': request}
    #     serializer = UserModelSerializer(users, many=True, context=context)
    #     return Response(serializer.data)
    #
    # def retrieve(self, request, pk=None):
    #     user = get_object_or_404(CustomUser, pk=pk)
    #     context = {'request': request}
    #     serializer = UserModelSerializer(user, context=context)
    #     return Response(serializer.data)
