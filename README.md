# Vietnamese Fake News Detection

This project is a Vietnamese Fake News Detection system, using Django Rest Framework for the server, React JS + Tailwind CSS for the website frontend, and TensorFlow Serving + Docker for deploying the deep learning models.
Models include BiLSTM model, LSTM model with Doc2Vec Word Embedding and PhoBERT with BERT Tokenizer. 
Models are trained with Vietnamese news dataset from various both reliable and unreliable sources. There are 4 labels in total : Real, Fake, Real with Fake, Fake with Real. [Link to dataset](https://docs.google.com/spreadsheets/d/1jY2TE5M7CRxycgVLczoPOYw3SZOUE3iX/edit?fbclid=IwAR2YWZoQBvDkzReUnt65YaUZ3qLRGjpt4cxRY98lySCTqhnFBjf3NvK8Bq8#gid=1329244457)  
## How to Run the Project

## Server (Django Rest Framework)

Make sure you have Python and Django installed.

```bash
# Install dependencies
pip install -r requirements.txt

# Run migrations
python ./manage.py migrate

# Run the development server
python ./manage.py runserver
```

## Deploying the Machine Learning Model

To deploy the machine learning model, we will use TensorFlow Serving and Docker.

### Step 1: Install Docker

Make sure you have Docker installed on your machine. If not, you can download it from [Docker's official website](https://www.docker.com/get-started).

### Step 2: Pull TensorFlow Serving Docker Image

```bash
docker pull tensorflow/serving
```

### Step 3 : Run TensorFlow Serving Docker Container

```bash
cd /your/absolute/path/to/fake_news_detection
```
Run the following command to start a Docker container with TensorFlow Serving:
```bash
docker run -it -v $(pwd):/fake_news_detection -p 8100:8100 --entrypoint /bin/bash tensorflow/serving
```

### Step 4 : Start TensorFlow Model Server

Inside the Docker container, start the TensorFlow Model Server with the following command:
```bash
tensorflow_model_server --rest_api_port=8100 --rest_api_timeout_in_ms=120000 --model_config_file=/fake_news_detection/api/SavedModel/Models/models.config
```
Now, the machine learning model is deployed and accessible through TensorFlow Serving at http://localhost:8100/v1/models/.
