const authDoc = {
    definitions: {
        LoginRequest: {
            $username: 'kajisaab',
            $enc_password: 'password',
            $ip: '127.0.0.1',
            $optIntoOneTap: false,
            queryParams: '{}',
        },
        LoginResponse: {
            code: 0,
            message: 'SUCCESS',
            data: {
                message: 'Login successful',
            },
        },
    },
};

export default authDoc;
