# Generated by Django 4.2.1 on 2023-05-08 13:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0006_remove_event_likedby_delete_value_event_likedby'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='likedBY',
            field=models.CharField(max_length=5000),
        ),
    ]