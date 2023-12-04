# Backend

## Introduction

The backend of this project will consist of multiple cloud functions written with Python. 
At the time of writing this document, the only existing function is a simple return statement in JavaScript.
This allowed us to ensure that we were able to get a response back to the frontend.

As more work is done on the project, the Python cloud functions will be built and added to this directory.
The JavaScript will remain so that the original test can be preserved, but it will not be used.

## Run Lambda function on AWS

### Set up JavaScript Environment on AWS (Deprecation in progress)

1. Navigate to Lambda on AWS.
2. Select the Create Function option in the top left of the screen.
3. Ensure the Author from scratch option is selected at the top.
4. Give it a name.
5. Select the most recent runtime of Node.js which should be 20.x
6. Leave the default architecture of x86_64
7. Expand the Change default execution role and select the create new role with basic permissions option.
8. Expand the advanced settings and click Enable function URL. This should open up a set of other options.
9. Select NONE for Auth type. This may change to only allow authorized users as we make the switch to Python, but we need to ensure we can access the endpoint for now.
10. Select the Configure CORS option to ensure the front-end can actually reach this endpoint.
11. Review the previous steps to ensure everything is correct and click Create Function. This may take a few minutes.

### Add code to Lambda function

1. Once the environment is created, Navigate to the code panel, and there should be a basic function in a file called index.mjs.
2. Replace the contents of this file with those of initialjs.mjs in this Gitlab directory.
3. Click the Deploy option. This will save the changes made to the Lambda function.
4. Click the Test dropdown and select Configure New Test Event.
5. In the popup, select Create New Test Event and give it a name.
6. Select the private test event setting.
7. Replace the contents of the Event JSON with those of intitial-test.json.
8. Click the Save button.
9. Click on the actual Test button. If everything was configured correctly, you should see a succeeded status on the right-hand side.
10. Congratulations, you have created and deployed a Lambda function!

### Cleaning up

1. If you are all done testing, navigate to Lambda -> Functions to see the list of all of your functions.
2. Select the function you wish to delete using the checkbox.
3. On the right-hand side, click the Actions dropdown and select Delete.
4. Type *delete* or whatever the popup says and click Delete.
5. Close the panel, and you should see that the function has disappeared.
