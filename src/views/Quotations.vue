<template>
    <div class="container">
        <div class="my-5">
            <h1 class="text-center text-dark display-3 font-weight-bold">Arma tu cotización</h1>
        </div>
        <!-- Seccion de botones -->
        <div class="button-container">
            <ActionButton :title="'Edificacion Nueva'" :action="openNewBuildingModal" :icon="'clipboard-plus'" />
            <ActionButton :title="'Edificacion Existente'" :action="openExistingBuildingModal" :icon="'house'" />

            <NewBuildingModal />
        </div>

        <!-- Seccion pata mostrar el resultado de los calculos -->
        <QuotationResults />

    </div>
</template>

<script>
import ActionButton from '../components/pages/Cotizacion/ActionButton.vue';
import NewBuildingModal from '../components/pages/Cotizacion/NewBuildingModal.vue';
import QuotationResults from '../components/pages/Cotizacion/QuotationResults.vue';

export default {
    components: {
        NewBuildingModal,
        QuotationResults,
        ActionButton,
    },
    data(){
        return{
            
        }
    },
    methods: {
        openNewBuildingModal(){
            this.eventHub.$emit("create", {});
        },
        openExistingBuildingModal(){
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