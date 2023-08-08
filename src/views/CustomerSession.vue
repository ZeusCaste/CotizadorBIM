<template>
    <div>
        <div v-if="!user" class="text-center">
            <b-skeleton-icon
                icon="person-fill"
                :icon-props="{ fontScale: 35, variant: 'dark' }"
            ></b-skeleton-icon>
        </div>
        <div class="row mx-3">
            <div class="col-xl-1 col-lg-1 col-md-11 col-11 col-sm-11 mx-auto my-2 my-xl-5 my-lg-4 my-md-3 my-sm-2">
                <NabvarSession :menuComponents="customerMenu"></NabvarSession>
            </div>
            <div class="container col-xl-9 col-lg-8 col-md-11 col-11 col-sm-11 mx-auto my-2 my-xl-5 my-lg-4 my-md-3 my-sm-2 px-4">
                <div class="d-flex justify-content-xl-around flex-md-column-reverse flex-sm-column-reverse flex-column-reverse flex-lg-row flex-xl-row">
                    <h1 class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">{{ selectedMenu }}</h1>
                    <h5 class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">Bienvenido <strong>{{ user && user.displayName }}</strong></h5>
                </div>
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
import NabvarSession from '../components/layout/NabvarSession.vue';
import firebase from './../plugins/firebase.js';

export default {
    name: 'CustomerSession',
    components: {
        NabvarSession
    },
    created(){
        this.selectedMenu= 'Un Menu seleccionado';
        this.getdataUser();
    },
    data() {
        return {
            user: null,
            customerMenu: [
                'Mi Perfil',
                'Mis Cotizaciones',
                'Proyectos',
                'Acciones',
                'Cerrar Sesión'
            ]
        }
    },
    methods: {
        async getdataUser() {
            const getUpdatedUserDataFunction = firebase.functions().httpsCallable('getUpdatedUserData');
            const { data } = await getUpdatedUserDataFunction();
            if(data.customClaims && data.customClaims.definedUser) {
                if(data.customClaims.userType !== 'customer') this.$router.replace({ name: 'UserFilters'});
            }
            this.user = data;
        }
    }
}
</script>

<style>

</style>