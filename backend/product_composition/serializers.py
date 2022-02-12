from rest_framework import serializers
from .models import Product
from .models import Ingredient

from django.contrib.auth.models import User

class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = [ 'title', 'quantity']

class ProductSerializer(serializers.ModelSerializer):  # create class to serializer model
    creator = serializers.ReadOnlyField(source='creator.username')
    ingredients = IngredientSerializer(many=True)
    class Meta:
        model = Product
        fields = [ 'id','title', 'ingredients', 'year', 'creator']

    def create(self, validated_data):
        ingredients_data = validated_data.pop('ingredients')
        formula = Product.objects.create(**validated_data)
        for ingredient_data in ingredients_data:
            Ingredient.objects.create(formula=formula, **ingredient_data)
        return formula

class UserSerializer(serializers.ModelSerializer):  # create class to serializer user model
    products = serializers.PrimaryKeyRelatedField(many=True, queryset=Product.objects.all())

    class Meta:
        model = User
        fields = ('id', 'username', 'products')
