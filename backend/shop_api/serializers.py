from rest_framework import serializers
from .models import Flower  # Import your Product model

class FlowerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flower
        fields = ['id', 'name', 'price', 'size', 'category', 'discount', 'url', 'date']
