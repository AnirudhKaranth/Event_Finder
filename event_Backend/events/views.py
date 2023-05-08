from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed, ValidationError
from .models import Event
import jwt
import json
from .serializers import EventSerializer
from django.contrib.auth import get_user_model

User = get_user_model()


# Create your views here.
@api_view(['POST'])
def createEvent(request):
    # Get the Authorization header from the request
    authHeader = request.META.get('HTTP_AUTHORIZATION')

    # Extract the token from the header value
    if authHeader and authHeader.startswith('Bearer '):
        token = authHeader[7:]
        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
            user = User.objects.filter(userId=payload['id']).first()
            userId = user.userId
            request.data['user_id'] = userId
            data = request.data
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')
        

        serializer = EventSerializer(data = data, many= False)
        try:
            serializer.is_valid(raise_exception=True)
        except ValidationError as e:
            errors = e.detail
    
    # Concatenate all the error messages into a single string
            error_message = ""
            for field, errors in errors.items():
                for error in errors:
                    error_message += f"{error}\n"
    
    # Print the error message
            raise AuthenticationFailed(error_message)

        serializer.save()
        return Response({
            "message":"Event Created successfully!"
        })
    else:
        # Return an error response if no token is found
        raise AuthenticationFailed("Unauthenticated")

#function to like the Event
@api_view(['PATCH'])
def likeEvent(request):

    # Extract the token from the header value
    authHeader = request.META.get('HTTP_AUTHORIZATION')

    #check if token exists
    if authHeader and authHeader.startswith('Bearer '):
        token = authHeader[7:]

        #check if it is valid
        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256']) # we can get the id of user by decoding the jwt token.
            user = User.objects.filter(userId=payload['id']).first() 
            userId = user.userId
            request.data['likedBy'] = userId # add likedBy field to request body before sending it to serializer
            data = request.data
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')
        
        event = Event.objects.get(eventId = data['eventId']) # using the event id present in request data retieve the particular event from DB.
        serializer = EventSerializer(instance= event, data= data) # send that instance along with data to be modified.(here it is like event)
        try:
            serializer.is_valid(raise_exception=True) # validates the data
        except ValidationError as e:
            errors = e.detail
            print(errors)
    
    # Concatenate all the error messages into a single string
            error_message = ""
            for field, errors in errors.items():
                for error in errors:
                    error_message += f"{error}\n"
    
    # Print the error message
            raise AuthenticationFailed(error_message)

        serializer.save()
        return Response({
            "message":"Event Liked successfully!"
        })
    else:
        # Return an error response if no token is found
        raise AuthenticationFailed("Unauthenticated")


# function to get all the events
@api_view(['GET'])
def getAllEvents(request):
    events = Event.objects.all()
    data_json = EventSerializer(events, many=True).data
    return Response(json.dumps(data_json)) #converts the data to json while sending the response

