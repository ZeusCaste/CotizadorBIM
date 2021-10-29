<template>
  <div>
    <vue-particles
      class="background"
      color="#FCC301"
      linesColor="#000"
    ></vue-particles>
    <div class="centered-content">
      <Navbar />
      <div>
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
import Navbar from './components/layout/Nabvar.vue';

  export default {
    components: {
      Navbar,
    }
  }
</script>


<style lang="scss" scoped>
  #particles-js {
    width: 100%;
    height: 100%;
    position: fixed;
    background-color: #fff;
    background-image: url('');
    background-size: cover;
    background-position: 50% 50%;
    background-repeat: no-repeat;
  }

  .centered-content{
    position: absolute;
    // text-align: center;
    top: 0%;
    width: 100%;
  }

</style>
