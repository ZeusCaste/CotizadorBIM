<template>
    <div class="container">
        <div class="my-5">
            <h1 class="text-center text-dark">Arma tu cotización</h1>
        </div>
        <div class="button-container">
            <div class="w-50">
                <b-button
                    class="btn-block"
                    variant="outline-info"
                    @click="openModal()"
                >
                    EDIFICACION NUEVA
                </b-button>
            </div>
           <div class="w-50">
                <b-button
                    class="btn-block"
                    variant="outline-info"
                >
                    EDIFICACION EXISTENTE
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
</style>