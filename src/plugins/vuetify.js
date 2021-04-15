import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#D57129',
        secondary: '#948782',
        accent: '#ffa012',
        error: '#fa320a',
        warning: '#cddc39',
        info: '#685d49',
        success: '#629c65'
      },
    },
  },
});
