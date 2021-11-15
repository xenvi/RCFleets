from django.contrib import admin
from .models import FleetPost, FleetInfo

class FleetInfoAdmin(admin.ModelAdmin):
    list_display = [f.name for f in FleetInfo._meta.get_fields()]
    list_display_links = ('fleetpost', )
    search_fields = ('fleetpost', )
    list_per_page = 25

class FleetInfoInline(admin.StackedInline):
    model = FleetInfo

class FleetPostAdmin(admin.ModelAdmin):
    list_display = [f.name for f in FleetPost._meta.get_fields()]
    list_display_links = ('id', 'title')
    search_fields = ('title', )
    list_per_page = 25
    inlines = [FleetInfoInline]


admin.site.register(FleetInfo, FleetInfoAdmin)
admin.site.register(FleetPost, FleetPostAdmin)