import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

if (!localStorage.getItem('accentColor')) {
  localStorage.setItem('accentColor', '#ff1f2c');
}

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: localStorage.getItem('accentColor'),
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
      },
      dark: {
        primary: localStorage.getItem('accentColor'),
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
      }
    }
  },
  icons: {
    iconfont: 'mdi'
  }
});
