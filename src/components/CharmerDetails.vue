<template>
  <div>
    <div class="card-img" v-if="index === 0">
      <img alt="First place logo" src="../assets/charme.jpeg" class="float-md-left">
      <h5 class="card-title">👑 1e place avec: <u>{{ charmer.charms }} points</u> 👑</h5>
    </div>

    <div v-if="index === 1">
      <h5 class="card-title">🏆 2e place avec: <u>{{ charmer.charms }} points</u> 🏆</h5>
    </div>

    <div v-if="index === 2">
      <h5 class="card-title">💩 3e place avec: <u>{{ charmer.charms }} points</u> 💩</h5>
    </div>

    <div class="card-text">
      <div class="float-right">
        <img v-if="charmer.surname === 'Rico'" src="../assets/rico.jpg" class="img-thumbnail" width="80"/>
        <img v-if="charmer.surname === 'Paulo'" src="../assets/paulo.jpg" class="img-thumbnail" width="80"/>
        <img v-if="charmer.surname === 'Kro'" src="../assets/kro.jpg" class="img-thumbnail" width="80"/>
      </div>

      <p class="text-left">
        <strong>️ 🎉  ⇢ </strong> {{ charmer.surname }}<br>
        <strong> 🔊  ⇢ </strong> {{ charmer.preferredSong }}<br>
        <strong> 🍽  ⇢ </strong> {{ charmer.preferredFood }}
      </p>

      <div v-on:click="isCharming(charmer)">
        <button class="btn btn-warning">
          <span>
            Ajouter un charme
          </span>

          <div class="heart" v-bind:class="{ 'is-animate': charming }"></div>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';

export default {
  name: 'charmer-details',
  data() {
    return {
      charming: false,
    };
  },

  props: {
    charmer: Object,
    index: Number,
  },

  methods: {
    ...mapActions({
      updateCharmer: 'charmers/updateCharmer',
    }),

    ...mapMutations({
//      charming: 'charmers/charming',
      uncharming: 'charmers/uncharming',
    }),

    isCharming(charmer) {
      if (!charmer.isCharming) {
        this.charming = true;
        this.updateCharmer({ id: charmer.id, charms: charmer.charms + 1 });

        const that = this;
        setTimeout(() => {
          that.charming = false;
        }, 600);
      }
    },
  },
};
</script>

<style lang="scss">
  img {
    margin-right: 40px;
  }

  .card-title {
    padding: 20px 0;
    background-color: rgba(0, 0, 0, 0.1);
  }

  .card-text {
    padding: 10px 20px;

    strong {
      font-size: 1.5em;
    }
  }

  button {
    span {
      position: relative;
      bottom: 5px;
    }

    .heart {
      display: inline-block;
      cursor: pointer;
      height: 25px;
      width: 50px;
      position: relative;
      bottom: -5px;
      background-image:url( 'https://abs.twimg.com/a/1446542199/img/t1/web_heart_animation.png');
      background-position: left;
      background-repeat:no-repeat;
      background-size:2900%;

      &:hover {
        background-position:right;
      }

      &.is-animate {
        animation: heart-burst .7s steps(28) 1;
      }
    }

    @keyframes heart-burst {
      from {background-position:left;}
      to { background-position:right;}
    }
  }
</style>
