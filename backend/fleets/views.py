from rest_framework import permissions
from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveUpdateAPIView, DestroyAPIView
from fleets.models import FleetPost
from fleets.serializers import FleetPostSerializer
from fleets.paginations import FeedPagination

class FleetPostListView(ListAPIView):
    queryset = FleetPost.objects
    ordering = ['created_at']
    serializer_class = FleetPostSerializer
    lookup_field = 'user'
    permission_classes = (permissions.AllowAny, )
    pagination_class = FeedPagination

    def get_queryset(self):
        return FleetPost.objects.order_by('-created_at')

class FleetPostDetailView(ListAPIView):
    serializer_class = FleetPostSerializer
    lookup_field = 'user'
    permission_classes = (permissions.AllowAny, )
    pagination_class = FeedPagination

    # query fleet posts by user id (user param of URL)
    def get_queryset(self):
        return FleetPost.objects.filter(user__id = self.kwargs['user']).order_by('-featured', '-created_at')

class CreateFleetPostView(CreateAPIView):
    serializer_class = FleetPostSerializer
    permission_classes = (permissions.AllowAny, )

class UpdateFleetPostView(RetrieveUpdateAPIView):
    serializer_class = FleetPostSerializer
    lookup_field = 'id'
    permission_classes = (permissions.AllowAny, )

    # query fleet post by fleetpost id (id param of URL)
    def get_queryset(self):
        return FleetPost.objects.filter(id = self.kwargs['id'])

class DeleteFleetPostView(DestroyAPIView):
    serializer_class = FleetPostSerializer
    lookup_field = 'id'
    permission_classes = (permissions.AllowAny, )

    # query fleet post by fleetpost id (id param of URL)
    def get_queryset(self):
        return FleetPost.objects.filter(id = self.kwargs['id'])
