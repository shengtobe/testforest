import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#D57129',
        secondary: '#795548',
        accent: '#ff9800',
        error: '#fa320a',
        warning: '#cddc39',
        info: '#845bf5',
        success: '#4caf50'
      },
    },
  },
});
