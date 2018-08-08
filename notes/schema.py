from graphene_django import DjangoObjectType
import graphene
from .models import PersonalNote as PersonalNoteModel

class PersonalNote(DjangoObjectType):

  class Meta:
    model = PeronsalNoteModel
    interfaces = (graphene.relay.Node,) # Describe the data as node in the graph.

class Query(graphene.ObjectType):
  Personalnotes = grapphene.List(PersonalNote)

  def resolve_personalnotes(self, info):
    # Decide which notes to return
    user = info.context.user

    if user.is_anonymous:
      return PersonalNoteModel.objects.none()
    else:
      return PersonalNoteModel.objects.filter(user=user)

schema = graphene.Schema(query=Query)