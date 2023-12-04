from django.urls import path
from .views import ArticleView, CreateArticleView, PredictArticleView

urlpatterns = [
    path('article/',ArticleView.as_view()),
    path('article/create-article',CreateArticleView.as_view()),
    path('article/predict', PredictArticleView.as_view())
]
