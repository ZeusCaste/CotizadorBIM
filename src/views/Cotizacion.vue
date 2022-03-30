<template>
    <div class="container">
        <div class="my-5">
            <h1 class="text-center text-dark display-3 font-weight-bold">Arma tu cotización</h1>
        </div>
        <!-- Seccion de botones -->
        <div class="button-container">
            <BottonAccion :title="'Edificacion Nueva'" :action="openModalEdificacionNueva" :icon="'clipboard-plus'" />
            <BottonAccion :title="'Edificacion Existente'" :action="openModalEdificacionExistente" :icon="'house'" />

            <ModalEdificacionNueva />
        </div>

        <!-- Seccion pata mostrar el resultado de los calculos -->
        <ResultadosCotizacion />

    </div>
</template>

<script>
import BottonAccion from '../components/pages/Cotizacion/BotonAccion.vue';
import ModalEdificacionNueva from '../components/pages/Cotizacion/ModalEdificacionNueva';
import ResultadosCotizacion from '../components/pages/Cotizacion/ResultadosCotizacion.vue';

export default {
    components: {
        ModalEdificacionNueva,
        ResultadosCotizacion,
        BottonAccion,
    },
    data(){
        return{
            
        }
    },
    methods: {
        openModalEdificacionNueva(){
            this.eventHub.$emit("create", {});
        },
        openModalEdificacionExistente(){
            console.log("Muy pronto");
        }
    }
}
</script>

<style lang="scss" scoped>
    .button-container{
        display: flex;
        flex-direction: row;        
    }
    
</style>