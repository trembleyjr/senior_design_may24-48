# AWS Backend Tutorial
## About
Due to the size and limitations of our original design, this is going to be a set of instructions for how to create a docker image for the project, upload it to AWS, and use Lambda to create a function based on that image. This guide will most likely change as we figure certain aspects out.

## Requirements
Please get the following programs on your machine before attempting to follow the tutorial.

- Docker Desktop
- AWS CLI

In addition, ensure that you have an access key so that you can push up to AWS.

## Necessary Files
### Model files
To import the model into our project, we need to save the different parts of the model including preprocessing layers and the model itself so we can import them into the backend.
- At the end of the Python notebook, add the following code lines (the comments are for clarification):
```
#Saving the model file
#IMPORTANT NOTE: you may get a warning about .h5 being outdated and to use .keras instead. Do not do this. To the extend of current testing, this breaks the container as it won't import correctly.
model.save("model.h5")
```
```
#Saving the textvectorization vocabulary
vocab = vectorizer.get_vocabulary()
np.save("vocab.npy", vocab)
```
#TODO: add other files here

Copy all of these from the model directory to this one.

### requirements file
To define the dependencies that will need to be imported into the project, we will use a requirements file. it is a simple text file that lists the dependencies and the version to install.

### app.py
The app.py file is the new backend file for AWS. We will import our model files from earlier in here. Right now it is simple, but it will expand as we add the different requirements of the functionality.

### Dockerfile
This is the file that allows us to actually make the container. This should not change much, if at all, but you are feel free to look at it.

## Create Image
- Go to ECR on AWS.
- Go to our repository and look at the push commands. If you do not see one, we have not made one for the team account yet.
- Run Docker Desktop.
- Login using the first push command.
- Build and tag the image (steps 2 and 3).
- Optional: if you want to locally test the model, which is ideal before pushing, follow [this guide](https://docs.aws.amazon.com/lambda/latest/dg/images-test.html)
- Upload the image.

## Troubleshooting
- If the lambda function does not work, you may have to use a [lambda invoke command](https://docs.aws.amazon.com/lambda/latest/dg/invocation-sync.html). No idea why this works or if it even does, but there were some issues and reaching with this was the only thing done differently.