const constant = {
    apiBaseUrl: 'http://localhost:3000/api/v1',
    templateUrl: {
        signup: 'src/app/views/signup.html',
        login: 'src/app/views/login.html',
        articleList: 'src/app/views/articleList.html',
        articleCreate: 'src/app/views/articleCreate.html',
        articleDetail: 'src/app/views/articleDetail.html'
    },
    state: {
        home: 'home',
        dashboard: 'dashboard',
        signup: 'signup',
        login: 'login',
        article: 'articles',
        articleList: 'articles.list',
        articleCreate: 'articles.create',
        articleDetail: 'articles.detail'
    },
    url: {
        root: '',
        home: '/home',
        dashboard: '/dashboard',
        signup: '/signup',
        login: '/login',
        article: '/articles',
        articleList: '',
        articleCreate: '/create',
        articleDetail: '/:id'
    },
    BACKEND_URL: {
        USERS: {
            user: 'users',
            register: 'register',
            login: 'login'
        },
        ARTICLES: {
            articles: 'articles'
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
        EMAIL_INVALID: 'Invalid email',
        ARTICLE_TITLE: 'Title is required and must be at least 4 characters.',
        ARTICLE_SHORT:
            'Short Description must be between 10 and 50 characters.',
        ARTICLE_DESCRIPTION: 'Description must be at least 50 characters.',
        ARTICLE_TAGS: 'At least one tag must be present.'
    },
    FORM_SUCCESS_MESSAGES: {
        SUCCESS: 'Login Success'
    }
};
