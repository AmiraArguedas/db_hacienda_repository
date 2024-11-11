import requests
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Contribuyente

@csrf_exempt
def consultar_contribuyente(request, identificacion):
    url = f"https://api.hacienda.go.cr/fe/ae?identificacion={identificacion}"
    
    try:
        # Realizamos la consulta a la API
        response = requests.get(url)
        response.raise_for_status()
        
        # Si la respuesta es exitosa, extraemos los datos
        data = response.json()

        if 'nombre' in data:
            nombres = data['nombre'].split(' ')
            nombre1 = nombres[0] if len(nombres) > 0 else None
            nombre2 = nombres[1] if len(nombres) > 1 else None

            apellidos = data['apellido'].split(' ')
            apellido1 = apellidos[0] if len(apellidos) > 0 else None
            apellido2 = apellidos[1] if len(apellidos) > 1 else None

            # Guardamos los datos en la base de datos
            contribuyente, created = Contribuyente.objects.update_or_create(
                identificacion=identificacion,
                defaults={
                    'nombre1': nombre1,
                    'nombre2': nombre2,
                    'apellido1': apellido1,
                    'apellido2': apellido2,
                }
            )
            return JsonResponse({'status': 'success', 'contribuyente': data}, status=200)

        return JsonResponse({'error': 'Datos no encontrados'}, status=404)

    except requests.exceptions.RequestException as e:
        return JsonResponse({'error': str(e)}, status=500)
