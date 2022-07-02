<template>
  <div>
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
    firebase.auth().onAuthStateChanged((user)=> {
      if(user){
        user.getIdTokenResult()
          .then((getIdTokenResult) => {
            if(getIdTokenResult.claims.admin){
              this.$router.push({ name: 'AdminSession' });
              return
            }
            if(!getIdTokenResult.claims.definedUser){
              this.$router.push({ name: 'UserFilters' });
              this.setLoggedInUserData(user);
              return
            }
          })
      }
    });
    // Events
    this.eventHub.$on('change-form', this.changeForm);
  }
}
</script>

<style>

</style>