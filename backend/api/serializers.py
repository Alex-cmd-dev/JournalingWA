from django.contrib.auth.models import User
from rest_framework import serializers
from .models import JournalEntry


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "first_name", "last_name", "email", "username", "password"]
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


class ForgotPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)

    def validate_email(self, value):
        if not User.objects.filter(email=value).exists():
            raise serializers.ValidationError(
                "There is no user registered with this email address."
            )
        return value
