<template>
  <b-modal
    ref="edificacion-nueva"
    size="lg"
    hide-footer
    hide-header
  >
    <div>

        <!-- Edificacion Nueva -->
        <div class="header">
            <b class="mt-1">
                <b-icon
                    icon="clipboard-plus"
                    scale="2.5"
                ></b-icon>
            </b>
            <b class="title">Edificación Nueva</b>
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
                <p class="font-weight-bold text-white ml-3 mt-2">Tipo de Edificación: </p>
            </div>
            <div class="subSeccion">
                <div class="w-50">
                    <div class="build">
                        <b-icon
                            icon="check-circle"
                            scale="1.5"
                        ></b-icon>
                        <p class="ml-3 mt-3 font-weight-bold">Edificación</p>
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
                    :disabled="form.proyectos_estudios.length == 0 || form.edificacion == null"
                    @click="addTipoEdificacion()"
                >Agregar</b-button>
                <b-button 
                    variant="danger"
                    :disabled="form.proyectos_estudios.length == 0 && form.edificacion == null"
                    @click="cleanFields()"
                >Limpiar Campos</b-button>
            </div>
            <div class="text-center my-4">
                <b-form-checkbox
                    v-model="edificacionesIndependientes"
                    value="true"
                    unchecked-value="false"
                >Utilizar valores independientes para cada edificación (Área de nivel y direcciones)</b-form-checkbox>
            </div>
        </div>

        <!-- Datos del Proyecto -->
        <div>
            <div class="seccion bg-info">
                <b-icon
                    icon="clipboard-data"
                    variant="white"
                    font-scale="2.5"
                ></b-icon>
                <p class="font-weight-bold text-white ml-3 mt-2">Datos del Proyecto: </p>
            </div>
            <div class="my-3">
                <b-row v-if="edificacionesIndependientes == 'true'">
                    <b-col cols="4">
                        <b-navbar v-b-scrollspy:scrollspy-nested class="flex-column">
                            <b>Edificaciones agregadas</b>
                            <b-nav pills vertical>
                                <template v-for="(edificacion, index) in edificacionNueva.edificaciones">
                                    <b-nav-item :key="index" :href="sethref(index)"  class="btn btn-outline-primary mt-1">Edificación # {{index+1}}</b-nav-item>
                                </template>
                            </b-nav>
                        </b-navbar>
                    </b-col>
                    <b-col cols="8">
                        <div id="scrollspy-nested" style="position:relative; height:500px; overflow-y:auto">
                            <div 
                                v-for="(edificacion, index) in edificacionNueva.edificaciones" 
                                :key="index" 
                                class="edificacion-independiente" 
                                :id="setIdHref(index)"
                            >
                                <div class="info-edificacion">
                                    <div class="row">
                                        <b-button 
                                            class="delete-button" 
                                            variant="danger" 
                                            size="sm"
                                            @click="deleteEdificacion(index)"
                                        >
                                            <b-icon icon="trash" variant="white"></b-icon>
                                        </b-button>
                                        <h6 class="text-center text-white">Edificación # {{index + 1}}</h6>
                                    </div>
                                    <p><b>Edificacion: </b>{{edificacion.edificacion}}</p>
                                    <p><b>Proyectos y/o estudios: </b>{{edificacion.proyectos_estudios.join(', ')}}.</p>
                                </div>
                                <EdificacionIndependiente
                                    class="component"
                                    :edificacion="edificacion"
                                    :idx="index"
                                />
                            </div>
                        </div>
                    </b-col>
                </b-row>
                <div v-if="edificacionesIndependientes == 'false'" class="d-flex row">
                    <div v-for="(edificacion, index) in edificacionNueva.edificaciones" :key="index" class="edificacion-no-independiente">
                        <div class="info-edificacion">
                            <div class="row">
                                <b-button 
                                    class="delete-button dependiente" 
                                    variant="danger" 
                                    size="sm"
                                    @click="deleteEdificacion(index)"
                                >
                                    <b-icon icon="trash" variant="white"></b-icon>
                                </b-button>
                                <h6 class="text-center text-white">Edificación # {{index + 1}}</h6>
                            </div>
                            <p><b>Edificacion: </b>{{edificacion.edificacion}}</p>
                            <p><b>Proyectos y/o estudios: </b>{{edificacion.proyectos_estudios.join(', ')}}.</p>
                        </div>
                    </div>
                </div>
                <div v-if="edificacionesIndependientes == 'false'" class="container build m-3">
                    <div class="w-50">
                        <b-row>
                            <b-col>
                                <b-icon
                                    icon="geo-alt-fill"
                                    scale="1"
                                    class="mr-1"
                                ></b-icon>
                                <label>Ubicación del proyecto</label>
                                <b-form-input 
                                    placeholder="Calle 6 No. 517, Colonia Pascal"
                                    v-model="form.calle"
                                ></b-form-input>
                            </b-col>
                        </b-row>
                    </div>
                    <div class="w-50">
                        <b-row class="mx-1">
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
                <div v-if="edificacionesIndependientes == 'false'" class="container build m-3">
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
                                    id="municipio"
                                    v-model="form.municipio"
                                    :options="municipiosSelected"
                                    :disabled="setDisabledMunicipiosSelect"
                                ></b-form-select>
                            </b-col>
                        </b-row>
                    </div>
                    <div class="w-50">
                        <b-row class="mx-1">
                            <b-col>
                                <b-icon
                                    icon="geo-alt-fill"
                                    scale="1"
                                    class="mr-1"
                                ></b-icon>
                                <label for="">Código Postal</label>
                                <b-form-input
                                    v-model="form.codigoPostal"
                                ></b-form-input>
                            </b-col>
                        </b-row>
                    </div>
                </div>
                <div v-if="edificacionesIndependientes == 'false'" class="button-toggle">
                    <b-button 
                        variant="dark"
                        size="md"
                        class="w-50 button"
                    >
                        <b-icon icon="columns-gap"></b-icon>
                        Areas del Proyecto
                    </b-button>
                </div>
                <div v-if="edificacionesIndependientes == 'false'" class="container build my-3">
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
                                    placeholder="Introduce la área en m2"
                                ></b-form-input>
                            </b-col>
                        </b-row>
                    </div>
                    <div class="input-area-proyecto">
                        <b-row class="mx-1">
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
                        <b-row class="mx-1">
                            <b-col>
                                <b-icon
                                    icon="bounding-box-circles"
                                    scale="1"
                                    class="mr-1"
                                ></b-icon>
                                <label for="">Área del nivel tipo (m2)</label>
                                <b-form-input
                                    v-model="form.areaNivelTipo"
                                    placeholder="Introduce la área en m2"
                                ></b-form-input>
                            </b-col>
                        </b-row>
                    </div>
                </div>
                <div v-if="edificacionesIndependientes == 'false'" class="button-toggle mt-5">
                    <b-button 
                        variant="dark"
                        size="md"
                        class="w-50 button"
                        @click="sotanosToggle()"
                    >
                        <!-- <b-icon icon="grid-1x2"></b-icon> -->
                        Sotanos
                        <b-icon :icon="form.sotanos.status ? 'caret-up-square' : 'caret-down-square'" animation="throb"></b-icon>
                    </b-button>
                </div>
                <div class="build mb-5" v-if="form.sotanos.status && edificacionesIndependientes == 'false'">
                    <div class="input-area-proyecto">
                        <b-row class="mx-1">
                            <b-col>
                                <b-icon
                                    icon="bricks"
                                    scale="1"
                                ></b-icon>
                                <label for="">Número de sotanos</label>
                                <b-form-input
                                    v-model="form.sotanos.data.numeroSotanos"
                                    placeholder="2"
                                ></b-form-input>
                            </b-col>
                        </b-row>
                    </div>
                    <div class="input-area-proyecto">
                        <b-row class="mx-1">
                            <b-col>
                                <b-icon
                                    icon="bounding-box-circles"
                                    scale="1"
                                ></b-icon>
                                <label for="">Área de sotano (m2)</label>
                                <b-form-input
                                    v-model="form.sotanos.data.areaSotano"
                                    placeholder="Introduce el area en m2"
                                ></b-form-input>
                            </b-col>
                        </b-row>
                    </div>
                </div>
                <div v-if="edificacionesIndependientes == 'false'" class="w-100 row my-5 d-flex justify-content-around">
                    <div class="accesibilidad">
                        <div class="row d-flex justify-content-center">
                            <b-icon icon="app-indicator" class="mt-1 mr-2"></b-icon>
                            <p class="font-weight-bold">Accesibilidad</p>
                        </div>
                        <div class="radio-Container py-1 d-flex justify-content-center">
                            <b-form-group v-slot="{ ariaDescribedby }">
                                <b-form-radio-group
                                    id="radio-group-accesibilidad"
                                    v-model="form.accesibilidad"
                                    :options="accesibilidadOptions"
                                    name="accesibilidad"
                                    stacked
                                    :aria-describedby="ariaDescribedby"
                                ></b-form-radio-group>
                            </b-form-group>
                        </div>
                    </div>
                    <div class="accesibilidad">
                        <div class="row d-flex justify-content-center">
                            <b-icon icon="image-fill" class="mt-1 mr-2"></b-icon>
                            <p class="font-weight-bold">Topografía</p>
                        </div>
                        <div class="radio-Container py-1 d-flex justify-content-center">
                            <b-form-group v-slot="{ ariaDescribedby }">
                                <b-form-radio-group
                                    id="radio-group-topografia"
                                    v-model="form.topografia"
                                    :options="topografiaOptions"
                                    name="topografia"
                                    stacked
                                    :aria-describedby="ariaDescribedby"
                                ></b-form-radio-group>
                            </b-form-group>
                        </div>
                    </div>
                    <div class="accesibilidad">
                        <div class="row d-flex justify-content-center">
                            <b-icon icon="geo-fill" class="mt-1 mr-2"></b-icon>
                            <p class="font-weight-bold">Ubicación</p>
                        </div>
                        <div class="radio-Container py-1 d-flex justify-content-center">
                            <b-form-group v-slot="{ ariaDescribedby }">
                                <b-form-radio-group
                                    id="radio-group-ubicacion"
                                    v-model="form.ubicacion"
                                    :options="ubicacionOptions"
                                    name="ubicacion"
                                    stacked
                                    :aria-describedby="ariaDescribedby"
                                ></b-form-radio-group>
                            </b-form-group>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Datos de Contacto -->
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
            <div class="mt-3">
                <div class="datos-contacto m-auto">
                    <b-row class="mb-4">
                        <b-col>
                            <b-icon
                                icon="person-bounding-box"
                                scale="1"
                                class="mr-1"
                            ></b-icon>
                            <label for="">Nombre completo</label>
                            <b-form-input
                                v-model="edificacionNueva.datos_contacto.nombreCompleto"
                                placeholder="Francisco Martinez Del Campo"
                            ></b-form-input>
                        </b-col>
                    </b-row>
                </div>
                <div class="datos-contacto m-auto">
                    <b-row class="mb-4">
                        <b-col>
                            <b-icon
                                icon="phone-fill"
                                scale="1"
                            ></b-icon>
                            <label for="">Número de teléfono</label>
                            <b-form-input
                                v-model="edificacionNueva.datos_contacto.numeroTelefono"
                                placeholder="+1 3004005000"
                            ></b-form-input>
                        </b-col>
                    </b-row>
                </div>
                <div class="datos-contacto m-auto">
                    <b-row class="mb-4">
                        <b-col>
                            <b-icon
                                icon="envelope-fill"
                                scale="1"
                                class="mr-1"
                            ></b-icon>
                            <label for="">Correo Electrónico</label>
                            <b-form-input
                                v-model="edificacionNueva.datos_contacto.correoElectronico"
                                placeholder="ejemplo@ejemplo.com"
                            ></b-form-input>
                        </b-col>
                    </b-row>
                </div>
            </div>
        </div>
        <div v-if="errores.length > 0">
            <div v-for="(error, index) in errores" :key="index">
                <b-alert show variant="danger"> Edificacion #{{error.number}}. {{error.description}}</b-alert>
            </div>
        </div>
        <div class="footer">
            <b-button
                size="lg"
                variant="dark"
                block
                style="height: 80px;"
                @click="iniciarCotizacion()"
            >
                <b v-if="!spinner" class="h1">COTIZAR</b>
                <b-spinner 
                    v-if="spinner"
                    style="width: 3rem; height: 3rem;" 
                    label="Large Spinner" 
                    type="grow"
                ></b-spinner>
            </b-button>
        </div>
    </div>
  </b-modal>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import firebase from '../../../plugins/firebase';
