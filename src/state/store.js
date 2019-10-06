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
    showNavigationBar: true,
    isDark: JSON.parse(localStorage.getItem('darkMode')) || false,
    skills: []
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
      state.showNavigationBar = showDrawer;
    },
    toogleIsDark: (state, value) => {
      state.isDark = value;
      vuetify.framework.theme.dark = value;
    },
    setUser: (state, user) => (state.user = user),
    updateSkills: (state, skills) => (state.skills = skills)
  },
  getters: {
    accessToken: state => state.accessToken,
    showNavigationBar: state => state.accessToken && state.showNavigationBar,
    getUser: state => state.user,
    skills: state => state.skills,
    sortedSkills: state =>
      state.user.skills.concat().sort((a, b) => b.rating - a.rating)
  },
  actions: {
    fetchUser({ commit }, id) {
      axios.defaults.headers.common = {
        Authorization: `Bearer ${this.getters.accessToken}`
      };

      return new Promise((resolve, reject) => {
        axios
          .get(
            id
              ? 'http://localhost:1111/user/' + id
              : 'http://localhost:1111/user'
          )
          .then(response => {
            commit('setUser', response.data.data);
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
    fetchUsersByName({ commit }, searchTerm) {
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
          .post('http://localhost:1111/findusersbyname', body, config)
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
    fetchSkillsById({ commit }, categoryId) {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      return new Promise((resolve, reject) => {
        axios
          .post(
            'http://localhost:1111/get-skills-by-id',
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
        .post('http://localhost:1111/register', registerData, config)
        .then(response => {
          router.push('/login');
        })
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
    fetchSkills({ commit }) {
      axios.defaults.headers.common = {
        Authorization: `Bearer ${this.getters.accessToken}`
      };

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
      );
    },
    fetchDeleteSkill({ commit }, skillId) {
      axios.defaults.headers.common = {
        Authorization: `Bearer ${this.getters.accessToken}`
      };

      return new Promise((resolve, reject) =>
        axios
          .post('http://localhost:1111/remove-user-skill', { skillId })
          .then(response => {
            commit('updateSkills', response.data.skills);
            resolve(response.data.skills);
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
    }
  }
});
