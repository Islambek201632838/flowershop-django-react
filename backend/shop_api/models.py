from django.db import models

class Flower(models.Model):
    name = models.CharField(max_length=50)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    size = models.CharField(max_length=50)
    category = models.CharField(max_length=50)
    discount = models.CharField(max_length=50)
    url = models.ImageField(upload_to='flowers/', blank=True, null=True)
    date = models.DateField()

    def __str__(self):
        return self.name
