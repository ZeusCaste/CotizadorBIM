<template>
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
                <p v-if="field !== 'totalAmount'">
                    Importe del proyecto {{ field }}: <b>${{ new Intl.NumberFormat().format(amount) }} sin incluir I.V.A.</b>
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
        {{ dataCotizacionNuevaEdificacion }}
    </div>
</template>

<script>
import firebase from '../../../plugins/firebase';
import { mapState } from 'vuex';
import moment from 'moment';

export default {
    data(){
        return {
            moment,
            msg: null,
            spinner: false,
            error: null,
            success: false,
            dismissCountDown: 0,
        }
    },
    methods: {
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

<style>

</style>