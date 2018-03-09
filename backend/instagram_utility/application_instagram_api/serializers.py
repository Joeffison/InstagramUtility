from rest_framework import serializers
from .models import InstagramModel


class InstagramSerializer(serializers.ModelSerializer):

    class Meta:
        model = InstagramModel
        fields = ('id', 'username', 'password')
