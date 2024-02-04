from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from .models import Flower
from .serializers import FlowerSerializer
from .view.filter_length import FlowerFilterLengthView as BaseFlowerFilterLengthView
from .view.list_create import FlowerListCreateView as BaseFlowerListCreateView
from .view.distinct import FlowerDistinctView as BaseFlowerDistinctView


class FlowerFilterLengthView(BaseFlowerFilterLengthView):
    pass

class FlowerListCreateView(BaseFlowerListCreateView):
    pass

class FlowerDistinctView(BaseFlowerDistinctView):
    pass
