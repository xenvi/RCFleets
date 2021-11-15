from django import forms
from .models import FleetPost, FleetInfo

class CreateFleetPostForm(forms.ModelForm):
    class Meta:
        model = FleetPost
        fields = '__all__'

class CreateFleetInfoForm(forms.ModelForm):
    class Meta:
        model = FleetInfo
        fields = '__all__'
