from rest_framework import serializers
from .models import Article, Feedback

class ArticleSerializer(serializers.ModelSerializer) :
    class Meta: 
        model = Article
        fields = ('id','title','content') 
        
class CreateArticleSerializer(serializers.ModelSerializer) : 
    model = serializers.CharField()
    class Meta: 
        model = Article
        fields = ('title','content','model')
        
class FeedbackSerializer(serializers.ModelSerializer) :
    article = serializers.DictField()
    label = serializers.IntegerField()
    class Meta: 
        model = Feedback
        fields = ('article','label') 