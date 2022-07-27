<template>
    <div>
        <div>
            <div class="row">
                <div class="col-5">
                    <b-form-group class="text-dark text-left mt-3" id="name" label="Nombre Completo" label-for="name">
                        <b-row>
                            <b-icon class="ml-3" icon="person-fill" font-scale="2"></b-icon>
                            <b-col>
                                <b-form-input v-model="displayName" id="name" type="text" placeholder="Nombre Completo" />
                            </b-col>
                        </b-row>
                    </b-form-group>
                </div>
                <div class="col-5">
                    <b-form-group class="text-dark text-left mt-3" id="email" label="Email" label-for="email">
                        <b-row>
                            <b-icon class="ml-3" icon="at" font-scale="2"></b-icon>
                            <b-col>
                                <b-form-input v-model="email" id="email" type="email" placeholder="Email" />
                            </b-col>
                        </b-row>
                    </b-form-group>
                </div>
            </div>
            <div class="row">
                <div class="col-5">
                    <b-form-group class="text-dark text-left mt-3" id="userType" label="Tipo de usuario" label-for="userType">
                        <b-row>
                            <b-icon class="ml-3" icon="person-bounding-box" font-scale="2"></b-icon>
                            <b-col>
                                <b-form-select v-model="userType" :options="optionsUserType"></b-form-select>
                            </b-col>
                        </b-row>
                    </b-form-group>
                </div>
                <div class="col-5">
                    <b-alert v-if="userType === 'partner'" show variant="primary">
                        <strong>Colaborador: </strong>
                        Al elegir esta opción te registrarás como proveedor de servicios, para poder implementar proyectos o tareas específicas
                    </b-alert>
                    <b-alert v-if="userType === 'customer'" show variant="primary">
                        <strong>Cliente: </strong>
                        Al elegir esta opción te registrarás como creador de proyectos, los cuales podrás administrar y gestionar.
                    </b-alert>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import firebase from '../../../plugins/firebase';


export default {
    name: 'UserTypeForm',
    created() {
        this.getCurrentUser();
    },
    data() {
        return {
            displayName: '',
            email: '',
            emailVerified: false,
            phoneNumber: '',
            userType: '',
            optionsUserType: [
                { value: 'partner', text: 'Colaborador' },
                { value: 'customer', text: 'Cliente' },
            ]
        }
    },
    methods: {
        getCurrentUser(){
            const { displayName, email, emailVerified, phoneNumber } = firebase.auth().currentUser;
            this.displayName = displayName;
            this.email = email;
            this.emailVerified = emailVerified;
            this.phoneNumber = phoneNumber;
        }
    }
}
</script>

<style>

</style>