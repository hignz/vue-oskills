export default {
  user: {},
  accessToken: localStorage.getItem('accessToken') || null,
  isDark: JSON.parse(localStorage.getItem('darkMode')) || false,
  loading: true,
  expandedNavDrawer: true
};
