<template>
  <div>
    <IniciarSession v-if="login" />
    <Register v-else />
  </div>
</template>

<script>
import IniciarSession from '../components/pages/AccountAccess/IniciarSession.vue';
import Register from '../components/pages/AccountAccess/Register.vue';


export default {
  components: {
    IniciarSession,
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