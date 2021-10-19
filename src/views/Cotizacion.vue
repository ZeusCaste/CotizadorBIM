<template>
    <div class="container">
        <div class="my-5">
            <h1 class="text-center text-dark display-3 font-weight-bold">Arma tu cotización</h1>
        </div>
        <!-- Seccion de botones -->
        <div class="button-container">
            <div class="cotizacion w-50">
                <b-button
                    class="button btn-block"
                    variant="outline-warning"
                    @click="openModal()"
                >
                    <p class="texto">
                        EDIFICACÓN NUEVA
                    </p>

                   <p class="icono">
                        <b-icon
                            icon="clipboard-plus"
                            animation="throb"
                            scale="5"
                        ></b-icon>
                   </p>
                </b-button>
            </div>
            <div class="cotizacion w-50">
                <b-button
                    class="button btn-block"
                    variant="outline-warning"
                >
                    <p class="texto">EDIFICACIÓN EXISTENTE</p>
                    <p class="icono">
                        <b-icon
                            icon="house"
                            animation="throb"
                            scale="5"
                        ></b-icon>
                    </p>
                </b-button>
           </div>

            <ModalEdificacionNueva />
        </div>

        <!-- Seccion pata mostrar el resultado de los calculos -->
        <div v-if="Object.keys(this.dataCotizacionNuevaEdificacion).length > 0" class="bg-warning my-5 px-5 py-3">
            <p class="text-right mt-4 mb-5 h5">{{moment().locale('es').format('LLLL')}}</p>
            <h2 class="text-center mt-3 mb-5">COTIZADOR ARQUITECTURA Y ESTRUCTURA</h2>
            <div v-for="(edificacion, index) in dataCotizacionNuevaEdificacion" :key="index" class="mt-5">
                <p class="h5"><strong>Edificación # {{ index + 1 }} </strong></p>
                <p>
                    De tipo {{ edificacion.dataEdification.type }} 
                    en {{edificacion.dataEdification.delegation}}, {{edificacion.dataEdification.state}}. 
                    Con área total de {{edificacion.m2Construction}} m<sup>2</sup>
                </p>
                <div v-for="(amount, field, idx) in edificacion.amounts" :key="idx">
                   <p v-if="field== 'architecture'">
                        Importe del proyecto Arquitectura: <b>${{ new Intl.NumberFormat().format(amount) }} sin incluir I.V.A.</b>
                        Tiempo de entrega del proyecto: <b>{{edificacion.deliveryTimes[field]}} semanas.</b>
                   </p>
                   <p v-if="field== 'hydro_sanitaryInstallation'">
                        Importe del proyecto Instalación hidrosanitaria: <b>${{ new Intl.NumberFormat().format(amount) }} sin incluir I.V.A.</b>
                        Tiempo de entrega del proyecto: <b>{{edificacion.deliveryTimes[field]}} semanas.</b>
                    </p>
                    <p v-if="field== 'electricalInstallation'">
                        Importe del proyecto Instalación eléctrica: <b>${{ new Intl.NumberFormat().format(amount) }} sin incluir I.V.A.</b>
                        Tiempo de entrega del proyecto: <b>{{edificacion.deliveryTimes[field]}} semanas.</b>
                    </p>
                    <p v-if="field== 'airConditioningWithoutThermalBalance'">
                        Importe del proyecto Aire acondicionado sin balance térmico: <b>${{ new Intl.NumberFormat().format(amount) }} sin incluir I.V.A.</b>
                        Tiempo de entrega del proyecto: <b>{{edificacion.deliveryTimes[field]}} semanas.</b>
                    </p>
                    <p v-if="field== 'airConditioningWithThermalBalance'">
                        Importe del proyecto Aire acondicionado con balance térmico: <b>${{ new Intl.NumberFormat().format(amount) }} sin incluir I.V.A.</b>
                        Tiempo de entrega del proyecto: <b>{{edificacion.deliveryTimes[field]}} semanas.</b>
                    </p>
                    <p v-if="field== 'ventilationAndExtraction'">
                        Importe del proyecto Ventilación y extracción: <b>${{ new Intl.NumberFormat().format(amount) }} sin incluir I.V.A.</b>
                        Tiempo de entrega del proyecto: <b>{{edificacion.deliveryTimes[field]}} semanas.</b>
                    <p v-if="field== 'voiceAndData'">
                        Importe del proyecto Voz y datos: <b>${{ new Intl.NumberFormat().format(amount) }} sin incluir I.V.A.</b>
                        Tiempo de entrega del proyecto: <b>{{edificacion.deliveryTimes[field]}} semanas.</b>
                    </p>
                    <p v-if="field== 'totalAmount'">
                        Importe total de la propuesta: <b>${{ new Intl.NumberFormat().format(amount) }} sin incluir I.V.A.</b>
                        Tiempo total estimado de ejecución: <b>{{edificacion.deliveryTimes["totalTime"]}} semanas.</b>
                    </p>
                </div>
            </div>

            <div class="text-center mt-5 mb-3">
                <b-button 
                    size="lg" 
                    variant="outline-dark"
                    @click="sendPDF()"
                >
                    Enviar
                    <b-spinner v-if="spinner" small label="Small Spinner"></b-spinner>
                </b-button>
            </div>
            <div class="my-3">
                <b-alert
                    :show="dismissCountDown"
                    dismissible
                    :variant="alertStyle"
                    @dismissed="dismissCountDown=0"
                    @dismiss-count-down="countDownChanged"
                >
                    {{ msg }}
                </b-alert>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex';
import firebase from '../plugins/firebase';
import ModalEdificacionNueva from '../components/pages/Cotizacion/ModalEdificacionNueva';
import moment from 'moment';

export default {
    components: {
        ModalEdificacionNueva,
    },
    data(){
        return{
            moment: moment,
            msg: null,
            spinner: false,
            error: null,
            success: false,
            dismissCountDown: 0,
        }
    },
    methods: {
        openModal(){
            this.eventHub.$emit("create", {});
        },
        async sendPDF(){
            this.msg= null;
            this.error= false;
            this.success= false;
            try {
                this.spinner= true;
                const generatePDF= firebase.functions().httpsCallable('generatePDF');
                const response= await generatePDF({dataCotizacion: this.dataCotizacionNuevaEdificacion, datos_contacto: this.userContact});
                if(response.data.success){
                    this.msg= response.data.msg;
                    this.dismissCountDown= 7;
                    this.spinner= false;
                    this.eventHub.$emit("reset", {});
                }
            } catch (error) {
                this.error= true;
                this.msg= error.message;
                this.dismissCountDown= 7;
                this.spinner= false;
            }
        },
        countDownChanged(dismissCountDown){
            this.dismissCountDown = dismissCountDown;
        },
    },
    computed: {
        ...mapState(['dataCotizacionNuevaEdificacion', 'userContact']),
        alertStyle(){
            return this.error !== null && this.success === null ? 'danger' : 'info'
        }
    }
}
</script>

<style lang="scss" scoped>
    .button-container{
        display: flex;
        flex-direction: row;        
    }

    .cotizacion{
        background: #000;
        opacity: 0.7;
        border-radius: 25px;
        margin: 0px 10px;
    }

    .button{
        height: 200px;
        border-width: 3px;
        border-radius: 15px;
    }

    .texto{
        margin-top: -50px;
        font-weight: bold;
    }

    .icono{
        margin-top: 50px;
    }

</style>