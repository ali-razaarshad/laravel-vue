import axios from "axios";

export default {
    namespaced: true,

    state: {
        userData: null
    },

    getters: {
        user: state => state.userData
    },

    mutations: {
        setUserData(state, user) {
            state.userData = user;
        }
    },

    actions: {
        getUserData({ commit }) {
            axios
                .get(import.meta.env.VITE_APP_API_URL + "user")
                .then(response => {
                    commit("setUserData", response.data);
                })
                .catch(() => {
                    localStorage.removeItem("authToken");
                });
        },
        sendLoginRequest({ commit }, data) {
            commit("setErrors", {}, { root: true });
            return axios
                .post(import.meta.env.VITE_APP_API_URL + "login", data)
                .then(response => {
                    commit("setUserData", response.data.user);
                    localStorage.setItem("authToken", response.data.token);
                });
        },
        sendRegisterRequest({ commit }, data) {
            commit("setErrors", {}, { root: true });
            return axios
                .post(import.meta.env.VITE_APP_API_URL + "register", data)
                .then(response => {
                    commit("setUserData", response.data.user);
                    localStorage.setItem("authToken", response.data.token);
                });
        },
        sendLogoutRequest({ commit }) {
            axios.post(import.meta.env.VITE_APP_API_URL + "logout").then(() => {
                commit("setUserData", null);
                localStorage.removeItem("authToken");
                this.$router.push({name: "Home"});
            });
        },
        sendVerifyResendRequest() {
            return axios.get(import.meta.env.VITE_APP_API_URL + "email/resend");
        },
        sendVerifyRequest({ dispatch }, hash) {
            return axios
                .get(import.meta.env.VITE_APP_API_URL + "email/verify/" + hash)
                .then(() => {
                    dispatch("getUserData");
                });
        }
    }
};