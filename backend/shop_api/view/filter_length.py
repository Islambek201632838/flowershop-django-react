from rest_framework.response import Response
from ..serializers import FlowerSerializer
from .base import BaseFlowerFilterView
import math

class FlowerFilterLengthView(BaseFlowerFilterView):
    def get(self, request, *args, **kwargs):
        limit = self.request.query_params.get('limit', 9)
        offset = self.request.query_params.get('offset', 0)
        
        queryset = self.get_queryset()
        data = queryset[int(offset):int(offset) + int(limit)]

        if not queryset:
            return Response({'message': 'No Match'})      
        serializer = FlowerSerializer(data, many=True)  # Serialize the queryset
        count = queryset.count()
        max_page = math.ceil(count / 9) 

        if not queryset:
            return Response({'message': 'No Match'})
        return Response({'response': serializer.data, 'response2': {'count': count, 'max_page': max_page}})