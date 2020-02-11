import http from '../utils/http';
import router from '../router/index.js';
import * as constants from './constants';
import state from './state';

export default {
  fetchUser({ commit }, id) {
    commit(constants.SET_LOADING, true);

    return http.get(id ? `/user/${id}` : '/user/').then(res => {
      commit(constants.SET_USER, res.data.data);
      commit(constants.SET_SKILLS, res.data.data.skills);
      commit(constants.SET_LOADING, false);

      return res.data;
    });
  },
  deleteUser(_, userId) {
    return http.delete('/admin/delete/', { userId }).then(res => {
      return res.data;
    });
  },
  fetchUserById(_, id) {
    return http.get(`/user/${id}`).then(res => {
      return res.data;
    });
  },
  fetchAllUsers() {
    return http.get('/user/users').then(res => {
      return res.data;
    });
  },
  doLogin({ commit }, loginData) {
    return http.post('/auth/login', loginData).then(res => {
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
    return http.post('/user/find-by-name', { name: searchTerm }).then(res => {
      return res.data;
    });
  },
  fetchCategories() {
    return http.get('/category/get-all-categories').then(res => {
      return res.data;
    });
  },
  fetchCategoriesArchived(_, value) {
    return http
      .get(`/category/get-all-categories?archived=${value}`)
      .then(res => {
        return res.data;
      });
  },
  fetchAllSkills({ commit }) {
    return http.get('/skill/get-all-skills').then(res => {
      commit(constants.SET_LOADING, false);
      return res.data;
    });
  },
  fetchUserSkills({ commit }) {
    commit(constants.SET_LOADING, true);

    return http.get('/skill/get-all-user-skills').then(res => {
      commit(constants.SET_SKILLS, res.data.skills);
      commit(constants.SET_LOADING, false);
      return res.data;
    });
  },
  fetchTopSkills() {
    return http.get('/skill/get-top-skills').then(res => {
      return res.data;
    });
  },
  fetchSkillsByCategory(_, categoryId) {
    return http
      .post('/skill/get-skills-by-category', { categoryId })
      .then(res => {
        return res.data;
      });
  },
  voteSkill(_, skillId) {
    return http.post('/skill/vote', { userSkillId: skillId }).then(res => {
      return res.data;
    });
  },
  addSkillToUser({ commit }, { skillId }) {
    return http.post('/skill/add-skill-to-user', { skillId }).then(res => {
      commit(constants.SET_SKILLS, res.data.skills);
      return res.data;
    });
  },
  doRegister(_, registerData) {
    return http.post('/user/register', registerData).then(res => {
      return res.data;
    });
  },
  fetchDeleteSkill({ commit }, skillId) {
    return http.post('/skill/remove-user-skill', { skillId }).then(res => {
      commit(constants.SET_SKILLS, res.data.skills);
      return res.data;
    });
  },
  fetchRecentActivity() {
    return http.get('/activity/recent').then(res => {
      return res.data;
    });
  },
  verifyUser({ commit }, token) {
    commit(constants.SET_LOADING, true);

    return http
      .post('/auth/verify-user', { verificationToken: token })
      .then(res => {
        commit(constants.SET_LOADING, false);
        return res.data;
      });
  },
  fetchRecentUsers({ commit }) {
    commit(constants.SET_LOADING, true);

    return http.get('/user/recent-users').then(res => {
      commit(constants.SET_LOADING, false);
      return res.data;
    });
  },
  fetchRecentUsersSlim(_, amount) {
    return http.get(`/user/recent-users-slim/?amount=${amount}`).then(res => {
      return res.data;
    });
  },
  fetchParticipantActivity(_, userId) {
    return http.post('/activity/participant', { userId }).then(res => {
      return res.data;
    });
  },
  fetchSkillInfo({ commit }, skillId) {
    commit(constants.SET_LOADING, true);

    return http.post('/skill/get-skill', { skillId }).then(res => {
      commit(constants.SET_LOADING, false);
      return res.data;
    });
  },
  fetchSkillActivity(_, skillId) {
    return http.post('/activity/skill', { skillId }).then(res => {
      return res.data;
    });
  },
  addSkill(_, skillData) {
    return http.post('/skill/add', skillData).then(res => {
      return res.data;
    });
  },
  editSkill(_, skillData) {
    return http.post('/skill/edit', skillData).then(res => {
      return res.data;
    });
  },
  addCategory(_, categoryData) {
    return http.post('/category/add', { name: categoryData.name }).then(res => {
      return res.data;
    });
  },
  editCategory(_, categoryData) {
    return http.post('/category/edit', categoryData).then(res => {
      return res.data;
    });
  },
  addAdmin(_, userData) {
    return http.post('/admin/add', userData).then(res => {
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
    return http.post('/user/invite', inviteData).then(res => {
      return res.data;
    });
  },
  toggleSnackbar({ commit }, snackbarData) {
    commit(constants.TOGGLE_SNACKBAR, snackbarData);
  },
  archiveSkill(_, skillId) {
    return http.post('/skill/archive', { skillId }).then(res => {
      return res.data;
    });
  },
  unarchiveSkill(_, skillId) {
    return http.post('/skill/unarchive', { skillId }).then(res => {
      return res.data;
    });
  },
  archiveCategory(_, categoryId) {
    return http.post('/category/archive', { categoryId }).then(res => {
      return res.data;
    });
  },
  unarchiveCategory(_, categoryId) {
    return http.post('/category/unarchive', { categoryId }).then(res => {
      return res.data;
    });
  },
  fetchAdminDashboardData(_) {
    return http.get('/admin/').then(res => {
      return res.data;
    });
  },
  doPasswordResetRequest(_, email) {
    return http.post('/auth/forgot-password', { email }).then(res => {
      return res.data;
    });
  },
  verifyResetRequest(_, resetToken) {
    return http.post('/auth/verify-reset-request', { resetToken }).then(res => {
      return res.data;
    });
  },
  resetPassword(_, resetData) {
    return http.post('/auth/reset-password', resetData).then(res => {
      return res.data;
    });
  },
  doChangePassword(_, passwordData) {
    return http
      .post('/auth/change-password', {
        email: state.user.email,
        ...passwordData
      })
      .then(res => {
        return res.data;
      });
  }
};
