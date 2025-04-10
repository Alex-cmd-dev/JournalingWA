from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, JournalEntrySerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import JournalEntry
from .journaling import analyze_mood, analyze_content

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


class JournalEntryDetail(generics.RetrieveAPIView):
    serializer_class = JournalEntrySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return JournalEntry.objects.filter(user=user)
    
class JournalRecentEntries(generics.ListAPIView):
    serializer_class = JournalEntrySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return JournalEntry.objects.filter(user=user).order_by("-created_at")[:3]
    
