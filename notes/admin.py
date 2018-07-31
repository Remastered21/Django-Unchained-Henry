from django.contrib import admin
from .models import Note, PersonalNote# importing from models.py

# Register your models here.
admin.site.register( (Note, PersonalNote) )