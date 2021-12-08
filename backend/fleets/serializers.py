from rest_framework import serializers
from .models import FleetPost, FleetInfo

# Serializers define the API representation.
class FleetInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = FleetInfo
        exclude = ('fleetpost', )

class FleetPostSerializer(serializers.ModelSerializer):
    info = FleetInfoSerializer()
    handle = serializers.ReadOnlyField()
    class Meta:
        model = FleetPost
        fields = '__all__'
        extra_fields = ['info', 'handle']

    def create(self, validated_data):
        info_validated_data = validated_data.pop('info', None)
        fleetpost = FleetPost.objects.create(**validated_data)
        FleetInfo.objects.create(fleetpost_id=fleetpost.id, **info_validated_data)
        return fleetpost

    # TODO
    def update(self, instance, validated_data):
        instance.save()
        nested_instance = instance.info
        nested_instance.save()
        return super(FleetPostSerializer, self).update(instance, validated_data)