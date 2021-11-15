from rest_framework import serializers
from .models import FleetPost, FleetInfo

# Serializers define the API representation.
class FleetInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = FleetInfo
        exclude = ('fleetpost', )

class FleetPostSerializer(serializers.ModelSerializer):
    info = FleetInfoSerializer()
    class Meta:
        model = FleetPost
        fields = '__all__'
        extra_fields = ['info']