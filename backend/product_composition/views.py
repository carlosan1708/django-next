from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListAPIView, ListCreateAPIView
from rest_framework.permissions import IsAuthenticated
from django_filters import rest_framework as filters
from .models import Product
from .models import IngredientHistory
from .serializers import IngredientSerializer
from .serializers import IngredientSumSerializer
from django.core import serializers

from .permissions import IsOwnerOrReadOnly
from .serializers import ProductSerializer
from .pagination import CustomPagination
from .filters import ProductFilter
from django.http import HttpResponse
import json

from django.db import connection

class ListCreateProductAPIView(ListCreateAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
    permission_classes = [IsAuthenticated]
    pagination_class = CustomPagination
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = ProductFilter

    def perform_create(self, serializer):
        # Assign the user who created the formula
        serializer.save(creator=self.request.user)
        
class RetrieveUpdateDestroyProductAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]

def get_ingredient_quantity_summary(param):
    from django.db import connection
    cursor = connection.cursor()

    # Data modifying operation - commit required
    cursor.execute("Select p.year, SUM (quantity) from product_composition_product p inner join product_composition_ingredient i on i.id = p.id group by year")
   
    row = cursor.fetchall()
    print(row)
    
    return HttpResponse(json.dumps(row))







