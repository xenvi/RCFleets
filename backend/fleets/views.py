from rest_framework import permissions
from rest_framework.generics import ListAPIView
from fleets.models import FleetPost
from fleets.serializers import FleetPostSerializer

class FleetPostListView(ListAPIView):
    queryset = FleetPost.objects
    ordering = ['created_at']
    serializer_class = FleetPostSerializer
    lookup_field = 'user'
    permission_classes = (permissions.AllowAny, )

class FleetPostDetailView(ListAPIView):
    serializer_class = FleetPostSerializer
    lookup_field = 'user'
    permission_classes = (permissions.AllowAny, )

    # query fleet posts by user id (user param of URL)
    def get_queryset(self):
        return FleetPost.objects.filter(user__id = self.kwargs['user']).order_by('-featured', 'created_at')
