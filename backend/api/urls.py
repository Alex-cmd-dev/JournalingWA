from django.urls import path
from . import views

urlpatterns = [
    path(
        "journalentry/",
        views.JournalEntryListCreate.as_view(),
        name="journalentry-list-create",
    ),
    path(
        "journalentry/<int:pk>/",
        views.JournalEntryDetail.as_view(),
        name="journeyentry-retrieve",
    ),
    path(
        "journalentry/<int:pk>/delete/",
        views.JournalEntryDelete.as_view(),
        name="journeyentry-delete",
    ),
    path(
        "journalentry/recent/",
        views.JournalRecentEntries.as_view(),
        name="journalentry-recent",
    ),
]
