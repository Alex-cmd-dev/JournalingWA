from django.urls import path
from . import consumers

websocket_urlpatterns = [
    path(
        "ws/chat/<str:chatID>/",
        consumers.ChatConsumer.as_asgi(),
    )
]
# This file defines the URL routing for WebSocket connections in the Django application.
