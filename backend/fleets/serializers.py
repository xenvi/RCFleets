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

    def update(self, instance, validated_data):
        if 'info' in validated_data:
            nested_serializer = self.fields['info']
            nested_instance = instance.info
            nested_data = validated_data.pop('info')

            # updates nested serializer (FleetInfo)
            nested_serializer.update(nested_instance, nested_data)

        # updates main serializer without nested data (FleetPost)
        return super(FleetPostSerializer, self).update(instance, validated_data)