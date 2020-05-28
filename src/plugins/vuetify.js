import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import ptbr from 'vuetify/es5/locale/pt';
import { project_data } from "@/config/config"

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: { ptbr },
    current: 'ptbr',
  },
  theme: {
    themes: {
      light: {
        primary: project_data.COLOR
      }
    }
  }
});
