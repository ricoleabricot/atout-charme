<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
  body {
    background-color: #eab8bb !important;
  }

  #app {
    font-family: 'Quicksand', 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #fff;
    padding-top: 20px;
  }

  #nav {
    padding: 30px;
    a {
      font-weight: bold;
      color: #2c3e50;
      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }

  @media all and (max-width: 480px) {
    .container {
      padding: 50px !important;
    }
  }
</style>
