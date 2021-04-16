import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        /* 主題1 */
        /*
        primary: '#D57129',
        secondary: '#948782',
        accent: '#ffa012',
        error: '#fa320a',
        warning: '#cddc39',
        info: '#685d49',
        success: '#629c65'
        */
       /* 主題2 */
        primary: '#0ec900',
        secondary: '#8aa688',
        accent: '#30e3bc',
        error: '#ff1212',
        warning: '#e4f734',
        info: '#6ce81a',
        success: '#21b1ff'
      },
    },
  },
});
