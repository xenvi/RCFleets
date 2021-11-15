from rest_framework import permissions
from rest_framework.generics import ListAPIView, RetrieveAPIView
from accounts.models import User
from accounts.serializers import UserSerializer

class UserListView(ListAPIView):
    queryset = User.objects
    ordering = ['created_at']
    serializer_class = UserSerializer
    lookup_field = 'handle'
    permission_classes = (permissions.AllowAny, )

class UserDetailView(RetrieveAPIView):
    queryset = User.objects
    ordering = ['created_at']
    serializer_class = UserSerializer
    lookup_field = 'handle'
    permission_classes = (permissions.AllowAny, )