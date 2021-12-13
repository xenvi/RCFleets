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

    def update(self, instance, validated_data):
        print('validated_data', validated_data)
        if 'profile' in validated_data:
            nested_serializer = self.fields['profile']
            nested_instance = instance.profile
            nested_data = validated_data.pop('profile')

            # updates nested serializer (Profile)
            nested_serializer.update(nested_instance, nested_data)

        # updates main serializer without nested data (User)
        return super(UserSerializer, self).update(instance, validated_data)
