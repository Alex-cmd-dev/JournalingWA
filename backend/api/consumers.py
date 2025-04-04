import json
import os
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from django.http import HttpRequest
from django.contrib.auth.models import User
from rest_framework.request import Request
from .models import ChatMessage
from .serializers import ChatMessageSerializer
from asgiref.sync import async_to_sync
from google import genai
from dotenv import load_dotenv

load_dotenv()
# Load environment variables
client = genai.Client(api_key=os.getenv("API_KEY"))





class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.chatID = self.scope["url_route"]["kwargs"]["chatID"]
        self.user = self.scope["user"]
        # Check if user is authenticated
        if self.user.is_anonymous:
            # Reject the connection
            await self.close(code=4003)
            return

        # Join room group
        await self.channel_layer.group_add(
            self.chatID,
            self.channel_name,
        )
        # Accept the connection
        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.chatID,
            self.channel_name,
        )
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json["message"]
        # Save message to database
        chat_message = ChatMessage.objects.create(
            chatID=self.chatID,
            user=self.user,
            message=message
        )
        gemini_response = await self.call_gemini_api(message)
    
    async def call_gemini_api(self, message):
        pass
    
