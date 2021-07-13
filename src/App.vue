<template>
  <div>
    <Navbar />
    <div>
      <router-view />
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

</style>
