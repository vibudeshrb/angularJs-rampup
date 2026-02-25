const constant = {
    apiBaseUrl: 'http://localhost:3000/api/v1',
    templateUrl: {
        signup: 'src/app/views/signup.html',
        login: 'src/app/views/login.html'
    },
    state: {
        home: 'home',
        dashboard: 'dashboard',
        signup: 'signup',
        login: 'login',
        article: 'articles'
    },
    url: {
        root: '/',
        home: '/home',
        dashboard: '/dashboard',
        signup: '/signup',
        login: '/login',
        article: '/articles'
    },
    BACKEND_URL: {
        USERS: {
            user: 'users',
            register: 'register',
            login: 'login'
        }
    },
    REGEX: {
        PASSWORD: /([^a-zA-Z0-9].*[^a-zA-Z0-9])/,
        EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    },
    FORM_ERROR_MESSAGES: {
        USERNAME_REQUIRED: 'Username required',
        PASSWORD_REQUIRED: 'Password required',
        PASSWORD_INVALID:
            'Password must contain 8 characters and two special characters',
        EMAIL_REQUIRED: 'Email required',
        EMAIL_INVALID: 'Invalid email'
    },
    FORM_SUCCESS_MESSAGES: {
        SUCCESS: 'Login Success'
    }
};
