import vuetify from '../plugins/vuetify';
import * as constants from './constants';

export default {
  [constants.SET_ACCESS_TOKEN](state, accessToken) {
    state.accessToken = accessToken;
    localStorage.setItem('accessToken', accessToken);
  },
  [constants.SET_USER](state, user) {
    state.user = user;
  },
  [constants.SET_USER_AVATAR](state, url) {
    state.user.image = url;
  },
  [constants.SET_SKILLS](state, skills) {
    state.user.skills = skills;
  },
  [constants.SET_LOADING](state, isLoading) {
    state.loading = isLoading;
  },
  [constants.TOGGLE_DARK_THEME](state, value) {
    state.isDark = value;
    vuetify.framework.theme.dark = value;
    localStorage.setItem('darkMode', value);
  },
  [constants.TOGGLE_SNACKBAR](state, value) {
    state.snackbar.show = value.show;
    state.snackbar.text = value.text;
    state.snackbar.color = value.color;
  },
  [constants.SET_UPLOAD_PROGRESS](state, value) {
    state.uploadProgress = value;
  }
};
