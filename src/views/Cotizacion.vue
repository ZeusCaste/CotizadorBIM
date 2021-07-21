<template>
    <div class="container">
        <div class="my-5">
            <h1 class="text-center text-dark">Arma tu cotización</h1>
        </div>
        <div class="button-container">
            <div class="cotizacion w-50">
                <b-button
                    class="button btn-block"
                    variant="outline-info"
                    @click="openModal()"
                >
                    <p class="texto">
                        EDIFICACION NUEVA
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
                    <p class="texto">EDIFICACION EXISTENTE</p>
                    <p class="icono">
                        <b-icon
                            icon="house"
                            animation="throb"
                            scale="5"
                        ></b-icon>
                    </p>
                </b-button>
           </div>
        </div>

        <ModalEdificacionNueva />
    </div>
</template>

<script>
import ModalEdificacionNueva from '../components/ModalEdificacionNueva.vue';

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