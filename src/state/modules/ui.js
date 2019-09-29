import vuetify from '../../plugins/vuetify';

export default {
  state: {
    showNavigationBar: true,
    isDark: JSON.parse(localStorage.getItem('darkMode')) || false
  },
  getters: {
    showNavigationBar: state => state.accessToken && state.showNavigationBar
  },
  mutations: {
    toggleDrawer: (state, showDrawer) => {
      state.showNavigationBar = showDrawer;
    },
    toogleIsDark: (state, value) => {
      state.isDark = value;
      vuetify.framework.theme.dark = value;
    }
  },
  actions: {
    toggleDrawer({ commit }, showDrawer) {
      commit('toggleDrawer', showDrawer);
    },
    toggleDarkMode({ commit }, value) {
      commit('toogleIsDark', value);
      localStorage.setItem('darkMode', value);
    }
  }
};
