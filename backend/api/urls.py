from django.urls import path
from . import views

urlpatterns = [
    path(
        "api/journalentry/",
        views.JournalEntryListCreate.as_view(),
        name="journalentry-list-create",
    ),
    path(
        "api/journalentry/<int:pk>/",
        views.JournalEntryDetail.as_view(),
        name="journeyentry-retrieve",
    ),
    path(
        "api/journalentry/<int:pk>/delete/",
        views.JournalEntryDelete.as_view(),
        name="journeyentry-delete",
    ),
]
