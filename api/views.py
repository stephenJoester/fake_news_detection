from django.shortcuts import render
from rest_framework import generics, status
from .serializers import ArticleSerializer, CreateArticleSerializer, FeedbackSerializer
from .models import Article, Feedback
from rest_framework.views import APIView
from rest_framework.response import Response
from .SavedModel.preprocessing import Preprocessing
from .SavedModel.predict import Predict
from .SavedModel.explainable import Explain
from django.db import IntegrityError

# Create your views here.

class ArticleView(generics.CreateAPIView) :
    queryset = Article.objects.all() 
    serializer_class = ArticleSerializer
    
class CreateArticleView(APIView) :
    serializer_class = CreateArticleSerializer
    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data) 
        if serializer.is_valid() :
            title = serializer.data.get('title')
            content = serializer.data.get('content')
            
            print(f"title:{title}, content:{content}")

            article = Article(title=title, content=content) 
            article.save()
        
        return Response(ArticleSerializer(article).data, status=status.HTTP_200_OK)
    
class PredictArticleView(APIView) :
    serializer_class = CreateArticleSerializer
    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data) 
        # print(serializer)
        if serializer.is_valid() :
            title = serializer.data.get('title')
            content = serializer.data.get('content')
            model = serializer.data.get('model')
            print(model)
            prediction = Predict(content,model)
            print(prediction)
            response_data = {'prediction' : prediction}
            return Response(response_data, status=status.HTTP_200_OK)
        
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
class ExplainArticleView(APIView) : 
    serializer_class = CreateArticleSerializer
    def post(self, request, format=None) : 
        serializer = self.serializer_class(data=request.data) 
        if serializer.is_valid() : 
            title = serializer.data.get('title') 
            content = serializer.data.get('content') 
            model = serializer.data.get('model') 
            
            explainable_weights = Explain(content,model) 
            response_data = {'weights' : explainable_weights} 
            return Response(response_data, status=status.HTTP_200_OK) 
        
        return Response(status=status.HTTP_400_BAD_REQUEST) 

class FeedbackArticleView(APIView) : 
    serializer_class = FeedbackSerializer
    def post(self, request, format=None) : 
        serializer = self.serializer_class(data=request.data) 
      
        if serializer.is_valid():
            title = serializer.data['article']['title']
            content = serializer.data['article']['content']
            label = serializer.data['label']

            article, created = Article.objects.get_or_create(
                title = title,
                content = content,
                defaults={'title': title, 'content': content}
            )

            feedback = Feedback(article_id=article.id, label=label)
            feedback.save()

            response_data = {
                'article': {'title': title, 'content': content},
                'label': label
            }
            return Response(response_data, status=status.HTTP_200_OK)
    

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            