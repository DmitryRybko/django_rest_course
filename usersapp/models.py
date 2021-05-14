from django.db import models


class User(models.Model):
    username = models.CharField(max_length=64)
    firstname = models.CharField(max_length=64)
    lastname = models.CharField(max_length=64)
    email = models.EmailField(unique=True)

    def __str__(self):
        return f'{self.firstname} {self.lastname}'
