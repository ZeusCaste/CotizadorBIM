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
        <div class="bg-warning my-5 p-3">
            <h2>Importes</h2>
            <div v-for="(amountsEdificacion, index) in dataCotizacionNuevaEdificacion.amounts" :key="index">
                <p><strong>Edificacion # {{ index + 1 }} </strong></p>
                <div v-for="(amount, field, idx) in amountsEdificacion" :key="idx">
                    <p v-if="field== 'architecture'">Importe del proyecto Arquitectura: {{amount}} sin incluir I.V.A.</p>
                    <p v-if="field== 'hydro_sanitaryInstallation'">Importe del proyecto Instalacion hidrosanitaria: {{amount}} sin incluir I.V.A.</p>
                    <p v-if="field== 'electricalInstallation'">Importe del proyecto Instalacion electrica: {{amount}} sin incluir I.V.A.</p>
                    <p v-if="field== 'airConditioningWithoutThermalBalance'">Importe del proyecto Aire acondicionado sin balance termico: {{amount}} sin incluir I.V.A.</p>
                    <p v-if="field== 'airConditioningWithThermalBalance'">Importe del proyecto Aire acondicionado con balance termico: {{amount}} sin incluir I.V.A.</p>
                    <p v-if="field== 'ventilationAndExtraction'">Importe del proyecto Ventilacion y extraccion: {{amount}} sin incluir I.V.A.</p>
                    <p v-if="field== 'voiceAndData'">Importe del proyecto Voz y datos: {{amount}} sin incluir I.V.A.</p>
                    <p v-if="field== 'totalAmount'">Importe total de la propuesta: {{amount}} sin incluir I.V.A.</p>
                </div>
            </div>
            <h2>Tiempos de entrega</h2>
            <div v-for="(deliveryTimes, index) in dataCotizacionNuevaEdificacion.deliveryTimes" :key="index">
                <p><strong>Edificacion # {{ index + 1 }} </strong></p>
                <div v-for="(time, field, idx) in deliveryTimes" :key="idx">
                    <p v-if="field== 'architecture'">Tiempo de entrega del proyecto Arquitectura: {{time}}</p>
                    <p v-if="field== 'hydro_sanitaryInstallation'">Tiempo de entrega del proyecto Instalacion hidrosanitaria: {{time}}</p>
                    <p v-if="field== 'electricalInstallation'">Tiempo de entrega del proyecto Instalacion electrica: {{time}}</p>
                    <p v-if="field== 'airConditioningWithoutThermalBalance'">Tiempo de entrega del proyecto Aire acondicionado sin balance termico: {{time}}</p>
                    <p v-if="field== 'airConditioningWithThermalBalance'">Tiempo de entrega del proyecto Aire acondicionado con balance termico: {{time}}</p>
                    <p v-if="field== 'ventilationAndExtraction'">Tiempo de entrega del proyecto Ventilacion y extraccion: {{time}}</p>
                    <p v-if="field== 'voiceAndData'">Tiempo de entrega del proyecto Voz y datos: {{time}}</p>
                    <p v-if="field== 'totalAmount'">Tiempo total estimado de ejecucion: {{time}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex';
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
        }
    },
    computed: {
        ...mapState(['dataCotizacionNuevaEdificacion'])
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