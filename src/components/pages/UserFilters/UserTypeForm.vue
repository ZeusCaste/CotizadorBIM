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
                                    <b-icon class="ml-3" icon="person-lines-fill" font-scale="2"></b-icon>
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
                                    <b-icon class="ml-3" icon="geo-alt-fill" font-scale="2"></b-icon>
                                    <b-col>
                                        <b-form-input v-model="extNumber" id="extNumber" type="text" placeholder="Número Interior" />
                                    </b-col>
                                </b-row>
                            </b-form-group>
                        </div>

                        <div class="col-5 mx-auto">
                            <b-form-group class="text-dark text-left mt-3" id="intNumber" label="Numero Interior" label-for="intNumber">
                                <b-row>
                                    <b-icon class="ml-3" icon="geo-alt-fill" font-scale="2"></b-icon>
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
                                        <b-form-select 
                                            v-model="state" 
                                            :options="stateOptions" 
                                            id="state"
                                            @change="toActivateDelegations"
                                        ></b-form-select>
                                    </b-col>
                                </b-row>
                            </b-form-group>
                        </div>

                        <div class="col-5 mx-auto">
                            <b-form-group class="text-dark text-left mt-3" id="delegation" label="Delegacion o Municipio" label-for="delegation">
                                <b-row>
                                    <b-icon class="ml-3" icon="geo-fill" font-scale="2"></b-icon>
                                    <b-col>
                                        <b-form-select v-model="delegation" :options="delegationOptions" id="delegation" ></b-form-select>
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
                                        <b-form-input 
                                            id="cp" 
                                            v-model="cp" 
                                            type="tel" 
                                            placeholder="Código Postal"
                                            :formatter="formatCP"
                                        />
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

                    <b-card-body class="row element-container" v-for="(ab, idx) in academicBackground" :key="idx">
                        <div class="col-5 mx-auto">
                            <b-form-group class="text-dark text-left mt-3" id="academicLevel" label="Nivel Acádemico" label-for="academicLevel">
                                <b-row>
                                    <b-icon class="ml-3" icon="journal-bookmark-fill" font-scale="2"></b-icon>
                                    <b-col>
                                        <b-form-select v-model="ab.academicLevel" :options="academicLevesOptions" id="academicLevel" ></b-form-select>
                                    </b-col>
                                </b-row>
                            </b-form-group>
                        </div>

                        <div class="col-5 mx-auto">
                            <b-form-group class="text-dark text-left mt-3" id="specialty" label="Especialidad" label-for="specialty">
                                <b-row>
                                    <b-icon class="ml-3" icon="patch-check-fill" font-scale="2"></b-icon>
                                    <b-col>
                                        <b-form-input v-model="ab.specialty" id="specialty" type="text" placeholder="Especialidad" />
                                    </b-col>
                                </b-row>
                            </b-form-group>
                        </div>

                        <div class="col-5 mx-auto">
                            <b-form-group class="text-dark text-left mt-3" id="institution" label="Escuela o Institución" label-for="institution">
                                <b-row>
                                    <b-icon class="ml-3" icon="credit-card2-front-fill" font-scale="2"></b-icon>
                                    <b-col>
                                        <b-form-input v-model="ab.institution" id="institution" type="text" placeholder="Escuela o Institución" />
                                    </b-col>
                                </b-row>
                            </b-form-group>
                        </div>

                        <div class="col-5 mx-auto">
                            <b-form-group class="text-dark text-left mt-3" id="startPeriod" label="Inicio" label-for="startPeriod">
                                <b-row>
                                    <b-icon class="ml-3" icon="calendar" font-scale="2"></b-icon>
                                    <b-col>
                                        <b-form-input v-model="ab.startPeriod" id="startPeriod" type="date" placeholder="Inicio" />
                                    </b-col>
                                </b-row>
                            </b-form-group>
                        </div>

                        <div class="col-5 mx-5">
                            <b-form-group class="text-dark text-left mt-3" id="endPeriod" label="Finalización" label-for="endPeriod">
                                <b-row>
                                    <b-icon class="ml-3" icon="calendar" font-scale="2"></b-icon>
                                    <b-col class="col-7">
                                        <b-form-input 
                                            id="endPeriod"
                                            v-model="ab.endPeriod"
                                            type="date"
                                            placeholder="Finalización"
                                            @change="updateActualAcademicValue('input', idx)"
                                        />
                                    </b-col>
                                    <b-col class="col-3 my-auto">
                                        <b-form-radio 
                                            v-model="ab.actualLevel" 
                                            value="true"
                                            @change="updateActualAcademicValue('radio', idx)"
                                        >Actual</b-form-radio>
                                    </b-col>
                                </b-row>
                            </b-form-group>
                        </div>

                        <div class="col-5 ml-4">
                            <b-form-group class="text-dark text-left mt-3" id="certificate" label="Constancia/Diploma/Titulo" label-for="certificate">
                                <b-row>
                                    <b-icon class="ml-3" icon="file-earmark-medical-fill" font-scale="2"></b-icon>
                                    <b-col>
                                        <b-form-file
                                            v-model="ab.certificate"
                                            :state="Boolean(ab.certificate)"
                                            placeholder="Selecciona un archivo o arrastralo aqui"
                                            drop-placeholder="Arrastra tu archivo aqui"
                                        ></b-form-file>
                                    </b-col>
                                </b-row>
                            </b-form-group>
                        </div>
                    </b-card-body>

                    <div class="ml-5 my-4">
                        <b-button variant="outline-info" @click="addAcademicBackground()">
                            <b-icon icon="plus-circle-fill"></b-icon>
                            Agregar Estudios
                        </b-button>
                    </div>
                </b-collapse>
            </b-card>

            <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" role="tab">
                    <b-button block v-b-toggle.accordion-academic-education variant="info">Experiencia Laboral</b-button>
                </b-card-header>
                <b-collapse id="accordion-academic-education" visible accordion="accordion-academic-education" role="tabpanel">
                    <b-card-body class="row separator">
                        <div class="col-5 mx-auto">
                            <b-form-group class="text-dark text-left mt-3" id="Curriculum Vitae" label="Selecciona tu CV" label-for="Curriculum Vitae">
                                <b-row>
                                    <b-icon class="ml-3" icon="calendar" font-scale="2"></b-icon>
                                    <b-col>
                                        <b-form-file
                                            v-model="curriculumVitae"
                                            placeholder="Selecciona tu CV"
                                            drop-placeholder="Arrastra tu archivo aqui"
                                        ></b-form-file>
                                    </b-col>
                                </b-row>
                            </b-form-group>
                        </div>

                        <div class="col-5 mx-auto">
                            <b-form-group class="text-dark text-left mt-3" id="requestActivity" label="Actividad solicitada" label-for="requestedActivity">
                                <b-row>
                                    <b-icon class="ml-3" icon="person-bounding-box" font-scale="2"></b-icon>
                                    <b-col>
                                        <b-form-select v-model="requestedActivity" :options="activityOptions"></b-form-select>
                                    </b-col>
                                </b-row>
                            </b-form-group>
                        </div>
                    </b-card-body>
                    <b-card-body class="row element-container" v-for="(we, idx) in workExperience" :key="idx">
                        <div class="col-5 mx-auto">
                            <b-form-group class="text-dark text-left mt-3" id="companyName" label="Nombre de la empresa" label-for="CompanyName">
                                <b-row>
                                    <b-icon class="ml-3" icon="wallet-fill" font-scale="2"></b-icon>
                                    <b-col>
                                        <b-form-input v-model="we.companyName" id="companyName" type="text" placeholder="Nombre de la empresa" />
                                    </b-col>
                                </b-row>
                            </b-form-group>
                        </div>

                        <div class="col-5 mx-auto">
                            <b-form-group class="text-dark text-left mt-3" id="developedFunction" label="Función Desarrollada" label-for="developedFunction">
                                <b-row>
                                    <b-icon class="ml-3" icon="hdd-network-fill" font-scale="2"></b-icon>
                                    <b-col>
                                        <b-form-input v-model="we.developedFunction" id="developedFunction" type="text" placeholder="Función Desarrollada" />
                                    </b-col>
                                </b-row>
                            </b-form-group>
                        </div>

                        <div class="col-5 mx-auto">
                            <b-form-group class="text-dark text-left mt-3" id="companyEntry" label="Ingreso" label-for="companyEntry">
                                <b-row>
                                    <b-icon class="ml-3" icon="calendar" font-scale="2"></b-icon>
                                    <b-col>
                                        <b-form-input v-model="we.companyEntry" id="companyEntry" type="date" placeholder="Ingreso" />
                                    </b-col>
                                </b-row>
                            </b-form-group>
                        </div>

                        <div class="col-5 mx-auto">
                            <b-form-group class="text-dark text-left mt-3" id="exitCompany" label="Termino o Salida" label-for="exitCompany">
                                <b-row>
                                    <b-icon class="ml-3" icon="calendar" font-scale="2"></b-icon>
                                    <b-col class="col-7">
                                        <b-form-input 
                                            v-model="we.exitCompany" 
                                            id="exitCompany" 
                                            type="date" 
                                            placeholder="Termino o Salida"
                                            @change="updateActualWorkExperience('input', idx)"
                                        />
                                    </b-col>
                                    <b-col class="col-3 my-auto">
                                        <b-form-radio 
                                            v-model="we.actualCompany" 
                                            value="actualCompany"
                                            @change="updateActualWorkExperience('radio', idx)"
                                        >Actual</b-form-radio>
                                    </b-col>
                                </b-row>
                            </b-form-group>
                        </div>

                        <div class="col-11 ml-5">
                            <b-form-group class="text-dark text-left mt-3" id="generalDescription" label="Descripción Genereal" label-for="generalDescription">
                                <b-row>
                                    <b-icon class="ml-3" icon="layout-text-sidebar-reverse" font-scale="2"></b-icon>
                                    <b-col>
                                        <b-form-textarea v-model="we.generalDescription" id="generalDescription" type="text" placeholder="Descripción General" />
                                    </b-col>
                                </b-row>
                            </b-form-group>
                        </div>
                        <hr />
                    </b-card-body>

                    <div class="ml-5 my-4">
                        <b-button variant="outline-info" @click="addWorkExperience()">
                            <b-icon icon="plus-circle-fill"></b-icon>
                            Agregar Experiencia
                        </b-button>
                    </div>
                </b-collapse>
            </b-card>
        </div>
        <div>
            <div>
                <b-alert
                    v-if="alertRol === 'form'"
                    :show="dismissCountDown"
                    dismissible
                    :variant="successResponse ? 'success' : 'danger'"
                    @dismissed="dismissCountDown=0"
                    @dismiss-count-down="countDownChanged"
                    class="my-2"
                >
                    <p>{{ successMessage }}</p>
                </b-alert>
            </div>
            <b-button 
                class="m-4" 
                variant="info"
                v-show="userType.trim()"
                @click="saveUserTypeData()"
            >Guardar Datos</b-button>
        </div>
    </div>
