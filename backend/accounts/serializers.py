from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model

""" Retrieve custom user model """
User = get_user_model()

class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = Userfields = ('id', 'email', 'handle', 'password', 'bio', 'avatar', 'created_at', 'updated_at')