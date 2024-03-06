import os
import io
import boto3
import json
import csv

# grab environment variables
ENDPOINT_NAME = os.environ['ENDPOINT_NAME']
runtime= boto3.client('runtime.sagemaker')

def lambda_handler(event, context):
    print("Received event: " + json.dumps(event, indent=2))
    
    data = json.loads(json.dumps(event))
    payload = data['data']

    #Import textvectorization from model and convert SkinConditions
    
    response = runtime.invoke_endpoint(EndpointName=ENDPOINT_NAME,
                                       ContentType='text/csv',
                                       Body=payload)
    result = json.loads(response['Body'].read().decode())
    
    predicted_labels = result['predictions']

    #Remove the 0 prediction from the returned elements
    for x in predicted_labels:
        if(predicted_labels[x] == '0'):
            predicted_labels.pop(x)

    return predicted_labels