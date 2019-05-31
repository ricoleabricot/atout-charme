<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="card"
             v-for="(charmer, index) in charmers" :key="charmer.id"
             :class="getLeaderboard(index)"
        >
          <div class="card-body">
            <CharmerDetails :charmer="charmer" :index="index"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import CharmerDetails from './CharmerDetails.vue';

export default {
  name: 'charmer-list',
  components: {
    CharmerDetails,
  },

  computed: {
    ...mapState({
      charmers: state => state.charmers.list,
    }),
  },

  methods: {
    getLeaderboard(index) {
      switch (true) {
        case index === 0:
          return 'is-first col-sm-8 offset-sm-2';
        case index === 1:
          return 'is-second col-sm-6';
        case index === 2:
          return 'is-third col-sm-4 offset-sm-1';
        default:
          return '';
      }
    },
  },
};
</script>

<style lang="scss">
  .card {
    border-radius: 4px;
    margin-bottom: 30px;
    padding: 0 !important;
    border-color: #eab8bb !important;
    transition: 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);

    &.is-first {
      background-color: #d9a7a8;
      font-size: 1.2em;
    }

    &.is-second {
      background-color: #eac3b8;
      font-size: 1em;
    }

    &.is-third {
      background-color: #e0aec8;
      font-size: .8em;
    }

    .card-body {
      padding: 0;
    }
  }

  @media all and (min-width: 480px) {
    .card:hover {
      transform: scale(1.1, 1.1);
    }
  }
</style>
