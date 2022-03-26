from django.db import models
from django.urls import reverse

# tmp model
class Order(models.Model):
    id = models.CharField(max_length=20, primary_key=True)
    customer = models.CharField(max_length=20)

    def __str__(self):
        return self.id

    def get_absolute_url(self):
        """Returns the url to access a detail record for this book."""
        return reverse('order-detail', args=[str(self.id)])

class OrderItem(models.Model):
    order = models.ForeignKey('Order', related_name='items', on_delete=models.SET_NULL, null=True)
    item_name = models.CharField(max_length=20)

    def __str__(self):
        return f'{self.order} ({self.item_name})'
# tmp model end

class Account(models.Model):
    mail_id = models.CharField(max_length=200, primary_key=True)
    name = models.CharField(max_length=10)
    pwd = models.CharField(max_length=200)
    photo = models.ImageField()
    confirm_flag = models.CharField(max_length=1)
    last_log_time = models.DateTimeField()
    edit_datetime = models.DateTimeField()

    def __str__(self):
        return self.name


class Item(models.Model):
    id = models.IntegerField(primary_key=True)
    found_or_loss = models.CharField(max_length=5)
    status = models.CharField(max_length=1)
    account_id = models.CharField(max_length=200)
    loss_datetime = models.DateTimeField()
    item_place = models.CharField(max_length=200)
    preserve_place = models.CharField(max_length=200)
    item_type = models.CharField(max_length=200)
    item_desc = models.CharField(max_length=1000)
    img = models.ImageField()
    close_datetime = models.DateTimeField()
    item_owner_id = models.CharField(max_length=200)
    edit_datetime = models.DateTimeField()
    
    def __str__(self):
        return self.id


class Item_type_level_1(models.Model):
    level1_id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=200)
    edit_datetime = models.DateTimeField()

    def __str__(self):
        return self.level1_id


class Item_type_level_2(models.Model):
    class Meta:
        unique_together = (('level1_id', 'level2_id'),)

    level1_id = models.ForeignKey('Item_type_level_1', related_name='level2_items', on_delete=models.SET_NULL, null=True)
    level2_id = models.IntegerField()
    name = models.CharField(max_length=200)
    edit_datetime = models.DateTimeField()

    def __str__(self):
        return self.level1_id, self.level2_id


class Chatroom(models.Model):
    id = models.IntegerField(primary_key=True)
    account_1 = models.CharField(max_length=200)
    account_2 = models.CharField(max_length=200)
    item_id = models.ForeignKey('Item', on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.id


class Chat_context(models.Model):
    class Meta:
        unique_together = (('chatroom', 'seq'),)

    chatroom = models.ForeignKey('Chatroom', related_name='contexts', on_delete=models.SET_NULL, null=True)
    seq = models.IntegerField(primary_key=True)
    send_account = models.CharField(max_length=200)
    context = models.CharField(max_length=200)
    send_datetime = models.DateTimeField()

    def __str__(self):
        return self.chatroom_id, self.seq
