from rest_framework.generics import ListCreateAPIView
from rest_framework import status
from rest_framework.response import Response
from ..models import Flower
from ..serializers import FlowerSerializer

class FlowerListCreateView(ListCreateAPIView):
    serializer_class = FlowerSerializer

    def get_queryset(self):
        limit = self.request.query_params.get('limit', 9)
        offset = self.request.query_params.get('offset', 0)
        queryset = Flower.objects.all()

        if not limit and not offset:
            return queryset

        return queryset[int(offset):int(offset) + int(limit)]
    
    def create(self, request, *args, **kwargs):
        if isinstance(request.data, list):
            serializer = self.get_serializer(data=request.data, many=True)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return super().create(request, *args, **kwargs)