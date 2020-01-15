import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import { preset } from 'vue-cli-plugin-vuetify-preset-fortnightly/preset'

Vue.use(Vuetify);

export default new Vuetify({
  preset,
  theme: {
    themes: {
      light: {
        primary: '#356859',
        secondary: '#083759',
        accent: '#8c9eff',
        error: '#b71c1c',
      },
    },
  },
});
