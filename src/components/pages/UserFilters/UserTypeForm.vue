<template>
    <div>
        <div v-if="!activeUser" class="text-center">
            <b-skeleton-icon
                icon="person-fill"
                :icon-props="{ fontScale: 35, variant: 'dark' }"
            ></b-skeleton-icon>
        </div>
        <div v-else>
            <div>
                <div class="row">
                    <div class="col-11 col-sm-11 col-md-6 col-lg-5 col-xl-5 mx-auto">
                        <b-form-group class="text-dark text-left mt-3" id="name" label="Nombre Completo" label-for="name">
                            <b-row>
                                <b-icon class="ml-3" icon="person-fill" font-scale="2"></b-icon>
                                <b-col>
                                    <b-form-input disabled v-model="displayName" id="name" type="text" placeholder="Nombre Completo" />
                                </b-col>
                            </b-row>
                        </b-form-group>
                    </div>
                    <div class="col-11 col-sm-11 col-md-6 col-lg-5 col-xl-5 mx-auto">
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
                    <div class="col-11 col-sm-11 col-md-6 col-lg-5 col-xl-5 mx-auto">
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
                    <div class="col-11 col-sm-11 col-md-6 col-lg-5 col-xl-5 mx-auto">
                        <b-form-group class="text-dark text-left mt-3" id="userType" label="Tipo de usuario" label-for="userType">
                            <b-row>
                                <b-icon class="ml-3" icon="person-bounding-box" font-scale="2"></b-icon>
                                <b-col>
                                    <b-form-select v-model="userType" :options="optionsUserType"></b-form-select>
                                </b-col>
                            </b-row>
                        </b-form-group>
                    </div>
                    <div class="col-11 col-sm-11 col-md-12 col-lg-10 col-xl-10 mx-auto">
                        <b-alert v-if="userType === 'partner'" show variant="primary">
                            <strong>Colaborador: </strong>
                            Al elegir esta opción te registrarás como proveedor de servicios, para poder implementar proyectos o tareas específicas
                            <p><strong>Esta configuración no podrá ser modificada en el futuro</strong></p>
                        </b-alert>
                        <b-alert v-if="userType === 'customer'" show variant="primary">
                            <strong>Cliente: </strong>
                            Al elegir esta opción te registrarás como creador de proyectos, los cuales podrás administrar y gestionar.
                            <p><strong>Esta configuración no podrá ser modificada en el futuro</strong></p>
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
                            <div class="col-11 col-sm-11 col-md-6 col-lg-5 col-xl-5 mx-auto">
                                <b-form-group class="text-dark text-left mt-3" id="bornDate" label="Fecha de Nacimiento" label-for="bornDate">
                                    <b-row>
                                        <b-icon class="ml-3" icon="calendar" font-scale="2"></b-icon>
                                        <b-col>
                                            <b-form-input v-model="bornDate" id="bornDate" type="date" placeholder="Fecha de Nacimiento" />
                                        </b-col>
                                    </b-row>
                                </b-form-group>
                            </div>
    
                            <div class="col-11 col-sm-11 col-md-6 col-lg-5 col-xl-5 mx-auto">
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
    
                            <div class="col-11 col-sm-11 col-md-6 col-lg-5 col-xl-5 mx-auto">
                                <b-form-group class="text-dark text-left mt-3" label="Calle" label-for="street">
                                    <b-row>
                                        <b-icon class="ml-3" icon="house" font-scale="2"></b-icon>
                                        <b-col>
                                            <b-form-input v-model="street" id="street" type="text" placeholder="Calle" />
                                        </b-col>
                                    </b-row>
                                </b-form-group>
                            </div>
    
                            <div class="col-11 col-sm-11 col-md-6 col-lg-5 col-xl-5 mx-auto">
                                <b-form-group class="text-dark text-left mt-3" id="extNumber" label="Numero Exterior" label-for="extNumber">
                                    <b-row>
                                        <b-icon class="ml-3" icon="geo-alt-fill" font-scale="2"></b-icon>
                                        <b-col>
                                            <b-form-input v-model="extNumber" id="extNumber" type="text" placeholder="Número Interior" />
                                        </b-col>
                                    </b-row>
                                </b-form-group>
                            </div>
    
                            <div class="col-11 col-sm-11 col-md-6 col-lg-5 col-xl-5 mx-auto">
                                <b-form-group class="text-dark text-left mt-3" id="intNumber" label="Numero Interior" label-for="intNumber">
                                    <b-row>
                                        <b-icon class="ml-3" icon="geo-alt-fill" font-scale="2"></b-icon>
                                        <b-col>
                                            <b-form-input v-model="intNumber" id="intNumber" type="text" placeholder="Número Interior" />
                                        </b-col>
                                    </b-row>
                                </b-form-group>
                            </div>
    
                            <div class="col-11 col-sm-11 col-md-6 col-lg-5 col-xl-5 mx-auto">
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
    
                            <div class="col-11 col-sm-11 col-md-6 col-lg-5 col-xl-5 mx-auto">
                                <b-form-group class="text-dark text-left mt-3" id="delegation" label="Delegacion o Municipio" label-for="delegation">
                                    <b-row>
                                        <b-icon class="ml-3" icon="geo-fill" font-scale="2"></b-icon>
                                        <b-col>
                                            <b-form-select v-model="delegation" :options="delegationOptions" id="delegation" ></b-form-select>
                                        </b-col>
                                    </b-row>
                                </b-form-group>
                            </div>
                            
                            <div class="col-11 col-sm-11 col-md-6 col-lg-5 col-xl-5 mx-auto">
                                <b-form-group class="text-dark text-left mt-3" id="neighborhood" label="Colonia" label-for="neighborhood">
                                    <b-row>
                                        <b-icon class="ml-3" icon="geo-fill" font-scale="2"></b-icon>
                                        <b-col>
                                            <b-form-input v-model="neighborhood" id="neighborhood" type="text" placeholder="Colonia" />
                                        </b-col>
                                    </b-row>
                                </b-form-group>
                            </div>
    
                            <div class="col-11 col-sm-11 col-md-6 col-lg-5 col-xl-5 mx-auto">
                                <b-form-group class="text-dark text-left mt-3" id="city" label="Ciudad" label-for="city">
                                    <b-row>
                                        <b-icon class="ml-3" icon="geo-fill" font-scale="2"></b-icon>
                                        <b-col>
                                            <b-form-input v-model="city" id="city" type="text" placeholder="Ciudad" />
                                        </b-col>
                                    </b-row>
                                </b-form-group>
                            </div>
    
                            <div class="col-11 col-sm-11 col-md-6 col-lg-5 col-xl-5 mx-auto">
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
                            <div class="col-11 col-sm-11 col-md-6 col-lg-5 col-xl-5 mx-auto">
                                <b-form-group class="text-dark text-left mt-3" id="academicLevel" label="Nivel Acádemico" label-for="academicLevel">
                                    <b-row>
                                        <b-icon class="ml-3" icon="journal-bookmark-fill" font-scale="2"></b-icon>
                                        <b-col>
                                            <b-form-select v-model="ab.academicLevel" :options="academicLevesOptions" id="academicLevel" ></b-form-select>
                                        </b-col>
                                    </b-row>
                                </b-form-group>
                            </div>
    
                            <div class="col-11 col-sm-11 col-md-6 col-lg-5 col-xl-5 mx-auto">
                                <b-form-group class="text-dark text-left mt-3" id="specialty" label="Especialidad" label-for="specialty">
                                    <b-row>
                                        <b-icon class="ml-3" icon="patch-check-fill" font-scale="2"></b-icon>
                                        <b-col>
                                            <b-form-input v-model="ab.specialty" id="specialty" type="text" placeholder="Especialidad" />
                                        </b-col>
                                    </b-row>
                                </b-form-group>
                            </div>
    
                            <div class="col-11 col-sm-11 col-md-6 col-lg-5 col-xl-5 mx-auto">
                                <b-form-group class="text-dark text-left mt-3" id="institution" label="Escuela o Institución" label-for="institution">
                                    <b-row>
                                        <b-icon class="ml-3" icon="credit-card2-front-fill" font-scale="2"></b-icon>
                                        <b-col>
                                            <b-form-input v-model="ab.institution" id="institution" type="text" placeholder="Escuela o Institución" />
                                        </b-col>
                                    </b-row>
                                </b-form-group>
                            </div>
    
                            <div class="col-11 col-sm-11 col-md-6 col-lg-5 col-xl-5 mx-auto">
                                <b-form-group class="text-dark text-left mt-3" id="startPeriod" label="Inicio" label-for="startPeriod">
                                    <b-row>
                                        <b-icon class="ml-3" icon="calendar" font-scale="2"></b-icon>
                                        <b-col>
                                            <b-form-input v-model="ab.startPeriod" id="startPeriod" type="date" placeholder="Inicio" />
                                        </b-col>
                                    </b-row>
                                </b-form-group>
                            </div>
    
                            <div class="col-11 col-sm-11 col-md-6 col-lg-5 col-xl-5 mx-auto">
                                <b-form-group class="text-dark text-left mt-3" id="endPeriod" label="Finalización" label-for="endPeriod">
                                    <b-row>
                                        <b-icon class="ml-3" icon="calendar" font-scale="2"></b-icon>
                                        <b-col class="col-6">
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
    
                            <div class="col-11 col-sm-11 col-md-6 col-lg-5 col-xl-5 mx-auto">
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
    
                            <div class="my-2 ml-5">
                                <b-button variant="danger" @click="removeAcademicLevel(idx)">
                                    <b-icon icon="trash-fill"></b-icon>
                                    Eliminar formación
                                </b-button>
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
                            <div class="col-11 col-sm-11 col-md-6 col-lg-5 col-xl-5 mx-auto">
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
    
                            <div class="col-11 col-sm-11 col-md-6 col-lg-5 col-xl-5 mx-auto">
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
                            <div class="col-11 col-sm-11 col-md-6 col-lg-5 col-xl-5 mx-auto">
                                <b-form-group class="text-dark text-left mt-3" id="companyName" label="Nombre de la empresa" label-for="CompanyName">
                                    <b-row>
                                        <b-icon class="ml-3" icon="wallet-fill" font-scale="2"></b-icon>
                                        <b-col>
                                            <b-form-input v-model="we.companyName" id="companyName" type="text" placeholder="Nombre de la empresa" />
                                        </b-col>
                                    </b-row>
                                </b-form-group>
                            </div>
    
                            <div class="col-11 col-sm-11 col-md-6 col-lg-5 col-xl-5 mx-auto">
                                <b-form-group class="text-dark text-left mt-3" id="developedFunction" label="Función Desarrollada" label-for="developedFunction">
                                    <b-row>
                                        <b-icon class="ml-3" icon="hdd-network-fill" font-scale="2"></b-icon>
                                        <b-col>
                                            <b-form-input v-model="we.developedFunction" id="developedFunction" type="text" placeholder="Función Desarrollada" />
                                        </b-col>
                                    </b-row>
                                </b-form-group>
                            </div>
    
                            <div class="col-11 col-sm-11 col-md-6 col-lg-5 col-xl-5 mx-auto">
                                <b-form-group class="text-dark text-left mt-3" id="companyEntry" label="Ingreso" label-for="companyEntry">
                                    <b-row>
                                        <b-icon class="ml-3" icon="calendar" font-scale="2"></b-icon>
                                        <b-col>
                                            <b-form-input v-model="we.companyEntry" id="companyEntry" type="date" placeholder="Ingreso" />
                                        </b-col>
                                    </b-row>
                                </b-form-group>
                            </div>
    
                            <div class="col-11 col-sm-11 col-md-6 col-lg-5 col-xl-5 mx-auto">
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
                                                value="true"
                                                @change="updateActualWorkExperience('radio', idx)"
                                            >Actual</b-form-radio>
                                        </b-col>
                                    </b-row>
                                </b-form-group>
                            </div>
    
                            <div class="col-12 col-sm-11 col-md-11 col-lg-11 col-xl-11 mx-auto">
                                <b-form-group class="text-dark text-left mt-3" id="generalDescription" label="Descripción Genereal" label-for="generalDescription">
                                    <b-row>
                                        <b-icon class="ml-3" icon="layout-text-sidebar-reverse" font-scale="2"></b-icon>
                                        <b-col>
                                            <b-form-textarea v-model="we.generalDescription" id="generalDescription" type="text" placeholder="Descripción General" />
                                        </b-col>
                                    </b-row>
                                </b-form-group>
                            </div>
    
                            <div class="my-2 ml-5">
                                <b-button variant="danger" @click="removeWorkExperience(idx)">
                                    <b-icon icon="trash-fill"></b-icon>
                                    Eliminar experiencia
                                </b-button>
                            </div>
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
                >
                    Guardar Datos
                    <b-spinner small variant="light" label="Spinning" v-if="saveDataSpinner"></b-spinner>
                </b-button>
            </div>

        </div>
    </div>
