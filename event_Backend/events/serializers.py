import json
from rest_framework import serializers
from .models import Event

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['eventName', 'eventDate', 'eventTime', 'location', 'image', 'user_id', 'likedBy']

    # modified the update function of serializer it is basically used add user to event if he/she likes it
    def update(self, instance, validated_data):
        likedBy = instance.likedBy
        likedBy.append(validated_data.get('likedBy', instance.likedBy))
        instance.save()
        return instance