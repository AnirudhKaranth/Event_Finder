from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

# Create your models here.

class Event(models.Model):
    eventId = models.AutoField(primary_key=True)
    eventName = models.CharField(max_length=255)
    eventDate = models.DateField()
    eventTime = models.CharField(max_length=55)
    likedBy = models.JSONField(default=list)
    location = models.CharField(max_length=255)
    image = models.CharField(max_length=2555)
    user_id = models.ForeignKey(User,null=True, blank=True, on_delete=models.CASCADE)