</template>

<script>
import firebase from '../../../plugins/firebase';
import { estados } from '../../../db/estados';
import { municipios } from '../../../db/municipios';
import { colaborador } from '../../../db/colaboradorNuevo';

export default {
    name: 'UserTypeForm',
    created() {
        this.getCurrentUser();
    },
    async mounted() {
        this.activeUser = false;
        const getUpdatedUserDataFunction = firebase.functions().httpsCallable('getUpdatedUserData');
        const { data } = await getUpdatedUserDataFunction();
        if(data.customClaims && data.customClaims.definedUser) {
            this.activeUser = true;
            this.$router.replace({ name: `${data.customClaims.userType}Session`})
        }
        this.activeUser = true;
    },
    data() {
        return {
            activeUser: false,
            saveDataSpinner : false,
            stateOptions: estados,
            delegationOptions: [],
            displayName: '',
            email: '',
            emailVerified: false,
            phoneNumber: '',
            OTPCode: '',
            /////
            userType: colaborador.userType,
            bornDate: colaborador.bornDate,
            curp: colaborador.curp,
            street: colaborador.street,
            extNumber: colaborador.extNumber,
            intNumber: colaborador.intNumber,
            state: colaborador.state,
            delegation: colaborador.delegation,
            neighborhood: colaborador.neighborhood,
            city: colaborador.city,
            cp: colaborador.cp,
            academicBackground: colaborador.academicBackground,
            workExperience: colaborador.workExperience,
            curriculumVitae: colaborador.curriculumVitae,
            requestedActivity: colaborador.requestedActivity,
            ////////
            // userType: '',
            // bornDate: '',
            // curp: '',
            // street: '',
            // extNumber: '',
            // intNumber: '',
            // state: '',
            // delegation: '',
            // neighborhood: '',
            // city: '',
            // cp: '',
            // academicBackground: [],
            // workExperience: [],
            // curriculumVitae: null,
            // requestedActivity: '',
            optionsUserType: [
                { value: '', text: 'Selecciona una opción' },
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
                { value: 'Maestro de obra', text: 'Maestro de obra' },
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
        removeAcademicLevel(idx) { this.academicBackground = this.academicBackground.filter((ab, id) => id !== idx) },
        removeWorkExperience(idx) { this.workExperience = this.workExperience.filter((we, id) => id !== idx) },
        partnerUserDataValidations() {
            this.alertRol = 'form';
            this.successResponse = false;
            
            // Validacion de datos personales
            if(!this.bornDate.trim()) {
                this.dismissCountDown = this.dismissSecs;
                this.successMessage = 'Ingresa tu fecha de nacimiento';
                this.saveDataSpinner = false;
                return;
            }
            if(!this.curp.trim() || this.curp.length < 18) {
                this.dismissCountDown = this.dismissSecs;
                this.successMessage = 'Ingresa tu CURP y verifica que sea válido';
                this.saveDataSpinner = false;
                return;
            }
            if(!this.street.trim()) {
                this.dismissCountDown = this.dismissSecs;
                this.successMessage = 'Ingresa la calle de tu domicilio';
                this.saveDataSpinner = false;
                return;
            }
            if(!this.extNumber.trim()) {
                this.dismissCountDown = this.dismissSecs;
                this.successMessage = 'Ingresa número exterior de tu domicilio';
                this.saveDataSpinner = false;
                return;
            }
            if(!this.intNumber.trim()) {
                this.dismissCountDown = this.dismissSecs;
                this.successMessage = 'Ingresa número interior de tu domicilio';
                this.saveDataSpinner = false;
                return;
            }
            if(!this.state.trim()) {
                this.dismissCountDown = this.dismissSecs;
                this.successMessage = 'Selecciona el estado donde vives';
                this.saveDataSpinner = false;
                return;
            }
            if(!this.delegation.trim()) {
                this.dismissCountDown = this.dismissSecs;
                this.successMessage = 'Selecciona el municipio donde vives';
                this.saveDataSpinner = false;
                return;
            }
            if(!this.neighborhood.trim()) {
                this.dismissCountDown = this.dismissSecs;
                this.successMessage = 'Ingresa la colonia en donde vives';
                this.saveDataSpinner = false;
                return;
            }
            if(!this.city.trim()) {
                this.dismissCountDown = this.dismissSecs;
                this.successMessage = 'Ingresa la ciudad en donde vives';
                this.saveDataSpinner = false;
                return;
            }
            if(!this.cp.trim() || this.cp.trim().length < 5) {
                this.dismissCountDown = this.dismissSecs;
                this.successMessage = 'Ingresa tu código postal';
                this.saveDataSpinner = false;
                return;
            }

            // Validacion de formacion academica
            if(this.academicBackground.length === 0) {
                this.dismissCountDown = this.dismissSecs;
                this.successMessage = 'Agrega tu formación academica';
                this.saveDataSpinner = false;
                return;
            }
            this.academicBackground.forEach((academic) => {
                if(!academic.academicLevel.trim()) {
                    this.dismissCountDown = this.dismissSecs;
                    this.successMessage = 'Te hace falta agregar nivel académico';
                    this.saveDataSpinner = false;
                    return;
                }
                if(!academic.specialty.trim()) {
                    this.dismissCountDown = this.dismissSecs;
                    this.successMessage = 'Te hace falta agregar especialidad';
                    this.saveDataSpinner = false;
                    return;
                }
                if(!academic.institution.trim()) {
                    this.dismissCountDown = this.dismissSecs;
                    this.successMessage = 'Te hace falta agregar Institución Académica';
                    this.saveDataSpinner = false;
                    return;
                }
                if(!academic.startPeriod.trim()) {
                    this.dismissCountDown = this.dismissSecs;
                    this.successMessage = 'Te hace falta agregar fecha de inicio de período académico';
                    this.saveDataSpinner = false;
                    return;
                }
                if(!academic.endPeriod.trim() && !academic.actualLevel) {
                    this.dismissCountDown = this.dismissSecs;
                    this.successMessage = 'Te hace falta indicar fecha de termino de período académico';
                    this.saveDataSpinner = false;
                    return;
                }
            });

            // Validacion de experiencia laboral
            if(this.workExperience.length > 0) {
                this.workExperience.forEach((experience) => {
                    if(!experience.companyName.trim()) {
                        this.dismissCountDown = this.dismissSecs;
                        this.successMessage = 'Te hace falta indicar nombre de la empresa';
                        this.saveDataSpinner = false;
                        return;
                    }
                    if(!experience.developedFunction.trim()) {
                        this.dismissCountDown = this.dismissSecs;
                        this.successMessage = 'Te hace falta indicar la función desarrollada';
                        this.saveDataSpinner = false;
                        return;
                    }
                    if(!experience.companyEntry.trim()) {
                        this.dismissCountDown = this.dismissSecs;
                        this.successMessage = 'Te hace falta indicar la fecha en la que empezaste a laborar';
                        this.saveDataSpinner = false;
                        return;
                    }
                    if(!experience.exitCompany.trim() && !experience.actualCompany) {
                        this.dismissCountDown = this.dismissSecs;
                        this.successMessage = 'Te hace falta indicar tu salida de la empresa';
                        this.saveDataSpinner = false;
                        return;
                    }
                    if(!experience.generalDescription.trim()) {
                        this.dismissCountDown = this.dismissSecs;
                        this.successMessage = 'Te hace falta una descripción general de lo que hacias en tu trabajo';
                        this.saveDataSpinner = false;
                        return;
                    }
                })
            }

            // Validación de CV y actividad solicitada.
            if(this.curriculumVitae === null) {
                this.dismissCountDown = this.dismissSecs;
                this.successMessage = 'Ingresa tu CV';
                this.saveDataSpinner = false;
                return;
            }
            if(!this.requestedActivity.trim()) {
                this.dismissCountDown = this.dismissSecs;
                this.successMessage = 'Ingresa la actividad que quieres desempeñar';
                this.saveDataSpinner = false;
                return;
            }

        },
        verifyEmailAndPhoneNumberValidation() {
            this.alertRol = 'form';
            this.successResponse = false;
            if(!this.emailVerified || !this.getPhoneNumberVerificatedStatus) {
                this.dismissCountDown = this.dismissSecs;
                this.successMessage = 'Es necesario hacer la verificación de email y de número teléfonico';
                this.saveDataSpinner = false;
                return;
            }
        },
        async saveUserTypeData() {
            try {
                this.saveDataSpinner = true;
                this.verifyEmailAndPhoneNumberValidation();
                const saveUserTypeDataFunction = firebase.functions().httpsCallable('saveUserTypeData');
                
                if(this.userType === 'partner') {
                    this.partnerUserDataValidations();
                    
                    const certificates = await Promise.all(this.academicBackground.map(async({ certificate} ) => { 
                        return certificate ? { base64: await this.fileToBase64(certificate), fileName: certificate.name } : null
                    }));
                    const response = await saveUserTypeDataFunction({
                        userType: this.userType,
                        bornDate: this.bornDate,
                        curp: this.curp,
                        street: this.street,
                        extNumber: this.extNumber,
                        intNumber: this.intNumber,
                        state: this.state,
                        delegation: this.delegation,
                        neighborhood: this.neighborhood,
                        city: this.city,
                        cp: this.cp,
                        academicBackground: this.academicBackground,
                        workExperience: this.workExperience,
                        cvBase64: await this.fileToBase64(this.curriculumVitae),
                        cvName: this.curriculumVitae.name,
                        certificatesBase64: certificates,
                        requestedActivity: this.requestedActivity,
                    });
                    
                    if(response.data.success) {
                        this.alertRol = 'form';
                        this.successResponse = true;
                        this.dismissCountDown = this.dismissSecs;
                        this.successMessage = response.data.msg;
    
                        setTimeout(() => {
                            this.saveDataSpinner = false;
                            this.$router.replace({ name: `${this.userType}Session` });
                        }, 5000);
                    }
                }
                if(this.userType === 'customer') {
                    const response = await saveUserTypeDataFunction({ userType: this.userType });
                    if(response.data.success) {
                        this.alertRol = 'form';
                        this.successResponse = true;
                        this.dismissCountDown = this.dismissSecs;
                        this.successMessage = response.data.msg;
    
                        setTimeout(() => {
                            this.saveDataSpinner = false;
                            this.$router.push({ name: `${this.userType}Session` });
                        }, 5000);
                    }
                }
                
            } catch (error) {
                console.log(error);
                this.alertRol = 'form';
                this.successResponse = false;
                this.dismissCountDown = this.dismissSecs;
                this.saveDataSpinner = false;
                if(error.code === 'invalid-argument') {
                    this.successMessage = 'Datos incompletos, verifica que estas enviando todos los datos';
                    return;
                }
                if(error.code === 'unauthenticated') {
                    this.successMessage = 'Usuario no encontrado';
                    return;
                }
                if(error.code === 'permission-denied') {
                    this.successMessage = 'Actualmente el usuario ya esta definido';
                    return;
                }
                if(error.code === 'cancelled') {
                    this.successMessage = 'Requieres hacer la verificación de número telefónico y de correo electrónico';
                    return;
                }
                if(error.code === 'unknown') {
                    this.successMessage = 'Servicio intermitente, intentalo más tarde';
                }
            }
        },
        fileToBase64(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = reject;
            })
        }
    },
    computed: {
        getPhoneNumberVerificatedStatus() {
            let aux = this.phoneNumber + '';
            return (aux.startsWith('+') && aux.length === 13) 
        },
        getCurpInput() { return document.getElementById('curp-input') },
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