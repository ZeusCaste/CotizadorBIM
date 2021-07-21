<template>
  <b-modal
    ref="edificacion-nueva"
    size="lg"
    hide-footer
    hide-header
  >
    <div>
        <div class="header">
            <b class="mt-1">
                <b-icon
                    icon="clipboard-plus"
                    scale="2.5"
                ></b-icon>
            </b>
            <b class="title">Edificacion Nueva</b>
            <b-button
                class="hide-modal"
                size="sm"
                variant="outline-info"
                @click="hideModal()"
            >
                <b-icon
                    icon="x-circle-fill"
                    variant="dark"
                    scale="2"
                ></b-icon>
            </b-button>
        </div>
        <div>
            <div class="seccion bg-info">
                <b-icon
                    icon="building"
                    variant="white"
                    font-scale="2.5"
                ></b-icon>
                <p class="font-weight-bold text-white ml-3 mt-2">Tipo de Edificacion: </p>
            </div>
            <div class="subSeccion">
                <div class="build w-50">
                    <b-icon
                        icon="check-circle"
                        scale="1.5"
                    ></b-icon>
                    <p class="ml-3 mt-3">Edificacion</p>
                </div>
                <div class="build w-50">
                    <b-icon
                        icon="ui-checks"
                        scale="1.5"
                    ></b-icon>
                    <p class="ml-3 mt-3">Proyectos y/o Estudios</p>
                </div>
            </div>
        </div>
        <div>
            <div class="seccion bg-info">
                <b-icon
                    icon="clipboard-data"
                    variant="white"
                    font-scale="2.5"
                ></b-icon>
                <p class="font-weight-bold text-white ml-3 mt-2">Datos del Proyecto: </p>
            </div>
        </div>
        <div>
            <div class="seccion bg-info">
                <b-icon
                    icon="person-badge"
                    variant="white"
                    font-scale="2.5"
                ></b-icon>
                <p class="font-weight-bold text-white ml-3 mt-2">Datos del Contacto: </p>
            </div>
        </div>
    </div>
  </b-modal>
</template>

<script>
export default {
    name: 'EdificacionNueva',
    created(){
        this.eventHub.$on('create', this.onCreateCotizacion);
    },
    data(){
        return{
            
        }
    },
    methods: {
        onCreateCotizacion(){
            this.showModal();
        },
        showModal(){
            if(typeof this.$refs["edificacion-nueva"] !== "undefined"){
                this.$refs["edificacion-nueva"].show();
            }
        },
        hideModal(){
            if(typeof this.$refs["edificacion-nueva"] !== "undefined"){
                this.$refs["edificacion-nueva"].hide();
            }
        }
    },
}
</script>

<style lang="scss" scoped>
    .header{
        height: 50px;
        display: flex;
        justify-content: space-between;
        padding-left: 15px;
        padding-right: 15px;
    }
    .seccion {
        height: 70px;
        display: flex;
        flex-direction: row;
        padding-top: 10px;
        padding-bottom: 10px;
        padding-left: 15px;
        margin-left: -16px;
        margin-right: -16px;
    }

    .subSeccion {
        display: flex;
        flex-direction: row;
        margin: 15px 10px;
    }

    .build {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .hide-modal{
        margin-bottom: 15px;
        border-width: 0px;
    }

    .title{
        font-size: 25px;
    }

</style>