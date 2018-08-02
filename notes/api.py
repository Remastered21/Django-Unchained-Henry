from rest_framework import serializers, viewsets
from .models import PersonalNote

class PersonalNoteSerializer(serializers.HyperlinkedModelSerializer):
  # Describe the model and fields we ant to use

  class Meta:
    model = PersonalNote
    fields = ('title', 'content', 'url')

  def create(self, validated_data):
    # import pdb; pdb.set_trace() # this starts the debugger
    user = self.context['request'].user
    note = PersonalNote.objects.create(user = user, **validated_data) # keyword args
    return note

class PersonalNoteViewSet(viewsets.ModelViewSet):
  # Describe the rows we want from the DB.
  
  serializer_class = PersonalNoteSerializer
  queryset = PersonalNote.objects.all()