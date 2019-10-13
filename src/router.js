import Vue from 'vue';
import Router from 'vue-router';

import store from './state/store';

Vue.use(Router);

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('./views/Dashboard'),
    meta: { requiresAuth: true }
  },
  {
    path: '/explore',
    name: 'explore',
    component: () => import('./views/Explore'),
    meta: { requiresAuth: true }
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('./views/Settings'),
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('./views/Login'),
    meta: { requiresVisitor: true }
  },
  {
    path: '/register/:token',
    name: 'register',
    component: () => import('./views/Register'),
    meta: { requiresVisitor: true }
  },
  {
    path: '/profile/:id',
    name: 'profile',
    component: () => import('./views/UserProfile'),
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/results',
    name: 'results',
    component: () => import('./views/Results'),
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/skill/:id',
    name: 'skillprofile',
    component: () => import('./views/SkillProfile'),
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/skills',
    name: 'skills',
    component: () => import('./views/Skills'),
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '*',
    redirect: '/'
  }
];

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if authenticated in
    // if not, redirect to login page.
    if (!store.getters.accessToken) {
      next({
        path: '/login'
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    // this route requires visitor, check if NOT authenticated
    // if not, redirect to dashboard.
    if (store.getters.accessToken) {
      next({
        path: '/dashboard'
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
