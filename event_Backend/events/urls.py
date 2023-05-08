from django.urls import path
from .views import createEvent, likeEvent, getAllEvents

urlpatterns = [
    path('events/create', createEvent),
    path('events/likeEvent', likeEvent),
    path('events/getEvent', getAllEvents),
]