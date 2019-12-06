import Vue from 'vue';
import Vuex from 'vuex';
import router from '../router';
import vuetify from '../plugins/vuetify';
import http from '../utils/http';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    accessToken: localStorage.getItem('accessToken') || null,
    loggingIn: false,
    loginError: null,
    showNavigationDrawer: true,
    isDark: JSON.parse(localStorage.getItem('darkMode')) || false,
    skills: [],
    loading: true,
    expandedNavDrawer: true
  },
  mutations: {
    updateAccessToken: (state, accessToken) => {
      state.accessToken = accessToken;
      localStorage.setItem('accessToken', accessToken);
    },
    loginStop: (state, errorMessage) => {
      state.loggingIn = false;
      state.loginError = errorMessage;
    },
    toggleDrawer: (state, showDrawer) => {
      state.showNavigationDrawer = showDrawer;
    },
    toogleIsDark: (state, value) => {
      state.isDark = value;
      vuetify.framework.theme.dark = value;
    },
    setUser: (state, user) => (state.user = user),
    updateSkills: (state, skills) => (state.skills = skills),
    setLoading: (state, isLoading) => (state.loading = isLoading),
    setExpandedNavDrawer: (state, isExpanded) =>
      (state.expandedNavDrawer = isExpanded)
  },
  getters: {
    accessToken: state => state.accessToken,
    showNavigationDrawer: state => state.showNavigationDrawer,
    getUser: state => state.user,
    skills: state => state.skills,
    topThreeSkills: state =>
      state.skills
        .concat()
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 3),
    isLoading: state => state.loading,
    isDark: state => state.isDark,
    accentColor: () => localStorage.getItem('accentColor'),
    expandedNavDrawer: state => state.expandedNavDrawer
  },
  actions: {
    fetchUser({ commit }, id) {
      commit('setLoading', true);

      return new Promise((resolve, reject) => {
        http
          .get(id ? '/user/' + id : '/user')
          .then(response => {
            commit('setUser', response.data.data);
            commit('updateSkills', response.data.data.skills);
            resolve(response.data.data);
          })
          .catch(error => {
            reject(error);
          })
          .finally(() => commit('setLoading', false));
      });
    },
    fetchUserById(_, id) {
      return new Promise((resolve, reject) => {
        http
          .get('/user/' + id)
          .then(res => {
            resolve(res.data.data);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    getAllUsers() {
      return new Promise((resolve, reject) => {
        http
          .get('/users')
          .then(res => {
            resolve(res);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    doLogin({ commit }, loginData) {
      return new Promise((resolve, reject) => {
        http
          .post('/login', loginData)
          .then(res => {
            commit('updateAccessToken', res.data.token);
            commit('setUser', res.data);
            resolve(res);
          })
          .catch(error => {
            commit('updateAccessToken', null);
            reject(error);
          });
      });
    },
    fetchByName(_, searchTerm) {
      return new Promise((resolve, reject) => {
        http
          .post('/find-by-name', { name: searchTerm })
          .then(res => {
            resolve(res);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    fetchCategories() {
      return new Promise((resolve, reject) => {
        http
          .get('/get-all-categories')
          .then(res => {
            resolve(res);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    fetchAllSkills() {
      return new Promise((resolve, reject) => {
        http
          .get('/get-all-skills')
          .then(res => {
            resolve(res);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    fetchSkills({ commit }) {
      commit('setLoading', true);

      return new Promise((resolve, reject) =>
        http
          .get('/get-all-user-skills')
          .then(res => {
            commit('updateSkills', res.data.skills);
            resolve(res.data.skills);
          })
          .catch(err => {
            console.log(err);
            reject(err);
          })
          .finally(() => commit('setLoading', false))
      );
    },
    fetchSkillsByCategory(_, categoryId) {
      return new Promise((resolve, reject) => {
        http
          .post('/get-skills-by-category', { categoryId })
          .then(res => {
            resolve(res);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    voteSkill(_, skillId) {
      return new Promise((resolve, reject) => {
        http
          .post('/vote-skill', { userSkillId: skillId })
          .then(res => {
            resolve(res);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    addSkillToUser({ commit }, { skillId }) {
      return new Promise((resolve, reject) => {
        http
          .post('/add-skill-to-user', { skillId })
          .then(res => {
            commit('updateSkills', res.data.skills);
            resolve(res.data.skills);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    doRegister(_, registerData) {
      return new Promise((resolve, reject) => {
        http
          .post('/register-user', registerData)
          .then(res => {
            resolve(res);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    fetchAccessToken({ commit }) {
      commit(
        'updateAccessToken',
        JSON.parse(localStorage.getItem('accessToken'))
      );
    },
    fetchDeleteSkill({ commit }, id) {
      return new Promise((resolve, reject) =>
        http
          .post('/remove-user-skill', { id })
          .then(res => {
            commit('updateSkills', res.data.skills);
            resolve(res.data.skills);
          })
          .catch(err => {
            reject(err);
          })
      );
    },
    fetchRecentActivity() {
      return new Promise((resolve, reject) =>
        http
          .get('/recent-activity')
          .then(res => {
            resolve(res.data);
          })
          .catch(err => {
            reject(err);
          })
      );
    },
    updateUser({ commit }, user) {
      commit('setUser', user);
    },
    doLogout({ commit }) {
      commit('updateAccessToken', null);
      localStorage.removeItem('accessToken');
      router.push('/');
    },
    toggleDrawer({ commit }, showDrawer) {
      commit('setExpandedNavDrawer', showDrawer);
    },
    toggleDarkMode({ commit }, value) {
      commit('toogleIsDark', value);
      localStorage.setItem('darkMode', value);
    },
    verifyUser({ commit }, verificationToken) {
      commit('setLoading', true);

      return new Promise((resolve, reject) => {
        http
          .post('/verify-user', { verificationToken })
          .then(res => {
            resolve(res);
          })
          .catch(error => {
            reject(error);
          })
          .finally(() => commit('setLoading', false));
      });
    },
    fetchRecentUsers() {
      return new Promise((resolve, reject) => {
        http
          .get('/recent-users')
          .then(res => {
            resolve(res);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    fetchRecentUsersSlim() {
      return new Promise((resolve, reject) => {
        http
          .get('/recent-users-slim/3')
          .then(res => {
            resolve(res);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    updateLoading({ commit }, isLoading) {
      commit('setLoading', isLoading);
    },
    fetchUserActivity(_, userId) {
      return new Promise((resolve, reject) =>
        http
          .post('/participant-activity', { userId })
          .then(res => {
            resolve(res.data);
          })
          .catch(err => {
            reject(err);
          })
      );
    },
    fetchSkillInfo({ commit }, skillId) {
      commit('setLoading', true);

      return new Promise((resolve, reject) =>
        http
          .post('/get-skill', { skillId })
          .then(res => {
            resolve(res.data);
          })
          .catch(err => {
            reject(err);
          })
          .finally(() => commit('setLoading', false))
      );
    },
    fetchSkillActivity(_, skillId) {
      return new Promise((resolve, reject) =>
        http
          .post('/skill-activity', { skillId })
          .then(res => {
            resolve(res.data);
          })
          .catch(err => {
            reject(err);
          })
      );
    }
  }
});
