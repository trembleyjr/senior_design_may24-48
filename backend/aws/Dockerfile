# Pull the base image with python 3.11 as a runtime for your Lambda
FROM public.ecr.aws/lambda/python:3.11

# Copy the earlier created requirements.txt file to the container
COPY requirements.txt ./

# Install the python requirements from requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the earlier created app.py and model files to the container
COPY app.py ./
COPY model.h5 ./
COPY vocab.npy ./
COPY mlb.pkl ./

# Set the CMD to your handler
CMD ["app.lambda_handler"]