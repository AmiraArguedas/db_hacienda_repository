from django.urls import path
from . import views

urlpatterns = [
    path('consultar_contribuyente/<str:identificacion>/', views.consultar_contribuyente, name='consultar_contribuyente'),
]
