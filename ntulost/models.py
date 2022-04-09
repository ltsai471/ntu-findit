from django.db import models
from django.urls import reverse
from phonenumber_field.modelfields import PhoneNumberField
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
    order = models.ForeignKey('Order', related_name='items', on_delete=models.SET_NULL, null=True)
    item_name = models.CharField(max_length=20)

    def __str__(self):
        return f'{self.order} ({self.item_name})'
# model end

class Account(models.Model):
    mailId = models.CharField(max_length=200, primary_key=True)
    name = models.CharField(max_length=10)
    pwd = models.CharField(max_length=200)
    phoneNumber=PhoneNumberField(default="0971017647") #add phoneNumer
    photo = models.ImageField(blank=True,null=True)
    confirmFlag = models.CharField(max_length=1,blank=True,null=True)
    lastLogTime = models.DateTimeField(blank=True,null=True)
    editDatetime = models.DateTimeField()

    def __str__(self):
        return self.name


class Item(models.Model):
    id = models.IntegerField(primary_key=True)
    foundOrLoss = models.CharField(max_length=5)
    STATUS=(
        ('U','U'), #尋找中
        ('D', 'D'), # 已尋回
        ('C', 'C'), # 聯絡中
    )
    status = models.CharField(max_length=1,choices=STATUS)
    accountId = models.CharField(max_length=200)
    lossDatetime = models.DateTimeField()
    itemPlace = models.CharField(max_length=200)
    preservePlace = models.CharField(max_length=200)
    # ITEMTYPE=(
    #     ('Student ID Card','Student ID Card'),
    #     ('Umbrella', 'Umbrella'),
    #     ("Book","Book")
    # )
    itemType = models.CharField(max_length=200,)#choices=ITEMTYPE
    itemDesc = models.CharField(max_length=1000)
    img = models.ImageField(upload_to='images',null=True)
    closeDatetime = models.DateTimeField(blank=True,null=True)
    itemOwnerId = models.CharField(max_length=200,blank=True,null=True)
    editDatetime = models.DateTimeField()

    def __str__(self):
        return (str)(self.id) #should be a string


class ItemTypeLevel1(models.Model):
    level1Id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=200)
    editDatetime = models.DateTimeField()

    def __str__(self):
        return self.name



class ItemTypeLevel2(models.Model):
    class Meta:
        unique_together = (('level1Id', 'level2Id'),)

    level1Id = models.ForeignKey('ItemTypeLevel1', related_name='level2Items', on_delete=models.SET_NULL, null=True)
    level2Id = models.IntegerField(primary_key=True) #修正加上primary_key
    name = models.CharField(max_length=200)
    editDatetime = models.DateTimeField()

    def __str__(self):
        return "level1id"+str(self.level1Id)+"level2id"+str(self.level2Id)


class Chatroom(models.Model):
    id = models.IntegerField(primary_key=True)
    account1 = models.CharField(max_length=200)
    account2 = models.CharField(max_length=200)
    itemId = models.ForeignKey('Item', on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.id


class ChatContext(models.Model):
    class Meta:
        unique_together = (('chatroom', 'seq'),)

    chatroom = models.ForeignKey('Chatroom', related_name='contexts', on_delete=models.SET_NULL, null=True)
    seq = models.IntegerField(primary_key=True)
    send_account = models.CharField(max_length=200)
    context = models.CharField(max_length=200)
    sendDatetime = models.DateTimeField()

    def __str__(self):
        return self.chatroom_id, self.seq
#還需要再加保管據點的entity

class PreservePlace(models.Model):
    id=models.IntegerField(primary_key=True)
    name=models.CharField(max_length=200)
    phoneNumber=PhoneNumberField(default="0971017647")
    img=models.ImageField()
    address=models.CharField(max_length=200)
