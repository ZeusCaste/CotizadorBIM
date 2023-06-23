<template>
    <div>
        <div>
            <div class="row">
                <div class="col-5 mx-auto">
                    <b-form-group class="text-dark text-left mt-3" id="name" label="Nombre Completo" label-for="name">
                        <b-row>
                            <b-icon class="ml-3" icon="person-fill" font-scale="2"></b-icon>
                            <b-col>
                                <b-form-input disabled v-model="displayName" id="name" type="text" placeholder="Nombre Completo" />
                            </b-col>
                        </b-row>
                    </b-form-group>
                </div>
                <div class="col-5 mx-auto">
                    <b-form-group class="text-dark text-left mt-3" id="email" label="Email" label-for="email">
                        <b-row>
                            <b-icon class="ml-3" icon="at" font-scale="2"></b-icon>
                            <b-col>
                                <b-form-input disabled v-model="email" id="email" type="email" placeholder="Email" />
                            </b-col>
                            <b-button 
                                v-if="!emailVerified" 
                                variant="dark"
                                @click="sendVerificationEmail()"
                                > 
                                {{ 'Verificar' }}
                                <b-spinner small v-if="spinner && alertRol === 'email'" variant="warning" label="Spinning"></b-spinner>
                            </b-button>
                            <b-icon 
                                v-else  
                                icon="check-circle-fill" 
                                font-scale="2"
                                variant="success"
                            ></b-icon>
                        </b-row>
                        <b-alert
                            v-if="alertRol === 'email'"
                            :show="dismissCountDown"
                            dismissible
                            :variant="successResponse ? 'success' : 'danger'"
                            @dismissed="dismissCountDown=0"
                            @dismiss-count-down="countDownChanged"
                            class="my-2"
                        >
                            <p>{{ successMessage }}</p>
                        </b-alert>
                    </b-form-group>
                </div>
            </div>
            <div class="row">
                <div class="col-5 mx-auto">
                    <b-form-group class="text-dark text-left mt-3" id="phoneNumber" label="Número Telefónico" label-for="phoneNumber">
                        <b-row>
                            <b-icon class="ml-3" icon="phone-fill" font-scale="2"></b-icon>
                            <b-col v-if="!OTPSendFlag">
                                <b-form-input 
                                    v-model="phoneNumber" 
                                    id="phoneNumber" 
                                    type="tel" 
                                    placeholder="Número telefónico" 
                                    :disabled="getPhoneNumberVerificatedStatus"
                                />
                            </b-col>
                            <b-col v-else>
                                <b-form-input v-model="OTPCode" id="otpcode" type="tel" placeholder="Ingresa el código enviado" />
                            </b-col>
                            <b-icon 
                                v-if="getPhoneNumberVerificatedStatus"  
                                icon="check-circle-fill" 
                                font-scale="2"
                                variant="success"
                            ></b-icon>
                            <b-button v-else variant="dark" :disabled="!phoneNumber" @click="phoneNumberActionButton()">
                                {{ OTPSendFlag ? 'Validar Código' : 'Verificar' }}
                                <b-spinner small v-if="spinner && alertRol === 'phoneNumber'" variant="warning" label="Spinning"></b-spinner>
                            </b-button>
                        </b-row>
                        <b-alert
                            v-if="alertRol === 'phoneNumber'"
                            :show="dismissCountDown"
                            dismissible
                            :variant="successResponse ? 'success' : 'danger'"
                            @dismissed="dismissCountDown=0"
                            @dismiss-count-down="countDownChanged"
                            class="my-2"
                            >
                            <p>{{ successMessage }}</p>
                        </b-alert>
                    </b-form-group>
                </div>
                <div class="col-5 mx-auto">

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
        <div class="my-5" v-if="userType === 'partner'">

            <!-- Form Datos Personales -->
            <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" role="tab">
                    <b-button block v-b-toggle.accordion-personal-data variant="info">Datos Personales</b-button>
                </b-card-header>
                <b-collapse id="accordion-personal-data" visible accordion="accordion-personal-data" role="tabpanel">
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
                            <b-form-group class="text-dark text-left mt-3" id="curp" label="CURP" label-for="curp">
                                <b-row>
                                    <b-icon class="ml-3" icon="person-bounding-box" font-scale="2"></b-icon>
                                    <b-col>
                                        <b-form-input 
                                            id="curp-input"
                                            v-model="curp"
                                            type="text" 
                                            placeholder="CURP"
                                            :formatter="formatCurp"
                                        />
                                    </b-col>
                                </b-row>
                            </b-form-group>
                        </div>

                        <div class="col-5 mx-auto">
                            <b-form-group class="text-dark text-left mt-3" label="Calle" label-for="street">
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
                                        <b-form-input v-model="extNumber" id="extNumber" type="text" placeholder="Número Interior" />
                                    </b-col>
                                </b-row>
                            </b-form-group>
                        </div>

                        <div class="col-5 mx-auto">
                            <b-form-group class="text-dark text-left mt-3" id="intNumber" label="Numero Interior" label-for="intNumber">
                                <b-row>
                                    <b-icon class="ml-3" icon="box-arrow-up" font-scale="2"></b-icon>
                                    <b-col>
                                        <b-form-input v-model="intNumber" id="intNumber" type="text" placeholder="Número Interior" />
                                    </b-col>
                                </b-row>
                            </b-form-group>
                        </div>

                        <div class="col-5 mx-auto">
                            <b-form-group class="text-dark text-left mt-3" id="state" label="Estado" label-for="state">
                                <b-row>
                                    <b-icon class="ml-3" icon="geo-fill" font-scale="2"></b-icon>
                                    <b-col>
                                        <b-form-input v-model="state" id="state" type="text" placeholder="Estado" />
                                    </b-col>
                                </b-row>
                            </b-form-group>
                        </div>

                        <div class="col-5 mx-auto">
                            <b-form-group class="text-dark text-left mt-3" id="delegation" label="Delegacion o Municipio" label-for="delegation">
                                <b-row>
                                    <b-icon class="ml-3" icon="geo-fill" font-scale="2"></b-icon>
                                    <b-col>
                                        <b-form-input v-model="delegation" id="delegation" type="text" placeholder="Delegación o Municipio" />
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
                                        <b-form-input v-model="cp" id="cp" type="text" placeholder="Código Postal" />
                                    </b-col>
                                </b-row>
                            </b-form-group>
                        </div>
                    </b-card-body>
                </b-collapse>
            </b-card>

            <!-- Formacion Academica -->
            <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" role="tab">
                    <b-button block v-b-toggle.accordion-academic-education variant="info">Formación Académica</b-button>
                </b-card-header>
                <b-collapse id="accordion-academic-education" visible accordion="accordion-academic-education" role="tabpanel">
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
            OTPCode: '',
            userType: '',
            bornDate: '',
            curp: '',
            street: '',
            extNumber: '',
            intNumber: '',
            state: '',
            delegation: '',
            neighborhood: '',
            city: '',
            cp: '',
            optionsUserType: [
                { value: 'partner', text: 'Colaborador' },
                { value: 'customer', text: 'Cliente' },
            ],
            OTPSendFlag: false,
            spinner: false,
            successMessage: '',
            successResponse: true,
            dismissSecs: 10,
            alertRol: '',
            dismissCountDown: 0,
            changeVisibility: true,
        }
    },
    methods: {
        handlerAddEvent() {
            document.addEventListener('visibilitychange', async () => {
                this.onVisibilityChange();
            });
        },
        async onVisibilityChange(){
            this.changeVisibility = !this.changeVisibility;
                
            if(this.changeVisibility && !this.emailVerified) {
                let getUpdatedUserData = firebase.functions().httpsCallable('getUpdatedUserData');
                const response = await getUpdatedUserData();
                this.emailVerified = response.data.emailVerified;
            }
        },
        getCurrentUser(){
            const { displayName, email, emailVerified, phoneNumber } = firebase.auth().currentUser;
            this.displayName = displayName;
            this.email = email;
            this.emailVerified = emailVerified;
            this.phoneNumber = phoneNumber;
            console.log(firebase.auth().currentUser);
        },
        async sendOTPBySMSChannel(){
            this.spinner = true;
            this.alertRol = 'phoneNumber'
            
            try {
                const sendOTPBySMSChannelFunction = firebase.functions().httpsCallable('sendOTPBySMSChannel');
                const response = await sendOTPBySMSChannelFunction({ 'phoneNumber': '+52' + this.phoneNumber });
                this.successMessage = response.data.msg;
                this.OTPSendFlag = true;
                this.dismissCountDown = this.dismissSecs;
                this.OTPCode = '';
                console.log(response);
                
            } catch (error) {
                this.successResponse = false;
                this.successMessage = 'Código incorrecto. Intenta de nuevo';
                this.dismissCountDown = this.dismissSecs;
            }

            this.spinner = false;
        },
        async verifyOTPBySMSChannel(){
            this.spinner = true;
            this.alertRol = 'phoneNumber';
            
            try {
                const verifyOTPBySMSChannelFunction = firebase.functions().httpsCallable('verifyOTPBySMSChannel');
                const response = await verifyOTPBySMSChannelFunction({ 'otpCode': this.OTPCode, 'phoneNumber': '+52' + this.phoneNumber });
                
                if(response.data.success){
                    this.successResponse = true;
                    this.successMessage = response.data.msg;
                    this.OTPSendFlag = false;
                    this.dismissCountDown = this.dismissSecs;
                    this.phoneNumber = response.data.phoneNumber;
                }

            } catch (error) {
                this.successResponse = false;
                this.successMessage = 'Código incorrecto. Intenta de nuevo';
                this.dismissCountDown = this.dismissSecs;
            }

            this.spinner = false;
        },
        phoneNumberActionButton(){
            if(this.OTPSendFlag){
                this.verifyOTPBySMSChannel();
            }
            else {
                this.sendOTPBySMSChannel();
            }
        },
        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown;
            this.alertRol = dismissCountDown > 0 ? this.alertRol : '';
        },
        async sendVerificationEmail() {
            this.spinner = true;
            this.alertRol = 'email';

            if(this.emailVerified) return

            try {
                const sendVerificationEmailFunction = firebase.functions().httpsCallable('sendVerificationEmail');
                const response = await sendVerificationEmailFunction();
                if(response.data.success) {
                    this.successResponse = true;
                    this.successMessage = response.data.message;
                    this.dismissCountDown = this.dismissSecs;
                    this.handlerAddEvent();
                }
            } catch (error) {
                this.successResponse = false;
                this.successMessage = 'Ocurrio un error. Intenta mas tarde';
                this.dismissCountDown = this.dismissSecs;
            }

            this.spinner = false;
        },
        formatCurp(evt) { return String(evt).substring(0, 18).toUpperCase() }
    },
    computed: {
        getPhoneNumberVerificatedStatus() {
            let aux = this.phoneNumber + '';
            return (aux.startsWith('+') && aux.length === 13) 
        },
        getCurpInput() { return document.getElementById('curp-input') }
    }
}
</script>

<style>

</style>