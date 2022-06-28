<template>
  <div>
    <LogIn v-if="login" />
    <Register v-else />
  </div>
</template>

<script>
import LogIn from '../components/pages/AccountAccess/LogIn.vue';
import Register from '../components/pages/AccountAccess/Register.vue';


export default {
  components: {
    LogIn,
    Register,
  },
  data(){
    return {
      login: true,
    }
  },
  methods: {
    changeForm(state){
      this.login= state;
    }
  },
  created(){
    this.eventHub.$on('change-form', this.changeForm);
  }
}
</script>

<style>

</style>