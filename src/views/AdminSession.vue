<template>
    <div class="d-flex flex-direction-row">
      <div class="nabvar-session">
        <NabvarSession :menuComponents="adminMenu" :selectedMenu="selectedMenu" :setNewSelectedMenu="setNewSelectedMenu" />
      </div>
      <div class="container my-5">
        <div class="mb-5">
          <h1>Bienvenido administrador: {{ user && user.email }}</h1>
        </div>
        <Factores v-if="selectedMenu === 'Factores'" />
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
      user: '',
      adminMenu: ["Factores", "Cotizaciones Realizadas", "Proyectos", "Colaboradores", "Clientes", "---> Perfil", "---> Cerrar Sesión"],
      selectedMenu: '',
    }
  },
  methods: {
    setNewSelectedMenu(newSelectedMenu){
      this.selectedMenu= newSelectedMenu;
    }
  }
}
</script>
<style lang="scss" scoped>
  .nabvar-session {
    margin-top: 40px;
    margin-left: 50px;
    width: 14%;
  }
</style>