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
                <div class="w-50">
                    <div class="build">
                        <b-icon
                            icon="check-circle"
                            scale="1.5"
                        ></b-icon>
                        <p class="ml-3 mt-3 font-weight-bold">Edificacion</p>
                    </div>
                    {{form.edificacion}}
                    <div class="radio-Container py-4 d-flex justify-content-center">
                        <b-form-radio-group
                            v-model="form.edificacion"
                            :options="edificacionOptions"
                            name="text"
                            stacked
                        ></b-form-radio-group>
                    </div>
                </div>
                <div class="w-50">
                    <div class="build">
                        <b-icon
                            icon="ui-checks"
                            scale="1.5"
                        ></b-icon>
                        <p class="ml-3 mt-3 font-weight-bold">Proyectos y/o Estudios</p>
                    </div>
                    {{form.proyectos_estudios}}
                    <div class="radio-Container py-4 d-flex justify-content-center">
                        <b-form-checkbox-group
                            v-model="form.proyectos_estudios"
                            :options="proyectos_estudiosOptions"
                            name="text"
                            stacked
                        ></b-form-checkbox-group>
                    </div>
                </div>
            </div>
            <div class="button-container">
                <b-button 
                    variant="success"
                    @click="addTipoEdificacion()"
                >Agregar</b-button>
                <b-button 
                    variant="danger"
                    @click="cleanFields()"
                >Limpiar Campos</b-button>
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
            <div class="container build m-3">
                <div class="w-50">
                    <b-row>
                        <b-col>
                            <b-icon
                                icon="geo-alt-fill"
                                scale="1"
                            ></b-icon>
                            <label for="">Ubicación del proyecto</label>
                            <b-form-input></b-form-input>
                        </b-col>
                    </b-row>
                </div>
                <div class="w-50">
                    <b-row class="mx-2">
                        <b-col>
                            <b-icon
                                icon="geo-alt-fill"
                                scale="1"
                            ></b-icon>
                            <label for="">Estado</label>
                            <b-form-input></b-form-input>
                        </b-col>
                    </b-row>
                </div>
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
        <div class="footer">
            <b-button
                size="lg"
                variant="dark"
                block
                style="height: 80px;"
            >
                <b class="h1">ACEPTAR</b>
            </b-button>
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
            form: {
                edificacion: null,
                proyectos_estudios: [],
            },
            edificacionOptions: [
                {id: 1, text: "Vivienda Familiar", value: "vivienda_familiar"},
                {id: 2, text: "Vivienda Adosada", value: "vivienda_adosada"},
                {id: 3, text: "Vivienda Multifamiliar", value: "vivienda_multifamiliar"},
                {id: 4, text: "Vivienda Residencial", value: "vivienda_residencial"},
                {id: 5, text: "Oficinas y Locales", value: "oficinas_locales"},
                {id: 6, text: "Comercial", value: "comercial"},
                {id: 7, text: "Administrativo", value: "administrativo"},
                {id: 8, text: "Estacionamientos", value: "estacionamientos"},
                {id: 9, text: "Pública concurrencia", value: "publica_concurrencia"},
                {id: 10, text: "Docencia", value: "docencia"},
                {id: 11, text: "Salud", value: "salud"},
                {id: 12, text: "Industrial", value: "industrial"},
            ],
            proyectos_estudiosOptions: [
                {id: 1, text: "Arquitectura", value: "arquitectura"},
                {id: 1, text: "Instalación hodrosanitaria", value: "instalacion_hidrosanitaria"},
                {id: 1, text: "Instalación Eléctrica", value: "instalacion_electrica"},
                {id: 1, text: "Aire acondicionado sin balance térmico", value: "arire_acondicionado_sin_balance_termico"},
                {id: 1, text: "Aire acondicionado con balance térmico", value: "arire_acondicionado_con_balance_termico"},
                {id: 1, text: "Ventilación y Extracción", value: "ventilacion_y_extraccion"},
                {id: 1, text: "Voz y Datos", value: "voz_y_datos"},
            ]
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
        },
        cleanFields(){
            this.form= {
                edificacion: null,
                proyectos_estudios: [],
            }
        },
        addTipoEdificacion(){
            console.log(this.form);
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

    .footer{
        padding-top: 20px;
        display: flex;
        justify-content: center;
    }

    .radio-Container{
        display: flex;
        justify-content: center;
    }

    .button-container{
        display: flex;
        justify-content: space-around;
        margin-bottom: 15px;
    }
</style>