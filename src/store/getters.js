export default {
  accessToken: state => state.accessToken,
  getUser: state => state.user,
  topThreeSkills: state =>
    state.user.skills
      .concat()
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3),
  isLoading: state => state.loading,
  isDark: state => state.isDark,
  accentColor: () => localStorage.getItem('accentColor'),
  expandedNavDrawer: state => state.expandedNavDrawer
};
