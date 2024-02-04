from django.urls import path
from . import views

urlpatterns = [
    path('list/', views.FlowerListCreateView.as_view(), name='flower-list-create'),
    path('distinct/<str:parameter>/', views.FlowerDistinctView.as_view(), name='flower-distinct'),
    path('filter/', views.FlowerFilterLengthView.as_view(), name='flower-filter'),
]
