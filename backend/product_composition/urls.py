from django.urls import path
from . import views

urlpatterns = [
    path('', views.ListCreateProductAPIView.as_view(), name='get_post_product'),
    path('ingredients/', views.CustomView.get_ingredient_quantity_summary, name='sum_ingredients'),
    path('<int:pk>/', views.RetrieveUpdateDestroyProductAPIView.as_view(), name='get_delete_update_product'),
]