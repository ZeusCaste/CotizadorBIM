<template>
    <div class="d-flex flex-direction-row">
      <div class="nabvar-session">
        <NabvarSession :menuComponents="adminMenu" />
      </div>
      <div class="container my-5">
        <Factores />
      </div>
    </div>
    
</template>

<script>
import firebase from '../plugins/firebase';
import NabvarSession from '../components/layout/NabvarSession.vue';
import Factores from '../components/pages/AdminSession/Factors.vue';


export default {
  name: "AdminSession",
  components: {
    NabvarSession,
    Factores,
  },
  created(){
    firebase.auth().onAuthStateChanged(user => {
      if(user) this.user = user;
      else this.user = {};
    });
  },
  data() {
    return {
      adminMenu: ["Factores", "Cotizaciones Realizadas", "Proyectos", "Colaboradores", "Clientes", "---> Perfil", "---> Cerrar Sesión"],
    }
  },  
}
</script>
<style lang="scss" scoped>
  .nabvar-session {
    margin-top: 40px;
    margin-left: 50px;
    width: 14%;
  }
</style>