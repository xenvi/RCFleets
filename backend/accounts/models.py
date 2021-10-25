from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

class UserManager(BaseUserManager):
    def create_user(self, handle, email, password=None, **extra_fields):
        """Create and return a `User` with an email, handle and password."""
        if handle is None:
            raise TypeError("User must have a handle.")
        if email is None:
            raise TypeError("User must have an email address.")
        
        user = self.model(handle=handle, email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, handle, email, password, **extra_fields):
        """Create and return a `User` with superuser (admin) permissions."""
        if password is None:
            raise TypeError("Superusers must have a password.")
        if email is None:
            raise TypeError("Superusers must have an email.")
        if handle is None:
            raise TypeError("Superusers must have a handle.")
        
        user = self.create_user(handle, email, password, **extra_fields)
        user.is_superuser = True
        user.is_staff = True
        user.save(using = self._db)

        return user

class User(AbstractBaseUser, PermissionsMixin):
    handle = models.CharField(max_length=255, unique=True)
    email = models.EmailField(db_index=True, max_length=255, unique=True)
    bio = models.CharField(max_length=150, blank=True, null=True)
    avatar = models.ImageField(upload_to='images')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['handle']

    objects = UserManager() 

    def get_handle(self):
        return self.handle

    def get_bio(self):
        return self.bio

    def get_avatar(self):
        return self.avatar

    def __str__(self):
        return self.email