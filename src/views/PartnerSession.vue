<template>
    <div>
        <div v-if="!user" class="text-center">
            <b-skeleton-icon
                icon="person-fill"
                :icon-props="{ fontScale: 35, variant: 'dark' }"
            ></b-skeleton-icon>
        </div>
        <div v-else class="row mx-3">
            <div class="col-xl-1 col-lg-1 col-md-11 col-11 col-sm-11 mx-auto my-2 my-xl-5 my-lg-4 my-md-3 my-sm-2">
                <NabvarSession :menuComponents="customerMenu" :selectedMenu="selectedMenu" :setNewSelectedMenu="setNewSelectedMenu"></NabvarSession>
            </div>
            <div class="container col-xl-9 col-lg-8 col-md-11 col-11 col-sm-11 mx-auto my-2 my-xl-5 my-lg-4 my-md-3 my-sm-2 px-4">
                <div class="d-flex justify-content-xl-around flex-md-column-reverse flex-sm-column-reverse flex-column-reverse flex-lg-row flex-xl-row">
                    <h1 class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">{{ selectedMenu }}</h1>
                    <h5 class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">Bienvenido <strong>{{ user && user.displayName }}</strong></h5>
                </div>
                <MyPerfilPartner v-if="selectedMenu === 'Mi Perfil'" />
                <!-- <Factores v-if="selectedMenu === 'Factores'" />
                <Quotations v-if="selectedMenu === 'Cotizaciones Realizadas'" />
                <Projects v-if="selectedMenu === 'Proyectos'" />
                <Partners v-if="selectedMenu === 'Colaboradores'" />
                <Customers v-if="selectedMenu === 'Clientes'" />
                <AdminConverter v-if="selectedMenu === 'Convertir Administrador'" /> -->
            </div>
        </div>
    </div>
</template>

<script>
import firebase from './../plugins/firebase.js';
import NabvarSession from '../components/layout/NabvarSession.vue';
import MyPerfilPartner from '../components/pages/PartnerSession/MyPerfilPartner.vue';

export default {
    name: 'PartnerSession',
    components: {
        NabvarSession,
        MyPerfilPartner
    },
    created(){
        this.selectedMenu= 'Mi Perfil';
        this.getUserData();
    },
    data() {
        return {
            user: null,
            selectedMenu: '',
            customerMenu: [
                'Mi Perfil',
                'Proyectos',
                'Acciones',
                'Cerrar Sesión'
            ]
        }
    },
    methods: {
        async getUserData() {
            const getUpdatedUserDataFunction = firebase.functions().httpsCallable('getUpdatedUserData');
            const { data } = await getUpdatedUserDataFunction();
            if(data.customClaims && data.customClaims.definedUser) {
                if(data.customClaims.userType !== 'partner') this.$router.replace({ name: 'UserFilters'});
            }
            this.user = data;
        },
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

<style>

</style>