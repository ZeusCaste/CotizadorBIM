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
        <Partners v-if="selectedMenu === 'Colaboradores'" />
        <Customers v-if="selectedMenu === 'Clientes'" />
        <AdminConverter v-if="selectedMenu === 'Convertir Administrador'" />
      </div>
    </div>
</template>

<script>
import firebase from '../plugins/firebase';
import NabvarSession from '../components/layout/NabvarSession.vue';
import Factores from '../components/pages/AdminSession/Factors.vue';
import Quotations from '../components/pages/AdminSession/QuotationsTable.vue';
import Projects from '../components/pages/AdminSession/ProjectsTable.vue';
import Partners from '../components/pages/AdminSession/ParternsTable.vue';
import Customers from '../components/pages/AdminSession/CustomersTable.vue';
import AdminConverter from '../components/pages/AdminSession/AdminConverter.vue';


export default {
  name: "AdminSession",
  components: {
    NabvarSession,
    Factores,
    Quotations, 
    Projects,
    Partners,
    Customers,
    AdminConverter
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
      adminMenu: ["Factores", "Cotizaciones Realizadas", "Proyectos", "Colaboradores", "Clientes", "---> Perfil", "Convertir Administrador", "Cerrar Sesión"],
      selectedMenu: '',
    }
  },
  methods: {
    setNewSelectedMenu(newSelectedMenu){
      this.selectedMenu= newSelectedMenu;
    }
  },
  watch: {
    selectedMenu(newMenu, oldMenu){
      if(newMenu === 'Cerrar Sesión'){
        firebase.auth().signOut().then(()=> {
          console.log("User Signed Out");
        });
      }
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