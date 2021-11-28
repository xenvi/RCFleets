from django.urls import path
from .views import FleetPostListView, FleetPostDetailView, CreateFleetPostView, UpdateFleetPostView

urlpatterns = [
    path('', FleetPostListView.as_view()),
    path('<user>', FleetPostDetailView.as_view()),
    path('create/', CreateFleetPostView.as_view()),
    path('update/<id>', UpdateFleetPostView.as_view()),
]