import os
import tensorflow as tf
import json

def lambda_handler(event, context):
    print(event['body'])
    model = tf.keras.models.load_model("test_model.h5")
    print("Model loaded")
    model.build((77,))
    print(model.summary())
    return "hello world"