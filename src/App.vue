<template>
  <div class="app">
    <h1>The Beginning</h1>
    <div class="nav">
      <router-link to="/">Home</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss" scoped>
  .app {
    background-color: aqua;
    padding-top: 10px;
    padding-bottom: 10px;
    padding: auto;
    text-align: center;

    .nav {
      background-color: aquamarine;
      justify-content: center;
    }
  }

</style>
