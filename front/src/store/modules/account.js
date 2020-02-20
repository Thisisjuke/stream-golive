import userApi from '@/api/user';

const user = JSON.parse(localStorage.getItem('user'));
const state = user
    ? { status: { loggedIn: true }, user }
    : { status: {}, user: null };

const actions = {
    login({ dispatch, commit }, inputForm) {
        commit('USER_LOGIN_REQUEST', inputForm.email);

        userApi.login(inputForm)
            .then(user => {
                commit('USER_LOGIN_SUCCESS', user);
            }).catch(()=>{
                commit('USER_LOGIN_FAILURE', user);
            });
    },
    logout({ commit }) {
        userApi.logout();
        commit('USER_LOGOUT');
    },
    register({ dispatch, commit }, user) {
        commit('USER_REGISTER_REQUEST', user);

        userApi.register(user)
            .then(user => {
                commit('USER_REGISTER_SUCCESS', user);
                this.$router.push('/login');
            })
            .catch(() => {
                commit('USER_REGISTER_FAILURE', user);
            });
    },
};

const mutations = {
    USER_LOGIN_REQUEST(state, user) {
        state.status = { loggingIn: true };
        state.user = user;
    },
    USER_LOGIN_SUCCESS(state, user) {
        state.status = { loggedIn: true };
        state.user = user;
    },
    USER_DATA_FROM_JWT(state, user) {
        state.status = { loggedIn: true };
        state.user = user;
    },
    USER_LOGIN_FAILURE(state) {
        state.status = {};
        state.user = null;
    },
    USER_LOGOUT(state) {
        state.status = {};
        state.user = null;
    },
    USER_REGISTER_REQUEST(state, user) {
        state.status = { registering: true };
    },
    USER_REGISTER_SUCCESS(state, user) {
        state.status = {};
    },
    USER_REGISTER_FAILURE(state, error) {
        state.status = {};
    }
};

const getters = {
    userInfos: (state) => {
        return state.user
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters,
};
