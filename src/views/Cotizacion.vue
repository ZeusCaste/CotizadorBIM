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
        <ResultadosCotizacion />

    </div>
</template>

<script>
import ModalEdificacionNueva from '../components/pages/Cotizacion/ModalEdificacionNueva';
import ResultadosCotizacion from '../components/pages/Cotizacion/ResultadosCotizacion.vue';

export default {
    components: {
        ModalEdificacionNueva,
        ResultadosCotizacion,
    },
    data(){
        return{
            
        }
    },
    methods: {
        openModal(){
            this.eventHub.$emit("create", {});
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