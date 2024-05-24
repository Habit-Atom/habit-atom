import axios from 'axios';

export const getAuthToken = () => {
    return window.localStorage.getItem('auth_token');
};

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

const refreshToken = async () => {
    try {
        const refreshToken = window.localStorage.getItem('auth_token'); // Assuming you have a refresh token stored
        const response = await axios.post('/api/v1/refreshToken', { token: refreshToken });
        const newAuthToken = response.data.token;
        setAuthHeader(newAuthToken);
        return newAuthToken;
    } catch (error) {
        console.error('Failed to refresh token:', error);
        // Optionally handle refresh token failure (e.g., logout user)
        return null;
    }
};

// Response interceptor to handle 401 errors
axios.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const newToken = await refreshToken();
            if (newToken) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
                originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                return axios(originalRequest);
            }
        }
        return Promise.reject(error);
    }
);

export const request = (method, url, data) => {
    let headers = {};
    if (getAuthToken() !== null && getAuthToken() !== "null") {
        headers = { 'Authorization': `Bearer ${getAuthToken()}` };
    }

    return axios({
        method: method,
        url: url,
        headers: headers,
        data: data
    });
};
