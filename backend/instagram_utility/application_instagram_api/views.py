# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from rest_framework import status

from .facade import MyInstagramAPI
from .models import InstagramModel
from .serializers import InstagramSerializer


@api_view(['POST'])
def model_list(request):
  if request.method == 'POST':
    api = MyInstagramAPI(request.data['username'], request.data['password'])
    return JsonResponse(data=api.get_current_user_profile(), safe=False)
  return HttpResponse(status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def follow(request):
  api = MyInstagramAPI(request.data['username'], request.data['password'])
  api.follow(request.data['users'])
  return JsonResponse(data=api.get_current_user_profile(), safe=False)

@api_view(['POST'])
def unfollow(request):
  api = MyInstagramAPI(request.data['username'], request.data['password'])
  api.unfollow(request.data['users'])
  return JsonResponse(data=api.get_current_user_profile(), safe=False)
