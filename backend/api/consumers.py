import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from django.http import HttpRequest
from django.contrib.auth.models import User
from rest_framework.request import Request
from .models import ChatMessage
from .serializers import ChatMessageSerializer
from asgiref.sync import async_to_sync