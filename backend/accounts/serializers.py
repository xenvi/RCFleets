from djoser.serializers import UserCreateSerializer
from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Profile

""" Retrieve custom user model """
User = get_user_model()

class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = Userfields = ('id', 'email', 'handle', 'password', 'created_at', 'updated_at')

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        exclude = ('user', )

class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()
    class Meta:
        model = User
        fields = ('id', 'handle', 'email', 'created_at', 'updated_at', 'profile', )
