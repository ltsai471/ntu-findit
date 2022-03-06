from django.db import models
from django.urls import reverse

class Order(models.Model):
    id = models.CharField(max_length=20, primary_key=True)
    customer = models.CharField(max_length=20)

    def __str__(self):
        return self.id

    def get_absolute_url(self):
        """Returns the url to access a detail record for this book."""
        return reverse('order-detail', args=[str(self.id)])

class OrderItem(models.Model):
    order = models.ForeignKey('Order', related_name='items', on_delete=models.SET_NULL, null=True)
    item_name = models.CharField(max_length=20)

    def __str__(self):
        return f'{self.order} ({self.item_name})'