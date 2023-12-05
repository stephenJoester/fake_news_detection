from django.shortcuts import render
from rest_framework import generics, status
from .serializers import ArticleSerializer, CreateArticleSerializer
from .models import Article
from rest_framework.views import APIView
from rest_framework.response import Response
from .SavedModel.preprocessing import Preprocessing
from .SavedModel.predict import Predict
from .SavedModel.explainable import Explain

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
        if serializer.is_valid() :
            title = serializer.data.get('title')
            content = serializer.data.get('content')
            model = serializer.data.get('model')
            print(model)
            # print(f"title:{title}, content:{content}")
            
            prediction = Predict(content,model)
            print(prediction)
            # explainable_weights = Explain(content,model)
            # explainable_weights = []
            # print(explainable_weights)
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
    