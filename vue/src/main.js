import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';

const app = createApp(App);

app.config.globalProperties.axios = axios; // Make axios accessible globally

app.use(router);
app.use(store);

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 422) {
            store.commit('setErrors', error.response.data.errors);
        } else if (error.response.status === 401) {
            store.commit('auth/setUserData', null);
            localStorage.removeItem('authToken');
            router.push({ name: 'Login' });
        } else {
            return Promise.reject(error);
        }
    }
);

axios.interceptors.request.use(
    (config) => {
        // Get the token from local storage
        const authToken = localStorage.getItem('authToken');

        // Set the 'Authorization' header
        if (authToken) {
            config.headers.Authorization = `Bearer ${authToken}`;
        }
        config.headers['Content-Type'] = 'multipart/form-data';
        config.headers.Accept = 'application/json';

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

app.mount('#app');