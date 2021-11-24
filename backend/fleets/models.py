from django.db import models
from django.conf import settings

class FleetPost(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="user")
    title = models.CharField(max_length=100)
    thumbnail = models.ImageField(upload_to='photos/%Y/%m/%d/', blank=True)
    featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        # enable single featured post functionality per user
        if self.featured:
            try:
                queryset = FleetPost.objects.all().filter(user__email = self.user)
                temp = queryset.get(featured=True)

                if self != temp:
                    temp.featured = False
                    temp.save()
            except FleetPost.DoesNotExist:
                pass

        super(FleetPost, self).save(*args, **kwargs)

    def handle(self):
        return self.user.handle

    def __str__(self):
        return str(self.id)

class FleetInfo(models.Model):
    fleetpost = models.OneToOneField(FleetPost, on_delete=models.CASCADE, related_name="info", primary_key=True)
    modelName = models.CharField(max_length=100, blank=True)
    personalBestSpeed = models.DecimalField(max_digits=4, decimal_places=1, default=0)
    tires = models.CharField(max_length=150, blank=True)
    receiver = models.CharField(max_length=150, blank=True)
    pinionGearSize = models.PositiveIntegerField(default=0)
    spurGearSize = models.PositiveIntegerField(default=0)
    avgMotorTemp = models.DecimalField(max_digits=4, decimal_places=1, default=0)
    avgEscTemp = models.DecimalField(max_digits=4, decimal_places=1, default=0)
    lipoCell = models.PositiveIntegerField(default=0)
    shockOilViscosityFront = models.PositiveIntegerField(default=0)
    shockOilViscosityRear = models.PositiveIntegerField(default=0)
    diffOilViscosityFront = models.PositiveIntegerField(default=0)
    diffOilViscosityCenter = models.PositiveIntegerField(default=0)
    diffOilViscosityRear = models.PositiveIntegerField(default=0)

    def __str__(self):
        return str(self.fleetpost)
