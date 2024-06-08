import Vuex from 'vuex';
import axios from 'axios';

export const store = new Vuex.Store({
    state: {
        apiUrl: 'http://127.0.0.1:8000/api',
        user: JSON.parse(localStorage.getItem('user')) || null,
        token: localStorage.getItem('token') || null,
    },

    getters: {
        isAuthenticated: state => !!state.token,
        user: state => state.user,
    },

    mutations: {
        SET_USER(state, user) {
            state.user = user;
        },
        SET_TOKEN(state, token) {
            state.token = token;
        },
        CLEAR_AUTH(state) {
            state.user = null;
            state.token = null;
        },
    },

    actions: {
        async fetchUser({ state, commit }) {
            try {
                const response = await axios.get(state.apiUrl + `/user`, {
                    headers: { Authorization: `Bearer ${state.token}` },
                });
                commit('SET_USER', response.data);
            } catch (error) {
                console.error('Failed to fetch user', error);
            }
        },
        logout({ commit }) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            commit('CLEAR_AUTH');
        },
    },
});