import axios from 'axios';

export const getAuthToken = () => window.localStorage.getItem('auth_token');

export const setAuthHeader = (token) => {
    window.localStorage.setItem('auth_token', token);
    chrome.runtime.sendMessage(
        'mlkfffkkokjlijcbejckfafbgjjhcmkm',
        { action: 'storeToken', token: token },
        function(response) {
            if (response && response.status === 'success') {
                console.log('Token is stored in the extension.');
            } else {
                console.error('Failed to store the token in the extension.');
            }
        }
    );
};

axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers.post['Content-Type'] = 'application/json';

let isRefreshing = false;
let refreshSubscribers = [];

const onRrefreshed = (token) => {
    refreshSubscribers.map((callback) => callback(token));
}

const addRefreshSubscriber = (callback) => {
    refreshSubscribers.push(callback);
}

const refreshToken = async () => {
    try {
        const token = getAuthToken();
        const response = await axios.post('/api/v1/refreshToken', { token });
        const newAuthToken = response.data.token;
        setAuthHeader(newAuthToken);
        onRrefreshed(newAuthToken);
        refreshSubscribers = [];
        return newAuthToken;
    } catch (error) {
        console.error('Failed to refresh token:', error);
        return null;
    } finally {
        isRefreshing = false;
    }
};

axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const { config, response: { status } } = error;
        const originalRequest = config;

        if (status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve) => {
                    addRefreshSubscriber((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        resolve(axios(originalRequest));
                    });
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;
            const newToken = await refreshToken();

            if (newToken) {
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return axios(originalRequest);
            }
        }
        return Promise.reject(error);
    }
);

export const request = (method, url, data) => axios({
    method,
    url,
    data,
    headers: getAuthToken() ? { Authorization: `Bearer ${getAuthToken()}` } : {},
});