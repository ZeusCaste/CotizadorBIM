<template>
  <div class="d-flex justify-content-center">
    <LogIn v-if="login" />
    <Register v-else />
  </div>
</template>

<script>
import firebase from '../plugins/firebase';
import LogIn from '../components/pages/AccountAccess/LogIn.vue';
import Register from '../components/pages/AccountAccess/Register.vue';


export default {
  components: {
    LogIn,
    Register,
  },
  created(){
    firebase.auth().onAuthStateChanged((user)=> {
      if(user){
        user.getIdTokenResult().then(async(getIdTokenResult) => {
          console.log(getIdTokenResult.claims);
          if(getIdTokenResult.claims.admin){
            this.$router({ name: 'AdminSession' });
            return
          }
          if(!getIdTokenResult.claims.definedUser){
            this.$router.replace({ name: 'UserFilters' });
            return
          }
          if(getIdTokenResult.claims.definedUser){
            this.$router.push({ name: `${getIdTokenResult.claims.userType}Session` });
            return
          }
        });
      }
    });
    // Events
    this.eventHub.$on('change-form', this.changeForm);
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
}
</script>

<style>

</style>