from django.contrib.auth.models import User
from rest_framework import generics, status
from .serializers import UserSerializer, JournalEntrySerializer, ResetPasswordRequestSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import JournalEntry, PasswordReset
from .journaling import analyze_mood, analyze_content
from rest_framework.response import Response
from django.contrib.auth.tokens import PasswordResetTokenGenerator
import os

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
    
class RequestPasswordReset(generics.GenericAPIView):
    permission_classes = [AllowAny]
    serializer_class = ResetPasswordRequestSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            user = User.objects.get(email__iexact=email)  # We know user exists due to serializer validation

            token_generator = PasswordResetTokenGenerator()
            token = token_generator.make_token(user)
            reset = PasswordReset(email=email, token=token)
            reset.save()

            reset_url = f"{os.environ.get('PASSWORD_RESET_BASE_URL', 'http://yourfrontend.com/reset-password')}/{token}"

            # Sending reset link via email (commented out for clarity)
            # ... (email sending code using reset_url)

            return Response({'success': 'We have sent you a link to reset your password to the provided email address.'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)