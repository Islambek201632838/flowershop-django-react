from rest_framework.generics import GenericAPIView
from ..models import Flower
from django.utils.dateparse import parse_date
from django.db.models import Q, IntegerField, Value as V
from django.db.models.functions import Replace, Cast

class BaseFlowerFilterView(GenericAPIView):

    def get_queryset(self):
        query = Q()

        # Extract query parameters
        min_price = self.request.query_params.get('minPrice')
        max_price = self.request.query_params.get('maxPrice')
        is_discount = self.request.query_params.get('isDiscount', None)
        is_new = self.request.query_params.get('isNew', None)
        category = self.request.query_params.get('category', None)
        size = self.request.query_params.get('size', None)
        searchTerm = self.request.query_params.get('searchTerm', '')
        sort = self.request.query_params.get('sort', '')

        # Build query conditions
        if searchTerm:
            query &= Q(name__icontains=searchTerm)
        if min_price:
            query &= Q(price__gte=min_price)
        if max_price:
            query &= Q(price__lte=max_price)
        if is_new and is_new.lower() == 'true':
            query &= Q(date__gt=parse_date('2023-10-01'))
        if category:
            query &= Q(category=category)
        if size:
            query &= Q(size=size)

        # Handle is_discount by annotating and filtering
        if is_discount and is_discount.lower() == 'true':
            queryset = Flower.objects.filter(query).annotate(
                discount_value=Cast(Replace('discount', V('%'), V('')), IntegerField())
            ).filter(discount_value__gt=0)
        else:
            queryset = Flower.objects.filter(query)

        # Apply sorting based on the sort parameter
        sort_mapping = {
            'New': '-date',
            'Old': 'date',
            'Cheap': 'price',
            'Expensive': '-price'
        }
        if sort in sort_mapping:
            queryset = queryset.order_by(sort_mapping[sort])

        return queryset
