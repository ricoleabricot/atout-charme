import { db, storage } from '../../firebase';

const state = {
  list: [],
  loading: false,
  errors: [],
};

const getters = {
  /** Get charmers */
  getCharmers() {
    return state.list;
  },

  /** Get last error in state */
  getLasterror() {
    return state.errors[state.errors.length - 1];
  },
};

const actions = {
  /** GET /charmers */
  fetchCharmers({ commit }) {
    commit('updateLoadingStatus', true);

    db.collection('charmers').orderBy('charms', 'desc').get()
      .then((docs) => {
        if (!docs.empty) {
          const charmers = [];
          docs.forEach((doc) => {
            const data = doc.data();
            data.id = doc.id;

            charmers.push(data);
          });

          commit('updateCharmers', charmers);
        }
      })
      .catch((error) => {
        commit('pushNewError', error);
      })
      .then(() => {
        commit('updateLoadingStatus', false);
      });
  },

  /* eslint-disable */
  /** PUT /charmers/{id} */
  updateCharmer({ commit }, { id, charms }) {
    commit('updateLoadingStatus', true);

    db.collection('charmers').doc(id).update({
      charms,
    })
      .then(() => {
        return db.collection('charmers').orderBy('charms', 'desc').get()
      })
      .then((docs) => {
        if (!docs.empty) {
          const charmers = [];
          docs.forEach((doc, index) => {
            const data = doc.data();
            data.id = doc.id;

            charmers.push(data);
          });

          commit('updateCharmers', charmers);
        }
      })
      .catch((error) => {
        commit('pushNewError', error);
        console.log(error);
      })
      .then(() => {
        commit('updateLoadingStatus', false);
      });
  },
};

const mutations = {
  /** Fill the current charmers list in state */
  updateCharmers(observer, charmers) {
    state.list = charmers;
  },

  /** Fill one charmer in list in state */
  updateCharmer(observer, charmer) {
    const index = state.list.findIndex(
      oldCharmer => oldCharmer.id === charmer.id,
    );

    charmer.isCharming = state.list[index].isCharming;
    state.list.splice(index, 1, charmer);
  },

  /** Fill a status when a charmer is currently being charming */
  charming(observer, charmer) {
    const index = state.list.findIndex(
      oldCharmer => oldCharmer.id === charmer.id,
    );

    state.list[index].isCharming = true;
  },

  /** Fill a status when a charmer is currently not being charming */
  uncharming(observer, charmer) {
    const index = state.list.findIndex(
      oldCharmer => oldCharmer.id === charmer.id,
    );

    state.list[index].isCharming = false;
  },

  /** Update the current loading status in state */
  updateLoadingStatus(observer, isLoading) {
    state.loading = isLoading;
  },

  /** Fill errors in state with a new one */
  pushNewError(observer, error) {
    state.errors.push(error);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
