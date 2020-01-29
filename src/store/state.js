export default {
  user: {},
  accessToken: localStorage.getItem('accessToken') || null,
  isDark: JSON.parse(localStorage.getItem('darkMode')) || false,
  loading: true,
  expandedNavDrawer: true,
  snackbar: {
    show: false,
    color: '',
    text: ''
  }
};
