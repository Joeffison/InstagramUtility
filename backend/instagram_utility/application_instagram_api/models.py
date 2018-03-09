# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

class InstagramModel(models.Model):
  created = models.DateTimeField(auto_now_add=True)
  enabled = models.BooleanField(blank=False, null=False)

  username = models.CharField(max_length=100, blank=False, null=False)
  password = models.CharField(max_length=100, blank=False, null=False)

  class Meta:
    ordering = ('created','username', 'enabled',)
