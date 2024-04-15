import os
import tensorflow as tf
import numpy as np
import json

def lambda_handler(event, context):
    print(event['body'])
    model = tf.keras.models.load_model("model.h5")
    vectorizer = np.load("vocab.npy")
    print("Model loaded")
    model.build((77,))
    print(model.summary())
    return "hello world"