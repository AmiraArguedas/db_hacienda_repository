

from django.urls import path
from . import views

urlpatterns = [
    path('consultar_contribuyente/<int:identificacion>/', views.ContribuyenteListCreate.as_view(), name='consultar_contribuyente'),
]
