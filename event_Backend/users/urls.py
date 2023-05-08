from django.urls import path
from .views import register, login

urlpatterns = [
    path('register', register), #url to signUp
    path('login', login) #url to login
]