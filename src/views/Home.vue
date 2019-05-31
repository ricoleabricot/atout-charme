<template>
  <div>
    <h1>
      Atout Charme ♥<br>
      <small>Qui a le + charmeur d'entre tous ?</small>
    </h1>

    <CharmerList/>
  </div>
</template>

<script>
import store from '../store/index';

import CharmerList from '../components/CharmerList.vue';

export default {
  name: 'home',
  components: {
    CharmerList,
  },

  beforeRouteEnter(to, from, next) {
    return store.dispatch('charmers/fetchCharmers').then(next, next);
  },

  beforeRouteUpdate(to, from, next) {
    return store.dispatch('charmers/fetchCharmers').then(next, next);
  },
};
</script>

<style>
  h1 {
    padding-bottom: 20px;
  }
</style>
