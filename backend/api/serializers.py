from django.contrib.auth.models import User
from rest_framework import serializers
from .models import JournalEntry, ChatMessage


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "first_name", "last_name", "email", "password"]
        read_only_fields = ["id"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class JournalEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = JournalEntry
        fields = ["id", "user", "content", "title", "mood", "analysis", "created_at"]
        read_only_fields = ["id", "user", "created_at", "mood", "analysis"]
        extra_kwargs = {
            "content": {"required": True},
            "title": {"required": True},
        }


class ChatMessageSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username", read_only=True)
    class Meta:
        model = ChatMessage
        fields = [
            "id",
            "username",
            "content",
            "response",
            "timestamp",
            "is_processed",
            "processing_time",
            "conversation_id",
            "metadata",
        ]
        read_only_fields = ["id", "timestamp", "is_processed", "processing_time"]

        def create(self, validated_data):
            return super().create(validated_data)
        

