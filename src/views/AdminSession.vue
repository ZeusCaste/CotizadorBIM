<template>
    <div class="d-flex flex-direction-row">
      <div class="nabvar-session">
        <NabvarSession :menuComponents="adminMenu" :selectedMenu="selectedMenu" :setNewSelectedMenu="setNewSelectedMenu" />
      </div>
      <div class="container my-5">
        <div class="mb-5 d-flex justify-content-between align-items-center">
          <h1>{{ selectedMenu }}</h1>
          <h5>Bienvenido administrador: {{ user && user.email }}</h5>
        </div>
        <Factores v-if="selectedMenu === 'Factores'" />
        <Quotations v-if="selectedMenu === 'Cotizaciones Realizadas'" />
        <Projects v-if="selectedMenu === 'Proyectos'" />
      </div>
    </div>
</template>

<script>
import firebase from '../plugins/firebase';
import NabvarSession from '../components/layout/NabvarSession.vue';
import Factores from '../components/pages/AdminSession/Factors.vue';
import Quotations from '../components/pages/AdminSession/QuotationsTable.vue';
import Projects from '../components/pages/AdminSession/ProjectsTable.vue';


export default {
  name: "AdminSession",
  components: {
    NabvarSession,
    Factores,
    Quotations, 
    Projects
  },
  created(){
    this.selectedMenu= 'Factores';
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