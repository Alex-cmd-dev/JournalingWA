from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class JournalEntry(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="journal_entries"
    )
    content = models.TextField()
    title = models.CharField(max_length=255)
    mood = models.CharField(max_length=50)
    analysis = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
