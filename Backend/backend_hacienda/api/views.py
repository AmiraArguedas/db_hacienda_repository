import requests
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .serializers import ContribuyenteSerializer

class ContribuyenteListCreate(APIView):
    
    def get(self, request, identificacion):
        # URL de la API externa de Hacienda
        url = f"https://api.hacienda.go.cr/fe/ae?identificacion={identificacion}"
        
        try:
            # Realizar la solicitud HTTP GET
            response = requests.get(url)
            
            # Verificar si la respuesta es exitosa
            if response.status_code == 200:
                # Suponiendo que la API de Hacienda devuelve los datos en formato JSON
                data = response.json()

                # Aquí puedes realizar cualquier validación adicional de los datos si es necesario
                # Si la API de Hacienda devuelve la información como esperas, puedes retornarla directamente
                
                return Response(data, status=status.HTTP_200_OK)
            else:
                # Si la respuesta de la API externa no es exitosa
                return Response({"detail": "Error al consultar el contribuyente en la API externa"}, status=status.HTTP_400_BAD_REQUEST)
        
        except requests.exceptions.RequestException as e:
            # Si ocurre un error en la solicitud HTTP (conexión, timeout, etc.)
            return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
