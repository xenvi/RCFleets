# Generated by Django 3.2.9 on 2021-11-14 23:02

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='FleetPost',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('thumbnail', models.ImageField(blank=True, upload_to='photos/%Y/%m/%d/')),
                ('featured', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='FleetInfo',
            fields=[
                ('fleetpost', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, related_name='info', serialize=False, to='fleets.fleetpost')),
                ('modelName', models.CharField(blank=True, max_length=100)),
                ('personalBestSpeed', models.DecimalField(decimal_places=1, default=0, max_digits=4)),
                ('tires', models.CharField(blank=True, max_length=150)),
                ('receiver', models.CharField(blank=True, max_length=150)),
                ('pinionGearSize', models.PositiveIntegerField(default=0)),
                ('spurGearSize', models.PositiveIntegerField(default=0)),
                ('avgMotorTemp', models.DecimalField(decimal_places=1, default=0, max_digits=4)),
                ('avgEscTemp', models.DecimalField(decimal_places=1, default=0, max_digits=4)),
                ('lipoCell', models.PositiveIntegerField(default=0)),
                ('shockOilViscosityFront', models.PositiveIntegerField(default=0)),
                ('shockOilViscosityRear', models.PositiveIntegerField(default=0)),
                ('diffOilViscosityFront', models.PositiveIntegerField(default=0)),
                ('diffOilViscosityCenter', models.PositiveIntegerField(default=0)),
                ('diffOilViscosityRear', models.PositiveIntegerField(default=0)),
            ],
        ),
    ]
