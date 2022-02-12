from django.db import models

class Product(models.Model):
    title = models.CharField(max_length=100)
    year = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    creator = models.ForeignKey('auth.User', related_name='products', on_delete=models.CASCADE)
    class Meta:
        ordering = ['-id']

class Ingredient(models.Model):
    title = models.CharField(max_length=200)
    quantity = models.IntegerField()
    formula = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="ingredients")
    class Meta:
        ordering = ['-id']
      