import {estados} from '../../../db/estados';
import {municipios} from '../../../db/municipios';
import EdificacionIndependiente from './EdificacionIndependiente.vue';
import {validateEmail, validateTelNumber} from '../../../utils/validations';
import {edificacionNueva} from '../../../db/edificacioNueva';


export default {
    name: 'EdificacionNueva',
    components: {
        EdificacionIndependiente
    },
    created(){
        this.eventHub.$on('create', this.onCreateCotizacion);
    },
    data(){
        return{
            edificacionesIndependientes: "false",
            spinner: false,
            form: {
                edificacion: null,
                proyectos_estudios: [],
                calle: '',
                estado: null,
                municipio: null,
                codigoPostal: '',
                areaPlantaBaja: '',
                numeroNiveles: '',
                areaNivelTipo: '',
                sotanos: {
                    status: false,
                    data: {
                        numeroSotanos: '',
                        areaSotano: '',
                    }
                },
                ubicacion: null,
                accesibilidad: null,
                topografia: null,
            },
            edificacionNueva: {
                edificaciones: [],
                datos_contacto: {
                    nombreCompleto: '',
                    numeroTelefono: '',
                    correoElectronico: '',
                },

            },
            estados: estados,
            municipiosSelected: [],
            municipios: municipios,
            errores: [],
        }
    },
    methods: {
        ...mapActions(['getDataCotizacionNuevaEdificacion']),
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
            this.municipiosSelected= [{"text": "Selecciona tu municipio", "value": null}];

            this.municipios.map((estado)=> {
                for(let name in estado){
                    if(name == this.form.estado){
                        estado[name].map((municipio)=> {
                            this.municipiosSelected.push({"text": municipio, "value": municipio});
                        })
                    }
                }
            })
        },
        cleanFields(){
            this.edificacionesIndependientes= "false";
            this.form= {
                edificacion: null,
                proyectos_estudios: [],
                calle: '',
                estado: '',
                municipio: '',
                codigoPostal: '',
                areaPlantaBaja: '',
                numeroNiveles: '',
                areaNivelTipo: '',
                sotanos: {
                    status: false,
                    data: {
                        numeroSotanos: '',
                        areaSotano: '',
                    }
                },
                ubicacion: null,
                accesibilidad: null,
                topografia: null,
                edificaciones: [],
                datos_contacto: {
                    nombreCompleto: '',
                    numeroTelefono: '',
                    correoElectronico: '',
                },
            };
        },
        addTipoEdificacion(){
            this.edificacionNueva.edificaciones.push({
                edificacion: this.form.edificacion,
                proyectos_estudios: this.form.proyectos_estudios,
                calle: '',
                estado: null,
                municipio: null,
                codigoPostal: '',
                areaPlantaBaja: '',
                numeroNiveles: '',
                areaNivelTipo: '',
                sotanos: {
                    status: false,
                    data: {
                        numeroSotanos: '',
                        areaSotano: '',
                    }
                },
                ubicacion: null,
                accesibilidad: null,
                topografia: null,
            });

            this.form.edificacion= null;
            this.form.proyectos_estudios= [];

        },
        sotanosToggle(){
            this.form.sotanos.status= !this.form.sotanos.status;

            if(!this.form.sotanos.status){
                this.form.sotanos.data.numeroSotanos= '';
                this.form.sotanos.data.areaSotano= '';
            }
        },
        deleteEdificacion(position){
            this.edificacionNueva.edificaciones= this.edificacionNueva.edificaciones.filter((edificacion, index)=> (
                index !== position
            ))
        },
        async iniciarCotizacion(){
            this.spinner= true;
            this.errores= [];

            if(this.edificacionesIndependientes == "false"){
                this.edificacionNueva.edificaciones.forEach((edificacion)=> {
                    edificacion.calle= this.form.calle;
                    edificacion.estado= this.form.estado;
                    edificacion.municipio= this.form.municipio;
                    edificacion.codigoPostal= this.form.codigoPostal;
                    edificacion.areaPlantaBaja= this.form.areaPlantaBaja;
                    edificacion.numeroNiveles= this.form.numeroNiveles;
                    edificacion.areaNivelTipo= this.form.areaNivelTipo;
                    edificacion.sotanos= this.form.sotanos;
                    edificacion.accesibilidad= this.form.accesibilidad;
                    edificacion.ubicacion= this.form.ubicacion;
                    edificacion.topografia= this.form.topografia;
                });
            }
            
             this.validaciones();
             if(this.errores.length > 0) {
                 this.spinner= false;
                 return
             }

            try {
                await this.getDataCotizacionNuevaEdificacion(this.edificacionNueva);
                //await this.getDataCotizacionNuevaEdificacion(edificacionNueva);
                this.spinner= false;
                this.hideModal();

            } catch (error) {
                console.log(error.message);
            }
        },
        sethref(idx){
            return `#edificacion${idx}`
        },
        setIdHref(idx){
            return `edificacion${idx}`
        },
        scrollIntoView(event) {
            event.preventDefault()
            const href = event.target.getAttribute('href')
            const el = href ? document.querySelector(href) : null
            if (el) {
            this.$refs.content.scrollTop = el.offsetTop
            }
        },
        validaciones(){
            //Validar que se haya agregado alguna edificacion
            if(this.edificacionNueva.edificaciones.length == 0){
                this.errores.push({
                    number: "General",
                    description: "Agrega edificaciones para realizar la cotización"
                });

                return
            }

            //Validaciones de los datos de las edificaciones
            this.edificacionNueva.edificaciones.forEach((edificacion, index)=> {
                
                //Validacion del campo ubicacion del proyecto
                if(!edificacion.calle.trim()){
                    this.errores.push({
                        number: index+1,
                        description: "Ingresa la Ubicación del proyecto",
                    });
                }

                //Validacion del campo estado
                if(edificacion.estado == null){
                    this.errores.push({
                        number: index+1,
                        description: "Selecciona el estado de ubicación.",
                    });
                }

                //Validacion del campo municipio
                if(edificacion.municipio == null){
                    this.errores.push({
                        number: index+1,
                        description: "Selecciona la ciudad o municipio de ubicación.",
                    })
                }

                //validacion del campo codigo postal
                if(!edificacion.codigoPostal.trim() || edificacion.codigoPostal.length !== 5){
                    let err= {
                        number: index+1,
                    };

                    if(!edificacion.codigoPostal.trim()){
                        err.description= "El campo Código Postal no puede estar vacío";
                        this.errores.push(err);
                    }
                    else if(edificacion.codigoPostal.length !== 5){
                        err.description= "Ingresa un código postal válido";
                        this.errores.push(err);
                    }
                }


                //Validacion del campo area de planta baja
                if(isNaN(edificacion.areaPlantaBaja) || !edificacion.areaPlantaBaja.trim()){
                    let err= {
                        number: index + 1
                    };

                    if(!edificacion.areaPlantaBaja.trim()){
                        err.description= "El campo Área de planta baja no puede estar vacío";
                        this.errores.push(err);
                    }

                    else if(isNaN(edificacion.areaPlantaBaja)){
                        err.description= "El campo Área de planta baja debe tener un valor numérico";
                        this.errores.push(err);
                    }
                }

                //Validacion del campo numero de niveles tipo
                if(isNaN(edificacion.numeroNiveles) || !edificacion.numeroNiveles.trim()){
                    let err= {
                        number: index + 1
                    };

                    if(!edificacion.numeroNiveles.trim()){
                        err.description= "El campo Número de niveles tipo no puede estar vacío";
                        this.errores.push(err);
                    }
                    else if(isNaN(edificacion.numeroNiveles)){
                        err.description= "El campo Número de niveles tipo debe tener un valor numérico";
                        this.errores.push(err);
                    }
                }

                //Validacion del campo area del nivel tipo
                if(isNaN(edificacion.areaNivelTipo) || !edificacion.areaNivelTipo.trim()){
                    let err= {
                        number: index + 1
                    };

                    if(!edificacion.areaNivelTipo.trim()){
                        err.description= "El campo Área del nivel tipo no puede estar vacío";
                        this.errores.push(err);
                    }
                    else if(isNaN(edificacion.areaNivelTipo)){
                        err.description= "El campo Área del nivel tipo debe tener un valor numérico";
                        this.errores.push(err);
                    }
                }

                //validacion de los campos relacionados a los sotanos
                if(edificacion.sotanos.status){
                    if(isNaN(edificacion.sotanos.data.numeroSotanos) || !edificacion.sotanos.data.numeroSotanos.trim()){
                        let err= {
                            number: index + 1
                        };

                        if(!edificacion.sotanos.data.numeroSotanos.trim()){
                            err.description= "El campo Número de sotanos no puede estar vacío";
                            this.errores.push(err);
                        }
                        else if(isNaN(edificacion.sotanos.data.numeroSotanos)){
                            err.description= "El campo Número de sotanos debe tener un valor numérico";
                            this.errores.push(err);
                        }
                    }


                    if(isNaN(edificacion.sotanos.data.areaSotano) || !edificacion.sotanos.data.areaSotano.trim()){
                        let err= {
                            number: index + 1
                        };

                        if(!edificacion.sotanos.data.areaSotano.trim()){
                            err.description= "El campo Área de sotano no puede estar vacío";
                            this.errores.push(err);
                        }
                        else if(isNaN(edificacion.sotanos.data.areaSotano)){
                            err.description= "El campo Área de sotano debe tener un valor numérico";
                            this.errores.push(err);
                        }
                    }
                }


                //validacion para accesibilidad
                if(edificacion.accesibilidad == null){
                    this.errores.push({
                        number: index + 1,
                        description: "Selecciona la Accesibilidad de la edificación"
                    });
                }

                //validacion para topografia
                if(edificacion.topografia == null){
                    this.errores.push({
                        number: index + 1,
                        description: "Selecciona la Topografía de la edificación"
                    });
                }

                //validacion para ubicacion
                if(edificacion.ubicacion == null){
                    this.errores.push({
                        number: index + 1,
                        description: "Selecciona la Ubicación de la edificación"
                    });
                }
            });

            //validacion de datos de contacto
            const {nombreCompleto, numeroTelefono, correoElectronico}= this.edificacionNueva.datos_contacto;
            if(!nombreCompleto.trim()){
                this.errores.push({
                    number: "General",
                    description: "Ingresa tu nombre completo"
                });
            }

            if(!numeroTelefono.trim() || !validateTelNumber(numeroTelefono)){
                if(!numeroTelefono.trim()){
                    this.errores.push({
                        number: "General",
                        description: "Ingresa un número telefónico"
                    });
                }
                else if(isNaN(numeroTelefono)){
                    this.errores.push({
                        number: "General",
                        description: "Ingresa un número telefónico válido"
                    });
                }
            }

            if(!correoElectronico.trim() || !validateEmail(correoElectronico)){
                if(!correoElectronico.trim()){
                    this.errores.push({
                        number: "General",
                        description: "Ingresa tu correo eléctronico"
                    });
                }
                else if(!validateEmail(correoElectronico)){
                    this.errores.push({
                        number: "General",
                        description: "Ingresa un correo eléctronico válido"
                    });
                }
            }
        }
    },
    computed: {
        //obtener datos estaticos del formulario desde vuex 
        ...mapState(['edificacionOptions', 'proyectos_estudiosOptions', 'accesibilidadOptions', 'topografiaOptions', 'ubicacionOptions']),
        
        //Habilitar o deshabilitar select de municipios
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

    .info-edificacion{
        margin: 15px;
        padding: 15px;
        background-color: #07b3d9  ;
        border-radius: 15px;
    }

    .edificacion-independiente{
        border-width: 5px;
        border: solid #07b3d9    2px;
        margin: 10px auto;
        width: 90%;
        border-radius: 10px;
    }

    .edificacion-no-independiente{
        border-width: 5px;
        border: solid #07b3d9    2px;
        margin: 1.5% 2.5%;
        width: 45%;
        border-radius: 10px;
    }

    .delete-button{
        position: relative;
        left: 355px;
        bottom: 5px;
    }

    .delete-button.dependiente{
        position: relative;
        left: 275px;
        bottom: 5px;
    }

    .card-edificaciones {
        position:relative; 
        height: 1340px; 
        width: 65%; 
        overflow-y:scroll; 
        margin: 0 auto; 
        background-color: #B2F0FE;
        padding-bottom: 15px;
    }
</style>