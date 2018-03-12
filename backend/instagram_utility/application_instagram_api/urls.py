from django.conf.urls import url

from . import views

urlpatterns = [
  url(r'^login/$', views.model_list),
  url(r'^follow/$', views.follow),
  url(r'^unfollow/$', views.unfollow),
]
