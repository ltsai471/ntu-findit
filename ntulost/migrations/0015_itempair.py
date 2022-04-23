# Generated by Django 4.0.3 on 2022-04-21 10:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('ntulost', '0014_delete_itempair'),
    ]

    operations = [
        migrations.CreateModel(
            name='ItemPair',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('foundItemId', models.ForeignKey(default=0, editable=False, on_delete=django.db.models.deletion.CASCADE, related_name='foundId', to='ntulost.item')),
                ('lossItemId', models.ForeignKey(default=0, editable=False, on_delete=django.db.models.deletion.CASCADE, related_name='lossId', to='ntulost.item')),
            ],
            options={
                'unique_together': {('foundItemId', 'lossItemId')},
            },
        ),
    ]
