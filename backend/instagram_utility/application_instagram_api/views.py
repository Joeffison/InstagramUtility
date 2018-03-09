# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from rest_framework import status

from .facade import MyInstagramAPI
from .models import InstagramModel
from .serializers import InstagramSerializer


@api_view(['GET', 'POST'])
def model_list(request):
  """
  List all ML Models, or create a new one.
  """
  # TODO Remove password from serializer when this version is complete.
  if request.method == 'GET':
    models = InstagramModel.objects.all()
    serializer = InstagramSerializer(models, many=True)
    return JsonResponse(serializer.data, safe=False)

  elif request.method == 'POST':
    try:
      api = MyInstagramAPI(request.data['username'], request.data['password'])
      data = {
        'username': api.username,
        'followers': api.getFollowers(),
        'followings': api.getFollowings()
      }
      return JsonResponse(data, safe=False)
    except:
      return HttpResponse(status=status.HTTP_401_UNAUTHORIZED)
  return HttpResponse(status=status.HTTP_404_NOT_FOUND)


