from django.contrib import admin
from django.contrib.auth import get_user_model
from .models import Profile

""" Retrieve custom user model """
User = get_user_model()

class ProfileAdmin(admin.ModelAdmin):
    list_display = [f.name for f in Profile._meta.get_fields()]
    list_display_links = ('user', )
    search_fields = ('user', )
    list_per_page = 25

class ProfileInline(admin.StackedInline):
    model = Profile
    verbose_name_plural = 'Profile'

class UserAdmin(admin.ModelAdmin):
    list_display = ['id', 'email', 'handle', 'password', 'is_active', 'is_staff', 'created_at', 'updated_at']
    list_display_links = ('id', 'handle')
    search_fields = ('handle', )
    list_per_page = 25
    inlines = (ProfileInline, )

    def get_inline_instances(self, request, obj=None):
        if not obj:
            return list()
        return super(UserAdmin, self).get_inline_instances(request, obj)


admin.site.register(Profile, ProfileAdmin)
admin.site.register(User, UserAdmin)
