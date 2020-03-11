import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

if (!localStorage.getItem('accentColor')) {
  localStorage.setItem('accentColor', '#ff1f2c');
}

export default new Vuetify({
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      light: {
        primary: localStorage.getItem('accentColor'),
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#44b787',
        warning: '#FFC107'
      },
      dark: {
        background: '#21252b',
        primary: localStorage.getItem('accentColor'),
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#44b787',
        warning: '#FFC107'
      }
    }
  },
  icons: {
    iconfont: 'mdi'
  }
});
