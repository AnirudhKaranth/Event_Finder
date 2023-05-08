# Generated by Django 4.2.1 on 2023-05-08 12:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0003_event_user_id'),
    ]

    operations = [
        migrations.CreateModel(
            name='Value',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('value', models.IntegerField()),
            ],
        ),
        migrations.RemoveField(
            model_name='event',
            name='likedBY',
        ),
        migrations.AddField(
            model_name='event',
            name='likedBY',
            field=models.ManyToManyField(to='events.value'),
        ),
    ]