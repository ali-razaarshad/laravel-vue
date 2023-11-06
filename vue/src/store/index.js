import { createStore } from 'vuex';
import auth from "./auth";

export default new createStore({
    state: {
        errors: []
    },

    getters: {
        errors: state => state.errors
    },

    mutations: {
        setErrors(state, errors) {
            state.errors = errors;
        }
    },

    actions: {},

    modules: {
        auth,
    }
});