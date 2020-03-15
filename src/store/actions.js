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
    return http.delete('/admin/delete/', { data: userId }).then(res => {
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
    return http.get('/skill/top').then(res => {
      return res.data;
    });
  },
  fetchSkillsByCategory(_, options) {
    return http.post('/skill/get-skills-by-category', options).then(res => {
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
    const formData = new FormData();
    formData.append('image', registerData.image);
    formData.append('skills', JSON.stringify(registerData.skills));
    formData.append('name', registerData.name);
    formData.append('password', registerData.password);
    formData.append('verificationToken', registerData.verificationToken);

    return http.post('/user/register', formData).then(res => {
      return res.data;
    });
  },
  fetchDeleteSkill(_, skillId) {
    return http.post('/skill/remove-user-skill', { skillId }).then(res => {
      state.user.skills = state.user.skills.filter(s => s._id !== skillId);
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
  fetchSkill({ commit }, skillId) {
    commit(constants.SET_LOADING, true);

    return http.get(`/skill/${skillId}`).then(res => {
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
    return http.post('/category/add', categoryData).then(res => {
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
  updateUserAvatar({ commit }, url) {
    commit(constants.SET_USER_AVATAR, url);
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
  updateInvite(_, inviteData) {
    return http.post('/admin/update-invite', inviteData).then(res => {
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
  fetchAdminDashboardData({ commit }) {
    commit(constants.SET_LOADING, true);

    return http.get('/admin').then(res => {
      commit(constants.SET_LOADING, false);

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
  },
  fetchRecentlyAddedSkills() {
    return http.get('/skill/recently-added').then(res => {
      return res.data;
    });
  },
  fetchUsersWithSkills(_, filterData) {
    return http.post('/user/find-users-with-skills', filterData).then(res => {
      return res.data;
    });
  },
  uploadProfilePicture({ commit }, file) {
    const formData = new FormData();
    formData.append('image', file);
    return http
      .post('/upload', formData, {
        onUploadProgress: ProgressEvent => {
          commit(
            constants.SET_UPLOAD_PROGRESS,
            Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100)
          );
        }
      })
      .then(res => {
        commit(constants.SET_UPLOAD_PROGRESS, null);

        return res.data;
      });
  },
  fetchInvitedUsersSlim(_, amount) {
    return http
      .get(`user/recently-invited-slim/?amount=${amount}`)
      .then(res => {
        return res.data;
      });
  },
  doAddRole(_, roleData) {
    return http.post('/role/add', roleData).then(res => {
      return res.data;
    });
  },
  fetchAllRoles() {
    return http.get('/role').then(res => {
      return res.data;
    });
  },
  fetchAllActiveSkills() {
    return http.get('/skill/active').then(res => {
      return res.data;
    });
  },
  fetchCategory({ commit }, categoryId) {
    commit(constants.SET_LOADING, true);

    return http.get(`/category/${categoryId}`).then(res => {
      commit(constants.SET_LOADING, false);
      return res.data;
    });
  },
  fetchCategoryActivity(_, categoryId) {
    return http.post('/activity/category', { categoryId }).then(res => {
      return res.data;
    });
  },
  fetchReport(_, type) {
    return http
      .get(`/admin/report?type=${type}`, { responseType: 'blob' })
      .then(res => {
        const fileURL = window.URL.createObjectURL(new Blob([res.data]));
        const fileLink = document.createElement('a');
        fileLink.href = fileURL;
        fileLink.setAttribute('download', `oskills_report_${type}.xlsx`);

        document.body.appendChild(fileLink);
        fileLink.click();
        document.body.removeChild(fileLink);

        return res.data;
      });
  }
};
