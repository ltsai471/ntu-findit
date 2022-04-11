from django.db import models
from django.urls import reverse
# model interface example for frontend, those will be deleted after new frontend built


class Order(models.Model):
    id = models.CharField(max_length=20, primary_key=True)
    customer = models.CharField(max_length=20)

    def __str__(self):
        return self.id

    def get_absolute_url(self):
        """Returns the url to access a detail record for this book."""
        return reverse('order-detail', args=[str(self.id)])


class OrderItem(models.Model):
    order = models.ForeignKey(
        'Order', related_name='items', on_delete=models.SET_NULL, null=True)
    item_name = models.CharField(max_length=20)

    def __str__(self):
        return f'{self.order} ({self.item_name})'


class Account(models.Model):
    mailId = models.CharField(max_length=200, primary_key=True)
    name = models.CharField(max_length=10)
    pwd = models.CharField(max_length=200)
    photo = models.ImageField(upload_to='images', blank=True, null=True)
    confirmFlag = models.CharField(max_length=1, blank=True, null=True)
    lastLogTime = models.DateTimeField(blank=True, null=True)
    editDatetime = models.DateTimeField(auto_now_add=True)
    phoneNumber = models.CharField(max_length=20, null=True)

    def __str__(self):
        return self.name


class Item(models.Model):
    foundOrLoss = models.CharField(max_length=5)
    STATUS = (
        ('finding', 'finding'),
        ('done', 'done'),
        ('contact', 'contact')
    )
    status = models.CharField(max_length=10, choices=STATUS, null=True)
    accountId = models.CharField(max_length=200, null=True)
    lossDatetime = models.DateTimeField(null=True)
    itemPlace = models.CharField(max_length=200, null=True)
    preservePlace = models.CharField(max_length=200, null=True)
    itemType = models.CharField(max_length=200, null=True)
    itemDesc = models.CharField(max_length=1000, null=True)
    img = models.ImageField(upload_to='images', null=True)
    closeDatetime = models.DateTimeField(blank=True, null=True)
    itemOwnerId = models.CharField(max_length=200, blank=True, null=True)
    editDatetime = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.id}'


class ItemTypeLevel1(models.Model):
    level1Id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=200)
    editDatetime = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class ItemTypeLevel2(models.Model):
    class Meta:
        unique_together = (('level1Id', 'level2Id'),)

    level1Id = models.ForeignKey(
        'ItemTypeLevel1', related_name='level2Items', on_delete=models.SET_NULL, null=True)
    level2Id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=200)
    editDatetime = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.level1Id}_{self.level2Id}'


class Chatroom(models.Model):
    account1 = models.CharField(max_length=200)
    account2 = models.CharField(max_length=200)
    itemId = models.ForeignKey('Item', on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return f'{self.id}'


class ChatContext(models.Model):
    class Meta:
        unique_together = (('chatroom', 'seq'),)

    chatroom = models.ForeignKey(
        'Chatroom', related_name='contexts', on_delete=models.SET_NULL, null=True)
    seq = models.IntegerField(primary_key=True)
    sendAccount = models.CharField(max_length=200, null=True)
    context = models.CharField(max_length=200, null=True)
    sendDatetime = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.chatroom_id}_{self.seq}'


class PreservePlace(models.Model):
    name = models.CharField(max_length=20)
    phoneNumber = models.CharField(max_length=20, null=True)
    img = models.ImageField(upload_to='images', null=True)
    address = models.CharField(max_length=200, null=True)

    def __str__(self):
        return f'{self.name}({self.id})'
