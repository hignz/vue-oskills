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
  [constants.SET_SKILLS](state, skills) {
    state.user.skills = skills;
  },
  [constants.SET_LOADING](state, isLoading) {
    state.loading = isLoading;
  },
  [constants.SET_EXPANDED_DRAWER](state, isExpanded) {
    state.expandedNavDrawer = isExpanded;
  },
  [constants.TOGGLE_DARK_THEME](state, value) {
    state.isDark = value;
    vuetify.framework.theme.dark = value;
    localStorage.setItem('darkMode', value);
  }
};
