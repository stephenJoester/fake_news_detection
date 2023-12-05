from django.db import models

# Create your models here.
class Article(models.Model) :
    title = models.CharField(max_length=100, default="") 
    content = models.TextField(default="") 
    
class Feedback(models.Model) : 
    article = models.ForeignKey(Article, on_delete=models.CASCADE)
    label = models.IntegerField(default=0) 
    