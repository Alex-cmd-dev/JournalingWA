from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, JournalEntrySerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import JournalEntry
from journaling import analyze_mood, analyze_content
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
# Create your views here.


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class JournalEntryListCreate(generics.ListCreateAPIView):
    serializer_class = JournalEntrySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return JournalEntry.objects.filter(user=user)
    def perform_create(self, serializer):
        content = self.request.data.get("content", "")
        mood = analyze_mood(content)
        analysis = analyze_content(content, mood)
        serializer.save(user=self.request.user,mood=mood, analysis=analysis)
        



class JournalEntryDelete(generics.DestroyAPIView):
    serializer_class = JournalEntrySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return JournalEntry.objects.filter(user=user)


class SHow(APIView):
    def get(self, request, topic_id):
        topic = get_object_or_404(Topic, id=topic_id, user=self.request.user)
        flashcards = Flashcard.objects.filter(topic=topic)
        serializer = FlashcardSerializer(flashcards, many=True)
        return Response(serializer.data)