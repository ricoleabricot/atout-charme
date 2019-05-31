import Vue from 'vue';
import Vuex from 'vuex';

import charmers from './modules/charmers';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    charmers,
  },

  strict: true,
  plugins: [],
});
