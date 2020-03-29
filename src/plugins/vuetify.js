import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

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
    iconfont: 'mdi',
    values: {
      javascript: 'mdi-language-javascript',
      java: 'mdi-language-java',
      nodejs: 'mdi-nodejs',
      docker: 'mdi-docker',
      php: 'mdi-language-php',
      vuejs: 'mdi-vuejs',
      awssns: 'mdi-aws',
      awslambda: 'mdi-aws',
      react: 'mdi-react',
      kubernetes: 'mdi-kubernetes'
    }
  }
});
