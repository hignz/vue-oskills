import http from '../utils/http';
import router from '../router/index.js';
import * as constants from './constants';

export default {
  fetchUser({ commit }, id) {
    commit(constants.SET_LOADING, true);

    return http.get(id ? '/user/' + id : '/user').then(res => {
      commit(constants.SET_USER, res.data.data);
      commit(constants.SET_SKILLS, res.data.data.skills);
      commit(constants.SET_LOADING, false);

      return res.data;
    });
  },
  fetchUserById(_, id) {
    return http.get('/user/' + id).then(res => {
      return res.data;
    });
  },
  fetchAllUsers() {
    return http.get('/users').then(res => {
      return res.data;
    });
  },
  doLogin({ commit }, loginData) {
    return http.post('/login', loginData).then(res => {
      commit(constants.SET_ACCESS_TOKEN, res.data.token);
      commit(constants.SET_USER, res.data);
      return res.data;
    });
  },
  doLogout({ commit }) {
    commit(constants.SET_ACCESS_TOKEN, null);
    localStorage.removeItem('accessToken');
    router.push({ name: 'login' });
  },
  fetchByName(_, searchTerm) {
    return http.post('/find-by-name', { name: searchTerm }).then(res => {
      return res.data;
    });
  },
  fetchCategories() {
    return http.get('/get-all-categories').then(res => {
      return res.data;
    });
  },
  fetchAllSkills() {
    return http.get('/get-all-skills').then(res => {
      return res.data;
    });
  },
  fetchUserSkills({ commit }) {
    commit(constants.SET_LOADING, true);

    return http.get('/get-all-user-skills').then(res => {
      commit(constants.SET_SKILLS, res.data.skills);
      commit(constants.SET_LOADING, false);
      return res.data;
    });
  },
  fetchSkillsByCategory(_, categoryId) {
    return http.post('/get-skills-by-category', { categoryId }).then(res => {
      return res.data;
    });
  },
  voteSkill(_, skillId) {
    return http.post('/vote-skill', { userSkillId: skillId }).then(res => {
      return res.data;
    });
  },
  addSkillToUser({ commit }, { skillId }) {
    return http.post('/add-skill-to-user', { skillId }).then(res => {
      commit(constants.SET_SKILLS, res.data.skills);
      return res.data;
    });
  },
  doRegister(_, registerData) {
    return http.post('/register-user', registerData).then(res => {
      return res.data;
    });
  },
  fetchDeleteSkill({ commit }, id) {
    return http.post('/remove-user-skill', { id }).then(res => {
      commit(constants.SET_SKILLS, res.data.skills);
      return res.data;
    });
  },
  fetchRecentActivity() {
    return http.get('/recent-activity').then(res => {
      return res.data;
    });
  },
  verifyUser({ commit }, token) {
    commit(constants.SET_LOADING, true);

    return http.post('/verify-user', { verificationToken: token }).then(res => {
      commit(constants.SET_LOADING, false);
      return res.data;
    });
  },
  fetchRecentUsers({ commit }) {
    commit(constants.SET_LOADING, true);

    return http.get('/recent-users').then(res => {
      commit(constants.SET_LOADING, false);
      return res.data;
    });
  },
  fetchRecentUsersSlim(amount) {
    return http.get(`/recent-users-slim/${amount}`).then(res => {
      return res.data;
    });
  },
  fetchUserActivity(_, userId) {
    return http.post('/participant-activity', { userId }).then(res => {
      return res.data;
    });
  },
  fetchSkillInfo({ commit }, skillId) {
    commit(constants.SET_LOADING, true);

    return http.post('/get-skill', { skillId }).then(res => {
      commit(constants.SET_LOADING, false);
      return res.data;
    });
  },
  fetchSkillActivity(_, skillId) {
    return http.post('/skill-activity', { skillId }).then(res => {
      return res.data;
    });
  },
  setLoading({ commit }, isLoading) {
    commit(constants.SET_LOADING, isLoading);
  },
  updateUser({ commit }, user) {
    commit(constants.SET_USER, user);
  },
  toggleDrawer({ commit }, showDrawer) {
    commit(constants.SET_EXPANDED_DRAWER, showDrawer);
  },
  toggleDarkMode({ commit }, value) {
    commit(constants.TOGGLE_DARK_THEME, value);
  },
  fetchAccessToken({ commit }) {
    commit(
      constants.SET_ACCESS_TOKEN,
      JSON.parse(localStorage.getItem('accessToken'))
    );
  },
  inviteUser(_, inviteData) {
    return http.post('/invite', inviteData).then(res => {
      return res.data;
    });
  }
};
