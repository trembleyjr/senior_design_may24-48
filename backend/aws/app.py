import os
import tensorflow as tf
import numpy as np
import json
import joblib

def lambda_handler(event, context):
    body = json.loads(event["body"])
    print(body)
    gender = body.get('gender').lower()
    year = body.get('birth_year')
    tone = body.get('skin_tone').lower()
    photoType = body.get('fitzpatrick').lower()
    conditions = body.get('skinConditions')
    # Assign values and ensure they are the same
    print(gender)
    print(year)
    print(tone)
    print(conditions)
    # One-hot encode gender
    encodedGender = []
    match gender:
        case 'male':
            print("user is male")
            encodedGender = [0, 1, 0, 0]
        case 'female':
            print("user is female")
            encodedGender = [1, 0, 0, 0]
        case 'undisclosed':
            print("undisclosed")
            encodedGender = [0, 0, 0, 1]
        case 'other':
            print("other")
            encodedGender = [0, 0, 1, 0]
        case _:
            print("Does not match any")
            return "ERROR: Gender does not match one of: male, female, undisclosed, other"
    # One-hot encode tone
    encodedTone = []
    match tone:
        case 'dark':
            print("dark skin")
            encodedTone = [0, 1, 0, 0, 0, 0]
        case 'medium':
            print("medium skin")
            encodedTone = [0, 0, 0, 0, 1, 0]
        case 'fair':
            print("fair skin")
            encodedTone = [0, 0, 1, 0, 0, 0]
        case 'olive':
            print("olive skin")
            encodedTone = [0, 0, 0, 0, 0, 1]
        case 'light':
            print("light skin")
            encodedTone = [0, 0, 0, 1, 0, 0]
        case 'brown':
            print("brown skin")
            encodedTone = [1, 0, 0, 0, 0, 0]
        case _:
            print("Does not match any")
            return "ERROR: Skin Tone does not match one of: dark, medium, fair, olive, light, brown"
    # One-hot encode fitzpatrick photo type
    encodedPhotoType = []
    match photoType:
        case 'darker-white':
            print("darker-white skin")
            encodedPhotoType = [0, 0, 1, 0, 0, 0]
        case 'white-fair':
            print("white-fair skin")
            encodedPhotoType = [0, 0, 0, 0, 0, 1]
        case 'light-pale-white':
            print("light-pale-white skin")
            encodedPhotoType = [0, 0, 0, 0, 1, 0]
        case 'dark-brown-black':
            print("dark-brown-black skin")
            encodedPhotoType = [0, 1, 0, 0, 0, 0]
        case 'light-brown':
            print("light-brown skin")
            encodedPhotoType = [0, 0, 0, 1, 0, 0]
        case 'brown':
            print("brown skin")
            encodedPhotoType = [1, 0, 0, 0, 0, 0]
        case _:
            print("Does not match any")
            encodedPhotoType = [0, 0, 0, 0, 0, 0]
    vocab = np.load("vocab.npy")
    # TextVectorize SkinConditions
    max_len = 23 # variable from notebook
    conditionsStr = ''
    for i in conditions:
        conditionsStr = conditionsStr + i + " "
    vectorizer = tf.keras.layers.TextVectorization(split = "whitespace", output_sequence_length = max_len, vocabulary = vocab)
    encodedConditions = vectorizer(conditionsStr).numpy()
    print(encodedConditions)
    # Create input array for model
    encodedYear = int(year)
    input_data = [encodedYear]
    input_data = np.concatenate((input_data, encodedGender))
    input_data = np.concatenate((input_data, encodedTone))
    input_data = np.concatenate((input_data, encodedPhotoType))
    print(input_data)
    expanded_input = np.expand_dims(input_data, axis = 0)
    expanded_conditions = np.expand_dims(encodedConditions, axis = 0)
    print(expanded_input)
    # Load model and predict result
    model = tf.keras.models.load_model("model.h5")
    print("Model loaded")
    model.build((77,))
    print(model.summary())
    probs = model.predict([expanded_input, expanded_conditions])
    # Convert input types and send results
    results = (probs > 0.2).astype(int)
    print(results)
    mlb = joblib.load('mlb.pkl')    
    test_results = mlb.inverse_transform(results)
    print(test_results)
    print(len(test_results[0]))
    print(type(test_results))
    print(type(test_results[0]))
    print(type(test_results[0][0]))
    new_results = []
    for result in test_results[0]:
        new_results.append(int(result))
    return {
        'statusCode':200,
        'body': json.dumps(new_results)
    }