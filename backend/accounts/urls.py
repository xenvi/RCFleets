from django.urls import path
from .views import UserListView, UserDetailView, UpdateUserView

urlpatterns = [
    path('', UserListView.as_view()),
    path('<handle>', UserDetailView.as_view()),
    path('update/<id>', UpdateUserView.as_view()),
]