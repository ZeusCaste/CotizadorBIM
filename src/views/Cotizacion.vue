<template>
    <div class="container">
        <div class="my-5">
            <h1 class="text-center text-dark">Arma tu cotización</h1>
        </div>
        <!-- Seccion de botones -->
        <div class="button-container">
            <div class="cotizacion w-50">
                <b-button
                    class="button btn-block"
                    variant="outline-info"
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
                    variant="outline-info"
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
            <h2 class="text-center mt-3 mb-5">COTIZADOR ARQUITECTURA Y ESTRUCTURA</h2>
            <div v-for="(amountsEdificacion, index) in dataCotizacionNuevaEdificacion.amounts" :key="index" class="mt-5">
                <p class="h5"><strong>Edificacion # {{ index + 1 }} </strong></p>
                <p>
                    De tipo {{ dataCotizacionNuevaEdificacion.dataEdification[index].type }} 
                    en {{dataCotizacionNuevaEdificacion.dataEdification[index].delegation}}, {{dataCotizacionNuevaEdificacion.dataEdification[index].state}}. 
                    Con área total de {{dataCotizacionNuevaEdificacion.m2Construction[index]}} m<sup>2</sup>
                </p>
                <div v-for="(amount, field, idx) in amountsEdificacion" :key="idx">
                    <p v-if="field== 'architecture'">
                        Importe del proyecto Arquitectura: <b>${{amountsEdificacion[field]}} sin incluir I.V.A.</b> 
                        Tiempo de entrega del proyecto: <b>{{dataCotizacionNuevaEdificacion.deliveryTimes[index][field]}} semanas.</b>
                    </p>
                    <p v-if="field== 'hydro_sanitaryInstallation'">
                        Importe del proyecto Instalación hidrosanitaria: <b>${{amountsEdificacion[field]}} sin incluir I.V.A.</b> 
                        Tiempo de entrega del proyecto: <b>{{dataCotizacionNuevaEdificacion.deliveryTimes[index][field]}} semanas.</b>
                    </p>
                    <p v-if="field== 'electricalInstallation'">
                        Importe del proyecto Instalación eléctrica: <b>${{amountsEdificacion[field]}} sin incluir I.V.A.</b> 
                        Tiempo de entrega del proyecto: <b>{{dataCotizacionNuevaEdificacion.deliveryTimes[index][field]}} semanas.</b>
                    </p>
                    <p v-if="field== 'airConditioningWithoutThermalBalance'">
                        Importe del proyecto Aire acondicionado sin balance térmico: <b>${{amountsEdificacion[field]}} sin incluir I.V.A.</b> 
                        Tiempo de entrega del proyecto: <b>{{dataCotizacionNuevaEdificacion.deliveryTimes[index][field]}} semanas.</b>
                    </p>
                    <p v-if="field== 'airConditioningWithThermalBalance'">
                        Importe del proyecto Aire acondicionado con balance térmico: <b>${{amountsEdificacion[field]}} sin incluir I.V.A.</b> 
                        Tiempo de entrega del proyecto: <b>{{dataCotizacionNuevaEdificacion.deliveryTimes[index][field]}} semanas.</b>
                    </p>
                    <p v-if="field== 'ventilationAndExtraction'">
                        Importe del proyecto Ventilacion y extracción: <b>${{amountsEdificacion[field]}} sin incluir I.V.A.</b> Tiempo de entrega del proyecto: <b>{{dataCotizacionNuevaEdificacion.deliveryTimes[index][field]}} semanas.</b></p>
                    <p v-if="field== 'voiceAndData'">
                        Importe del proyecto Voz y datos: <b>${{amountsEdificacion[field]}} sin incluir I.V.A.</b> 
                        Tiempo de entrega del proyecto: <b>{{dataCotizacionNuevaEdificacion.deliveryTimes[index][field]}} semanas.</b>
                    </p>
                    <p v-if="field== 'totalAmount'">
                        Importe total de la propuesta: <b>${{amountsEdificacion[field]}} sin incluir I.V.A.</b> 
                        Tiempo total estimado de ejecución: <b>{{dataCotizacionNuevaEdificacion.deliveryTimes[index]["totalTime"]}} semanas.</b>
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
                </b-button>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex';
import firebase from '../plugins/firebase';
import ModalEdificacionNueva from '../components/pages/Cotizacion/ModalEdificacionNueva';

export default {
    components: {
        ModalEdificacionNueva,
    },
    data(){
        return{
    
        }
    },
    methods: {
        openModal(){
            this.eventHub.$emit("create", {});
        },
        sendPDF(){
            const generatePDF= firebase.functions().httpsCallable('generatePDF');
            const response= generatePDF(this.dataCotizacionNuevaEdificacion);
            console.log(response);
        }
    },
    computed: {
        ...mapState(['dataCotizacionNuevaEdificacion']),
    }
}
</script>

<style lang="scss" scoped>
    .button-container{
        display: flex;
        flex-direction: row;
    }

    .button{
        height: 200px;
        border-width: 3px;
    }

    .texto{
        margin-top: -50px;
        font-weight: bold;
    }

    .icono{
        margin-top: 50px;
    }

</style>