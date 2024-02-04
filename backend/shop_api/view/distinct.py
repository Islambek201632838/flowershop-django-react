from rest_framework.views import APIView
from rest_framework.response import Response
from ..models import Flower

class FlowerDistinctView(APIView):
    def get(self, request, *args, **kwargs):
        parameter = kwargs.get('parameter')
        if parameter not in ['category', 'size']:
            return Response({'error': 'Invalid parameter'}, status=400)
        
        distinct_values = Flower.objects.values_list(parameter, flat=True).distinct()
        distinct_count = []
        for value in distinct_values:
            count = Flower.objects.filter(**{parameter: value}).count()
            distinct_count.append({"parName": value, "count": count})

        return Response(distinct_count)
