<template>
    <div class="row mx-3">
      <div class="col-xl-1 col-lg-1 col-md-11 col-11 col-sm-11 mx-auto my-2 my-xl-5 my-lg-4 my-md-3 my-sm-2">
        <NabvarSession :menuComponents="adminMenu" :selectedMenu="selectedMenu" :setNewSelectedMenu="setNewSelectedMenu" />
      </div>
      <div class="container col-xl-9 col-lg-8 col-md-11 col-11 col-sm-11 mx-auto my-2 my-xl-5 my-lg-4 my-md-3 my-sm-2 px-4">
        <div class="d-flex justify-content-xl-around flex-md-column-reverse flex-sm-column-reverse flex-column-reverse flex-lg-row flex-xl-row">
          <h1 class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">{{ selectedMenu }}</h1>
          <h5 class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">Bienvenido administrador: {{ user && user.email }}</h5>
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

</style>