from django.urls import path
from .views import FleetPostListView, FleetPostDetailView

urlpatterns = [
    path('', FleetPostListView.as_view()),
    path('<user>', FleetPostDetailView.as_view()),
]