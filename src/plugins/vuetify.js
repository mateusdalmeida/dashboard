import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import pt from 'vuetify/es5/locale/pt';
import { project_data } from "@/config/config"

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: { pt },
    current: 'pt',
  },
  theme: {
    themes: {
      light: {
        primary: project_data.COLOR
      }
    }
  }
});
