export const handler = async () => {
    /*
     * Generate HTTP response using 200 status code with a simple body.
     */
    const response = {
        status: '200',
        statusDescription: 'OK',
        headers: {
            vary: [{
                key: 'Vary',
                value: '*',
            }],
            'last-modified': [{
                key: 'Last-Modified',
                value: '2017-01-13',
            }],
        },
        body: 'You have reached the Lambda endpoint',
    };

    return response;
};
