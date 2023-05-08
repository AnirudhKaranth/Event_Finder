from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed, ValidationError
from .serializers import UserSerializer
from .models import User
import jwt, datetime

# Create your views here.

# Function for signup
@api_view(['POST'])
def register(request):
    email = request.data['email']    #extract email from request
    data = request.data              #store the request body in variable called data

    user = User.objects.filter(email=email).first()           #check if the user already exists
    if user is not None:
        raise AuthenticationFailed('User Already Exists')     #throw an error if user is already registered
  
    # if user does not exist, pass the data to serializr for serialization to store it in DB
    serializer = UserSerializer(data=data, many=False)        
    
    try:
        serializer.is_valid(raise_exception=True) # check if the given data is valid
    except ValidationError as e:
         errors = e.detail
    
         # Concatenate all the error messages into a single string
         error_message = ""
         for field, errors in errors.items():
            for error in errors:
                error_message += f"{error}\n"
    
         # Print the error message
         raise AuthenticationFailed(error_message)

    serializer.save()  # if no error then store it in DB

    user = User.objects.filter(email=email).first()   #retrive the user from DB to send some info to frontend

    # create a payload for JWT authentication purpose
    payload = {
        'id': user.userId,
        'exp':datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
        'iat': datetime.datetime.utcnow()
    }

    # create a token
    token = jwt.encode(payload, 'secret', algorithm='HS256')
    responseData = serializer.data
    

    #send the response
    return Response({
        'credentials':responseData,
        'token': token

    })


# Function for login
@api_view(['POST'])
def login(request):

    # obtain email and password from the request body
    email = request.data['email']
    password = request.data['password']

    # search the DB for the user
    user = User.objects.filter(email=email).first()

    # if user does not exists throw an error
    if user is None:
        raise AuthenticationFailed('User not found!')
    
    # if the password is weong throw an error
    if not user.check_password(password):
        raise AuthenticationFailed('Incorrect password')

    payload = {
        'id': user.userId,
        'exp':datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
        'iat': datetime.datetime.utcnow()
    }

    token = jwt.encode(payload, 'secret', algorithm='HS256')
    print(user.name)
    return Response({
        'name':user.name,
        'email':user.email,
        'token':token
    })

