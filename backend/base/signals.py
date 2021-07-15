from django.db.models.signals import pre_save
from django.contrib.auth.models import User


# This signal allows us to assign our username our email on save.
def updateUser(sender, instance, **kwargs):
    user = instance
    if user.email != '':
        user.username = user.email

# This is just how we call the signal (straight out of django docs i assum)
pre_save.connect(updateUser, sender=User)