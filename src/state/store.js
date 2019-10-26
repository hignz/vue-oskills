import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from '../router';
import vuetify from '../plugins/vuetify';

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
    loading: true
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
    setLoading: (state, isLoading) => (state.loading = isLoading)
  },
  getters: {
    accessToken: state => state.accessToken,
    showNavigationDrawer: state =>
      state.accessToken && state.showNavigationDrawer,
    getUser: state => state.user,
    skills: state => state.skills,
    topThreeSkills: state =>
      state.skills
        .concat()
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 3),
    isLoading: state => state.loading,
    isDark: state => state.isDark,
    accentColor: () => localStorage.getItem('accentColor')
  },
  actions: {
    fetchUser({ commit }, id) {
      axios.defaults.headers.common = {
        Authorization: `Bearer ${this.getters.accessToken}`
      };

      commit('setLoading', true);

      return new Promise((resolve, reject) => {
        axios
          .get(
            id
              ? 'http://localhost:1111/user/' + id
              : 'http://localhost:1111/user'
          )
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
    fetchUserById({ commit }, id) {
      axios.defaults.headers.common = {
        Authorization: `Bearer ${this.getters.accessToken}`
      };

      return new Promise((resolve, reject) => {
        axios
          .get('http://localhost:1111/user/' + id)
          .then(response => {
            resolve(response.data.data);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    getAllUsers({ commit }, token) {
      axios.defaults.headers.common = {
        Authorization: `Bearer ${this.getters.accessToken}`
      };

      return new Promise((resolve, reject) => {
        axios
          .get('http://localhost:1111/users')
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            console.log(error);
            reject(error);
          });
      });
    },
    doLogin({ commit }, loginData) {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      return new Promise((resolve, reject) => {
        axios
          .post('http://localhost:1111/login', loginData, config)
          .then(response => {
            commit('updateAccessToken', response.data.token);
            commit('setUser', response.data);
            resolve(response);
          })
          .catch(error => {
            commit('updateAccessToken', null);
            reject(error);
          });
      });
    },
    fetchByName({ commit }, searchTerm) {
      axios.defaults.headers.common = {
        Authorization: `Bearer ${this.getters.accessToken}`
      };

      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const body = {
        name: searchTerm
      };

      return new Promise((resolve, reject) => {
        axios
          .post('http://localhost:1111/find-by-name', body, config)
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    fetchCategories() {
      return new Promise((resolve, reject) => {
        axios
          .get('http://localhost:1111/get-all-categories')
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    fetchAllSkills() {
      return new Promise((resolve, reject) => {
        axios
          .get('http://localhost:1111/get-all-skills')
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    fetchSkills({ commit }) {
      axios.defaults.headers.common = {
        Authorization: `Bearer ${this.getters.accessToken}`
      };

      commit('setLoading', true);

      return new Promise((resolve, reject) =>
        axios
          .get('http://localhost:1111/get-all-user-skills')
          .then(response => {
            commit('updateSkills', response.data.skills);
            resolve(response.data.skills);
          })
          .catch(err => {
            console.log(err);
            reject(err);
          })
          .finally(() => commit('setLoading', false))
      );
    },
    fetchSkillsByCategory({ commit }, categoryId) {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      return new Promise((resolve, reject) => {
        axios
          .post(
            'http://localhost:1111/get-skills-by-category',
            { categoryId },
            config
          )
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    voteSkill({ commit }, skillId) {
      axios.defaults.headers.common = {
        Authorization: `Bearer ${this.getters.accessToken}`
      };

      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      return new Promise((resolve, reject) => {
        axios
          .post(
            'http://localhost:1111/vote-skill',
            { userSkillId: skillId },
            config
          )
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    addSkillToUser({ commit }, { skillId }) {
      axios.defaults.headers.common = {
        Authorization: `Bearer ${this.getters.accessToken}`
      };

      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      return new Promise((resolve, reject) => {
        axios
          .post('http://localhost:1111/add-skill-to-user', { skillId }, config)
          .then(response => {
            commit('updateSkills', response.data.skills);
            resolve(response.data.skills);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    doRegister({ commit }, registerData) {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      axios
        .post('http://localhost:1111/register-user', registerData, config)
        .then(response => {})
        .catch(error => {
          console.log(error);
        });
    },
    fetchAccessToken({ commit }) {
      commit(
        'updateAccessToken',
        JSON.parse(localStorage.getItem('accessToken'))
      );
    },
    fetchDeleteSkill({ commit }, id) {
      axios.defaults.headers.common = {
        Authorization: `Bearer ${this.getters.accessToken}`
      };

      return new Promise((resolve, reject) =>
        axios
          .post('http://localhost:1111/remove-user-skill', { id })
          .then(response => {
            commit('updateSkills', response.data.skills);
            resolve(response.data.skills);
          })
          .catch(err => {
            reject(err);
          })
      );
    },
    fetchRecentActivity({ commit }) {
      axios.defaults.headers.common = {
        Authorization: `Bearer ${this.getters.accessToken}`
      };

      return new Promise((resolve, reject) =>
        axios
          .get('http://localhost:1111/recent-activity')
          .then(response => {
            resolve(response.data);
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
      commit('toggleDrawer', showDrawer);
    },
    toggleDarkMode({ commit }, value) {
      commit('toogleIsDark', value);
      localStorage.setItem('darkMode', value);
    },
    verifyUser({ commit }, verificationToken) {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      commit('setLoading', true);

      return new Promise((resolve, reject) => {
        axios
          .post(
            'http://localhost:1111/verify-user',
            { verificationToken },
            config
          )
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          })
          .finally(() => commit('setLoading', false));
      });
    },
    fetchRecentUsers({ commit }) {
      axios.defaults.headers.common = {
        Authorization: `Bearer ${this.getters.accessToken}`
      };

      return new Promise((resolve, reject) => {
        axios
          .get('http://localhost:1111/recent-users')
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    updateLoading({ commit }, isLoading) {
      commit('setLoading', isLoading);
    },
    fetchUserActivity({ commit }, userId) {
      axios.defaults.headers.common = {
        Authorization: `Bearer ${this.getters.accessToken}`
      };

      return new Promise((resolve, reject) =>
        axios
          .post('http://localhost:1111/participant-activity', { userId })
          .then(response => {
            resolve(response.data);
          })
          .catch(err => {
            reject(err);
          })
      );
    },
    fetchSkillInfo({ commit }, skillId) {
      axios.defaults.headers.common = {
        Authorization: `Bearer ${this.getters.accessToken}`
      };

      return new Promise((resolve, reject) =>
        axios
          .post('http://localhost:1111/get-skill', { skillId })
          .then(response => {
            resolve(response.data);
          })
          .catch(err => {
            reject(err);
          })
      );
    }
  }
});
