from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db.models.signals import post_save
from django.dispatch import receiver
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
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['handle']

    objects = UserManager() 

    def get_handle(self):
        return self.handle

    def __str__(self):
        return self.email

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile", primary_key=True)
    bio = models.CharField(max_length=150, blank=True, null=True)
    avatar = models.ImageField(upload_to='images', blank=True)

    def handle(self):
        return self.user.handle

    def __str__(self):
        return self.user.handle

@receiver(post_save, sender=User)
def create_or_update_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
    instance.profile.save()