</template>

<script>
import firebase from '../../../plugins/firebase';
import { estados } from '../../../db/estados';
import { municipios } from '../../../db/municipios';

export default {
    name: 'UserTypeForm',
    created() {
        this.getCurrentUser();
    },
    data() {
        return {
            stateOptions: estados,
            delegationOptions: [],
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
            requestedActivity: '',
            academicBackground: [],
            workExperience: [],
            curriculumVitae: null,
            optionsUserType: [
                { value: 'partner', text: 'Colaborador' },
                { value: 'customer', text: 'Cliente' },
            ],
            academicLevesOptions: [
                { value: '', text: 'Selecciona una opción' },
                { value: 'Bachillerato', text: 'Bachillerato' },
                { value: 'Carrera Técnica', text: 'Carrera Técnica' },
                { value: 'Licenciatura', text: 'Licenciatura' },
                { value: 'Maestría', text: 'Maestría' },
                { value: 'Doctorado', text: 'Doctorado' },
                { value: 'Diplomado', text: 'Diplomado' },
                { value: 'Posgrado', text: 'Posgrado' },
            ],
            activityOptions: [
                { value: '', text: 'Selecciona una opción' },
                { value: 'Arquitecto', text: 'Arquitecto' },
                { value: 'Ingeniero', text: 'Ingeniero' },
                { value: 'Inspector', text: 'Inspector' },
                { value: 'Maestro', text: 'Maestro' },
                { value: 'Ayudante', text: 'Ayudante' },
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
        formatCurp(evt) { return String(evt).substring(0, 18).toUpperCase() },
        formatCP(evt) { return String(evt).substring(0, 5) },
        toActivateDelegations() {
            this.delegationOptions = [{ 'value': '', 'text': "Selecciona una opción" }];

            municipios.forEach((state) => {
                for(let name in state) {
                    if(name === this.state) this.delegationOptions = [ ...this.delegationOptions, ...state[this.state] ];
                }
            });
        },
        addAcademicBackground() {
            this.academicBackground.push({
                academicLevel: '',
                specialty: '',
                institution: '',
                startPeriod: '',
                endPeriod: '',
                actualLevel: false,
                certificate: null
            });
        },
        addWorkExperience() {
            this.workExperience.push({
                companyName: '',
                developedFunction: '',
                companyEntry: '',
                exitCompany: '',
                actualCompany: false,
                generalDescription: ''
            });
        },
        updateActualAcademicValue(from, idx) {
            console.log(this.academicBackground[idx]);
            if(from === 'input') {
                this.academicBackground[idx].actualLevel = false;
                return;
            }
            if(from === 'radio') { this.academicBackground[idx].endPeriod = '' }
        },
        updateActualWorkExperience(from, idx) {
            if(from === 'input') {
                this.workExperience[idx].actualCompany = false;
                return;
            }
            if(from === 'radio') { this.workExperience[idx].exitCompany = '' }
        },
        partnerUserDataValidations() {
            this.alertRol = 'form';
            this.successResponse = false;
            
            // Validacion de datos personales
            if(!this.bornDate.trim()) {
                this.dismissCountDown = this.dismissSecs;
                this.successMessage = 'Ingresa tu fecha de nacimiento';
                return;
            }
            if(!this.curp.trim() || this.curp.length < 18) {
                this.dismissCountDown = this.dismissSecs;
                this.successMessage = 'Ingresa tu CURP y verifica que sea válido';
                return;
            }
            if(!this.street.trim()) {
                this.dismissCountDown = this.dismissSecs;
                this.successMessage = 'Ingresa la calle de tu domicilio';
                return;
            }
            if(!this.extNumber.trim()) {
                this.dismissCountDown = this.dismissSecs;
                this.successMessage = 'Ingresa número exterior de tu domicilio';
                return;
            }
            if(!this.intNumber.trim()) {
                this.dismissCountDown = this.dismissSecs;
                this.successMessage = 'Ingresa número interior de tu domicilio';
                return;
            }
            if(!this.state.trim()) {
                this.dismissCountDown = this.dismissSecs;
                this.successMessage = 'Selecciona el estado donde vives';
                return;
            }
            if(!this.delegation.trim()) {
                this.dismissCountDown = this.dismissSecs;
                this.successMessage = 'Selecciona el municipio donde vives';
                return;
            }
            if(!this.neighborhood.trim()) {
                this.dismissCountDown = this.dismissSecs;
                this.successMessage = 'Ingresa la colonia en donde vives';
                return;
            }
            if(!this.city.trim()) {
                this.dismissCountDown = this.dismissSecs;
                this.successMessage = 'Ingresa la ciudad en donde vives';
                return;
            }
            if(!this.cp.trim() || this.cp.trim().length < 5) {
                this.dismissCountDown = this.dismissSecs;
                this.successMessage = 'Ingresa tu código postal';
                return;
            }

            // Validacion de formacion academica
            if(this.academicBackground.length === 0) {
                this.dismissCountDown = this.dismissSecs;
                this.successMessage = 'Agrega tu formación academica';
                return;
            }
            this.academicBackground.forEach((academic) => {
                if(!academic.academicLevel.trim()) {
                    this.dismissCountDown = this.dismissSecs;
                    this.successMessage = 'Te hace falta agregar nivel académico';
                    return;
                }
                if(!academic.specialty.trim()) {
                    this.dismissCountDown = this.dismissSecs;
                    this.successMessage = 'Te hace falta agregar especialidad';
                    return;
                }
                if(!academic.institution.trim()) {
                    this.dismissCountDown = this.dismissSecs;
                    this.successMessage = 'Te hace falta agregar Institución Académica';
                    return;
                }
                if(!academic.startPeriod.trim()) {
                    this.dismissCountDown = this.dismissSecs;
                    this.successMessage = 'Te hace falta agregar fecha de inicio de período académico';
                    return;
                }
                if(!academic.endPeriod.trim() && !academic.actualLevel) {
                    this.dismissCountDown = this.dismissSecs;
                    this.successMessage = 'Te hace falta indicar fecha de termino de período académico';
                    return;
                }
            });

            // Validacion de experiencia laboral
            if(this.workExperience.length > 0) {
                this.workExperience.forEach((experience) => {
                    if(!experience.companyName.trim()) {
                        this.dismissCountDown = this.dismissSecs;
                        this.successMessage = 'Te hace falta indicar nombre de la empresa';
                        return;
                    }
                    if(!experience.developedFunction.trim()) {
                        this.dismissCountDown = this.dismissSecs;
                        this.successMessage = 'Te hace falta indicar la función desarrollada';
                        return;
                    }
                    if(!experience.companyEntry.trim()) {
                        this.dismissCountDown = this.dismissSecs;
                        this.successMessage = 'Te hace falta indicar la fecha en la que empezaste a laborar';
                        return;
                    }
                    if(!experience.exitCompany.trim() && !experience.actualCompany) {
                        this.dismissCountDown = this.dismissSecs;
                        this.successMessage = 'Te hace falta indicar tu salida de la empresa';
                        return;
                    }
                    if(!experience.generalDescription.trim()) {
                        this.dismissCountDown = this.dismissSecs;
                        this.successMessage = 'Te hace falta una descripción general de lo que hacias en tu trabajo';
                        return;
                    }
                })
            }

            // Validación de CV y actividad solicitada.
            if(this.curriculumVitae === null) {
                this.dismissCountDown = this.dismissSecs;
                this.successMessage = 'Ingresa tu CV';
                return;
            }
            if(!this.requestedActivity.trim()) {
                this.dismissCountDown = this.dismissSecs;
                this.successMessage = 'Ingresa la actividad que quieres desempeñar';
                return;
            }

        },
        saveUserTypeData() {
            if(this.userType === 'partner') {
                this.partnerUserDataValidations();
            }
            if(this.userType === 'customer') {
                console.log('Todo esta chido');
            }
        },
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

<style  scoped>
    .element-container, .separator {
        width: 100%;
        margin: 0 auto;
        border-bottom: 2px solid #17a2b8;
    }
</style>