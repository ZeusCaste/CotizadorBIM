<template>
    <div>
        <div>
            <div class="row">
                <div class="col-5 mx-auto">
                    <b-form-group class="text-dark text-left mt-3" id="name" label="Nombre Completo" label-for="name">
                        <b-row>
                            <b-icon class="ml-3" icon="person-fill" font-scale="2"></b-icon>
                            <b-col>
                                <b-form-input v-model="displayName" id="name" type="text" placeholder="Nombre Completo" />
                            </b-col>
                        </b-row>
                    </b-form-group>
                </div>
                <div class="col-5 mx-auto">
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
                <div class="col-5 mx-auto">
                    <b-form-group class="text-dark text-left mt-3" id="userType" label="Tipo de usuario" label-for="userType">
                        <b-row>
                            <b-icon class="ml-3" icon="person-bounding-box" font-scale="2"></b-icon>
                            <b-col>
                                <b-form-select v-model="userType" :options="optionsUserType"></b-form-select>
                            </b-col>
                        </b-row>
                    </b-form-group>
                </div>
                <div class="col-5 mx-auto">
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
        <div class="my-5">

            <!-- Form Datos Personales -->
            <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" role="tab">
                    <b-button block v-b-toggle.accordion-1 variant="info">Datos Personales</b-button>
                </b-card-header>
                <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
                    <b-card-body class="row">
                        <div class="col-5 mx-auto">
                            <b-form-group class="text-dark text-left mt-3" id="bornDate" label="Fecha de Nacimiento" label-for="bornDate">
                                <b-row>
                                    <b-icon class="ml-3" icon="calendar" font-scale="2"></b-icon>
                                    <b-col>
                                        <b-form-input v-model="bornDate" id="bornDate" type="date" placeholder="Fecha de Nacimiento" />
                                    </b-col>
                                </b-row>
                            </b-form-group>
                        </div>

                        <div class="col-5 mx-auto">
                            <b-form-group class="text-dark text-left mt-3" id="street" label="Calle" label-for="street">
                                <b-row>
                                    <b-icon class="ml-3" icon="house" font-scale="2"></b-icon>
                                    <b-col>
                                        <b-form-input v-model="street" id="street" type="text" placeholder="Calle" />
                                    </b-col>
                                </b-row>
                            </b-form-group>
                        </div>

                        <div class="col-5 mx-auto">
                            <b-form-group class="text-dark text-left mt-3" id="extNumber" label="Numero Exterior" label-for="extNumber">
                                <b-row>
                                    <b-icon class="ml-3" icon="box-arrow-up" font-scale="2"></b-icon>
                                    <b-col>
                                        <b-form-input v-model="extNumber" id="extNumber" type="text" placeholder="Numero Interior" />
                                    </b-col>
                                </b-row>
                            </b-form-group>
                        </div>

                        <div class="col-5 mx-auto">
                            <b-form-group class="text-dark text-left mt-3" id="intNumber" label="Numero Interior" label-for="intNumber">
                                <b-row>
                                    <b-icon class="ml-3" icon="box-arrow-up" font-scale="2"></b-icon>
                                    <b-col>
                                        <b-form-input v-model="intNumber" id="intNumber" type="text" placeholder="Numero Interior" />
                                    </b-col>
                                </b-row>
                            </b-form-group>
                        </div>
                        
                        <div class="col-5 mx-auto">
                            <b-form-group class="text-dark text-left mt-3" id="neighborhood" label="Colonia" label-for="neighborhood">
                                <b-row>
                                    <b-icon class="ml-3" icon="geo-fill" font-scale="2"></b-icon>
                                    <b-col>
                                        <b-form-input v-model="neighborhood" id="neighborhood" type="text" placeholder="Colonia" />
                                    </b-col>
                                </b-row>
                            </b-form-group>
                        </div>

                        <div class="col-5 mx-auto">
                            <b-form-group class="text-dark text-left mt-3" id="delegation" label="Delegacion o Municipio" label-for="delegation">
                                <b-row>
                                    <b-icon class="ml-3" icon="geo-fill" font-scale="2"></b-icon>
                                    <b-col>
                                        <b-form-input v-model="delegation" id="delegation" type="text" placeholder="Delegacion o Municipio" />
                                    </b-col>
                                </b-row>
                            </b-form-group>
                        </div>

                        <div class="col-5 mx-auto">
                            <b-form-group class="text-dark text-left mt-3" id="city" label="Ciudad" label-for="city">
                                <b-row>
                                    <b-icon class="ml-3" icon="geo-fill" font-scale="2"></b-icon>
                                    <b-col>
                                        <b-form-input v-model="city" id="city" type="text" placeholder="Ciudad" />
                                    </b-col>
                                </b-row>
                            </b-form-group>
                        </div>

                        <div class="col-5 mx-auto">
                            <b-form-group class="text-dark text-left mt-3" id="cp" label="Codigo Postal" label-for="cp">
                                <b-row>
                                    <b-icon class="ml-3" icon="geo-fill" font-scale="2"></b-icon>
                                    <b-col>
                                        <b-form-input v-model="cp" id="cp" type="text" placeholder="Codigo Postal" />
                                    </b-col>
                                </b-row>
                            </b-form-group>
                        </div>
                    </b-card-body>
                </b-collapse>
            </b-card>
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
            bornDate: '',
            street: '',
            extNumber: '',
            intNumber: '',
            neighborhood: '',
            delegation: '',
            city: '',
            cp: '',
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