from django.db import models

class Contribuyente(models.Model):
    identificacion = models.CharField(max_length=50, unique=True)
    nombre1 = models.CharField(max_length=50, null=True, blank=True)
    nombre2 = models.CharField(max_length=50, null=True, blank=True)
    apellido1 = models.CharField(max_length=50, null=True, blank=True)
    apellido2 = models.CharField(max_length=50, null=True, blank=True)

    def __str__(self):
        return self.identificacion
