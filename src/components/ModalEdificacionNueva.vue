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
                                class="mr-1"
                            ></b-icon>
                            <label>Ubicación del proyecto</label>
                            <b-form-input placeholder="Calle 6 No. 517, Colonia Pascal"></b-form-input>
                        </b-col>
                    </b-row>
                </div>
                <div class="w-50">
                    <b-row class="mx-2">
                        <b-col>
                            <b-icon
                                icon="geo-alt-fill"
                                scale="1"
                                class="mr-1"
                            ></b-icon>
                            <label for="estado">Estado</label>
                            <b-form-select
                                id="estado"
                                v-model="form.estado"
                                :options="estados"
                                @change="loadMunicipios()"
                            ></b-form-select>
                        </b-col>
                    </b-row>
                </div>
            </div>
            <div class="container build m-3">
                <div class="w-50">
                    <b-row>
                        <b-col>
                            <b-icon
                                icon="geo-alt-fill"
                                scale="1"
                                class="mr-1"
                            ></b-icon>
                            <label for="municipio">Ciudad o Municipio</label>
                            <b-form-select
                                id="minucipio"
                                v-model="form.municipio"
                                :options="municipiosSelected"
                                :disabled="setDisabledMunicipiosSelect"
                            ></b-form-select>
                        </b-col>
                    </b-row>
                </div>
                <div class="w-50">
                    <b-row class="mx-2">
                        <b-col>
                            <b-icon
                                icon="geo-alt-fill"
                                scale="1"
                                class="mr-1"
                            ></b-icon>
                            <label for="">Codigo Postal</label>
                            <b-form-input
                                v-model="form.codigoPostal"
                            ></b-form-input>
                        </b-col>
                    </b-row>
                </div>
            </div>
            <div class="button-toggle">
                <b-button 
                    variant="dark"
                    size="md"
                    class="w-50 button"
                >
                    <b-icon icon="columns-gap"></b-icon>
                    Areas del Proyecto
                </b-button>
            </div>
            <div class="container build my-3">
                <div class="input-area-proyecto">
                    <b-row class="mx-2">
                        <b-col>
                            <b-icon
                                icon="bounding-box"
                                scale="1"
                                class="mr-1"
                            ></b-icon>
                            <label for="">Área de planta baja (m2)</label>
                            <b-form-input
                                v-model="form.areaPlantaBaja"
                                placeholder="Introduce are en m2"
                            ></b-form-input>
                        </b-col>
                    </b-row>
                </div>
                <div class="input-area-proyecto">
                    <b-row class="mx-2">
                        <b-col>
                            <b-icon
                                icon="bricks"
                                scale="1"
                                class="mr-1"
                            ></b-icon>
                            <label for="">Número de niveles tipo</label>
                            <b-form-input
                                v-model="form.numeroNiveles"
                                placeholder="2"
                            ></b-form-input>
                        </b-col>
                    </b-row>
                </div>
                <div class="input-area-proyecto">
                    <b-row class="mx-2">
                        <b-col>
                            <b-icon
                                icon="bounding-box-circles"
                                scale="1"
                                class="mr-1"
                            ></b-icon>
                            <label for="">Área del nivel tipo (m2)</label>
                            <b-form-input
                                v-model="form.areaNivelTipo"
                                placeholder="Introduce el area en m2"
                            ></b-form-input>
                        </b-col>
                    </b-row>
                </div>
            </div>
            <div class="button-toggle">
                <b-button 
                    variant="dark"
                    size="md"
                    class="w-50 button"
                    @click="sotanosToggle()"
                >
                    <b-icon icon="grid-1x2"></b-icon>
                    Sotanos
                    <b-icon :icon="sotanos ? 'caret-up-square' : 'caret-down-square'"></b-icon>
                </b-button>
            </div>
            <div class="build" v-if="sotanos">
                <div class="input-area-proyecto">
                    <b-row class="mx-2">
                        <b-col>
                            <b-icon
                                icon="geo-alt-fill"
                                scale="1"
                            ></b-icon>
                            <label for="">Número de sotanos</label>
                            <b-form-input
                                v-model="form.numeroSotanos"
                                placeholder="2"
                            ></b-form-input>
                        </b-col>
                    </b-row>
                </div>
                <div class="input-area-proyecto">
                    <b-row class="mx-2">
                        <b-col>
                            <b-icon
                                icon="geo-alt-fill"
                                scale="1"
                            ></b-icon>
                            <label for="">Área de sotano (m2)</label>
                            <b-form-input
                                v-model="form.areaSotano"
                                placeholder="Introduce el area en m2"
                            ></b-form-input>
                        </b-col>
                    </b-row>
                </div>
            </div>
            <div class="w-100 row my-4 d-flex justify-content-around">
                <div class="accesibilidad">
                    <div class="row d-flex justify-content-center">
                        <b-icon icon="app-indicator" class="mt-1 mr-2"></b-icon>
                        <p class="font-weight-bold">Accesibilidad</p>
                    </div>
                    <div class="radio-Container py-1 d-flex justify-content-center">
                        <b-form-radio-group
                            v-model="form.accesibilidad"
                            :options="accesibilidadOptions"
                            name="text"
                            stacked
                        ></b-form-radio-group>
                    </div>
                </div>
                <div class="accesibilidad">
                    <div class="row d-flex justify-content-center">
                        <b-icon icon="image-fill" class="mt-1 mr-2"></b-icon>
                        <p class="font-weight-bold">Topografia</p>
                    </div>
                    <div class="radio-Container py-1 d-flex justify-content-center">
                        <b-form-radio-group
                            v-model="form.topografia"
                            :options="topografiaOptions"
                            name="text"
                            stacked
                        ></b-form-radio-group>
                    </div>
                </div>
                <div class="accesibilidad">
                    <div class="row d-flex justify-content-center">
                        <b-icon icon="geo-fill" class="mt-1 mr-2"></b-icon>
                        <p class="font-weight-bold">Ubicación</p>
                    </div>
                    <div class="radio-Container py-1 d-flex justify-content-center">
                        <b-form-radio-group
                            v-model="form.ubicacion"
                            :options="ubicacionOptions"
                            name="text"
                            stacked
                        ></b-form-radio-group>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div class="seccion bg-info">
                <b-icon
                    icon="person-badge"
                    variant="white"
                    font-scale="2.5"
                    class="mr-1"
                ></b-icon>
                <p class="font-weight-bold text-white ml-3 mt-2">Datos del Contacto: </p>
            </div>
            <div class="container build my-3">
                <div class="datos-contacto">
                    <b-row class="mx-2">
                        <b-col>
                            <b-icon
                                icon="person-bounding-box"
                                scale="1"
                                class="mr-1"
                            ></b-icon>
                            <label for="">Nombre completo</label>
                            <b-form-input
                                v-model="form.datos_contacto.nombreCompleto"
                                placeholder="Francisco Martinez Del Campo"
                            ></b-form-input>
                        </b-col>
                    </b-row>
                </div>
                <div class="datos-contacto">
                    <b-row class="mx-2">
                        <b-col>
                            <b-icon
                                icon="phone-fill"
                                scale="1"
                                class="mr-1"
                            ></b-icon>
                            <label for="">Número de telefono</label>
                            <b-form-input
                                v-model="form.datos_contacto.numeroTelefono"
                                placeholder="+1 3004005000"
                            ></b-form-input>
                        </b-col>
                    </b-row>
                </div>
                <div class="datos-contacto">
                    <b-row class="mx-2">
                        <b-col>
                            <b-icon
                                icon="envelope-fill"
                                scale="1"
                                class="mr-1"
                            ></b-icon>
                            <label for="">Correo Electrónico</label>
                            <b-form-input
                                v-model="form.datos_contacto.correoElectronico"
                                placeholder="ejemplo@ejemplo.com"
                            ></b-form-input>
                        </b-col>
                    </b-row>
                </div>
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
import {estados} from '../db/estados';
import {municipios} from '../db/municipios';

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
                ubicacion: '',
                estado: '',
                municipio: '',
                codigoPostal: '',
                areaPlantaBaja: '',
                numeroNiveles: '',
                areaNivelTipo: '',
                numeroSotanos: '',
                areaSotano: '',
                accesibilidad: '',
                topografia: '',
                unicacion: '',
                datos_contacto: {
                    nombreCompleto: '',
                    numeroTelefono: '',
                    correoElectronico: '',
                },
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
                {id: 2, text: "Instalación hodrosanitaria", value: "instalacion_hidrosanitaria"},
                {id: 3, text: "Instalación Eléctrica", value: "instalacion_electrica"},
                {id: 4, text: "Aire acondicionado sin balance térmico", value: "arire_acondicionado_sin_balance_termico"},
                {id: 5, text: "Aire acondicionado con balance térmico", value: "arire_acondicionado_con_balance_termico"},
                {id: 6, text: "Ventilación y Extracción", value: "ventilacion_y_extraccion"},
                {id: 7, text: "Voz y Datos", value: "voz_y_datos"},
            ],
            accesibilidadOptions: [
                {id: 1, text: "Muy buena", value: "muy_buena"},
                {id: 2, text: "Buena", value: "buena"},
                {id: 3, text: "Normal", value: "normal"},
                {id: 4, text: "Dificil", value: "dificil"},
                {id: 5, text: "Muy dificil", value: "muy_dificil"},
            ],
            topografiaOptions: [
                {id: 1, text: "Plana", value: 'plana'},
                {id: 2, text: "Con desnivel minimo", value: 'desnivel_minimo'},
                {id: 3, text: "Con desnivel pronunciado", value: 'desnivel_pronunciado'},
                {id: 4, text: "Accidentada", value: 'accidentada'},
                {id: 5, text: "Muy accidentada", value: 'muy_accidentada'},
            ],
            ubicacionOptions: [
                {id: 1, text: "Entre colindancias", value: 'entre_colindancias'},
                {id: 2, text: "En esquina", value: 'en_esquina'},
                {id: 3, text: "Aislada", value: 'aislada'},
            ],
            estados: estados,
            municipiosSelected: [],
            municipios: municipios,
            sotanos: false,
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
        loadMunicipios(){
            this.form.municipio= null;
            this.municipiosSelected= [];

            this.municipios.map((estado)=> {
                for(let name in estado){
                    if(name == this.form.estado){
                        estado[name].map((municipio)=> {
                            this.municipiosSelected.push({"text": municipio, "value": municipio});
                        })
                    }
                }
            })

            console.log(this.municipiosSelected);

        },
        cleanFields(){
            this.form= {
                edificacion: null,
                proyectos_estudios: [],
            }
        },
        addTipoEdificacion(){
            console.log(this.form);
        },
        sotanosToggle(){
            this.sotanos= !this.sotanos;
        }
    },
    computed: {
        setDisabledMunicipiosSelect(){
            return this.form.estado ? false : true;
        }
    }
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

    .input-area-proyecto, .datos-contacto{
        width: 50%;
        margin-top: 15px;
    }

    .button-toggle{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 10px;
        margin-bottom: 10px;
    }

    .button{
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
    }

    .accesibilidad{
        width: 30%;
    }
</style>