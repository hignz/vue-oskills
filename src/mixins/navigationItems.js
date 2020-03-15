export default {
  data() {
    return {
      links: [
        {
          icon: 'mdi-account-tie',
          iconOutline: 'mdi-account-tie-outline',
          text: 'Admin',
          route: '/admin',
          requiresAdmin: true
        },
        {
          icon: 'mdi-account-details',
          iconOutline: 'mdi-account-details-outline',
          text: 'Manage',
          route: '/manage',
          requiresAdmin: true
        },
        {
          icon: 'mdi-view-dashboard',
          iconOutline: 'mdi-view-dashboard-outline',
          text: 'Dashboard',
          route: '/dashboard'
        },
        {
          icon: 'mdi-star-circle',
          iconOutline: 'mdi-star-circle-outline',
          text: 'My Skills',
          route: '/skills'
        },
        {
          icon: 'mdi-compass',
          iconOutline: 'mdi-compass-outline',
          text: 'Discover',
          route: '/explore'
        }
        // {
        //   icon: 'mdi-cog',
        //   iconOutline: 'mdi-cog-outline',
        //   text: 'Settings',
        //   route: '/settings'
        // }
      ]
    };
  }
};
