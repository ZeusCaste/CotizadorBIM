<template>
  <div class="container px-4 py-3">
        <div>
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
                        v-model="edificacion.calle"
                    ></b-form-input>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-icon
                        icon="geo-alt-fill"
                        scale="1"
                        class="mr-1"
                    ></b-icon>
                    <label for="estado">Estado</label>
                    <b-form-select
                        id="estado"
                        v-model="edificacion.estado"
                        :options="estados"
                        @change="loadMunicipios()"
                    ></b-form-select>
                </b-col>
            </b-row>
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
                        v-model="edificacion.municipio"
                        :options="municipiosSelected"
                        :disabled="setDisabledMunicipiosSelect"
                    ></b-form-select>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-icon
                        icon="geo-alt-fill"
                        scale="1"
                        class="mr-1"
                    ></b-icon>
                    <label for="">Código Postal</label>
                    <b-form-input
                        v-model="edificacion.codigoPostal"
                    ></b-form-input>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-icon
                        icon="bounding-box"
                        scale="1"
                        class="mr-1"
                    ></b-icon>
                    <label for="">Área de planta baja (m2)</label>
                    <b-form-input
                        v-model="edificacion.areaPlantaBaja"
                        placeholder="Introduce are en m2"
                    ></b-form-input>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-icon
                        icon="bricks"
                        scale="1"
                        class="mr-1"
                    ></b-icon>
                    <label for="">Número de niveles tipo</label>
                    <b-form-input
                        v-model="edificacion.numeroNiveles"
                        placeholder="2"
                    ></b-form-input>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-icon
                        icon="bounding-box-circles"
                        scale="1"
                        class="mr-1"
                    ></b-icon>
                    <label for="">Área del nivel tipo (m2)</label>
                    <b-form-input
                        v-model="edificacion.areaNivelTipo"
                        placeholder="Introduce el area en m2"
                    ></b-form-input>
                </b-col>
            </b-row>
        </div>
        {{form}}
  </div>
</template>

<script>
import {estados} from '../../../db/estados';
import {municipios} from '../../../db/municipios';

export default {
    props: {
        edificacion: Object
    },
    created(){
        this.form = Object.assign(this.form, this.edificacion);
    },
    data(){
        return{
            estados: estados,
            municipiosSelected: [],
            municipios: municipios,
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
                // numeroSotanos: '',
                // areaSotano: '',
            }
        }
    },
    methods: {
        loadMunicipios(){
            this.edificacion.municipio= null;
            this.municipiosSelected= [{"text": "Selecciona tu municipio", "value": null}];

            this.municipios.map((estado)=> {
                for(let name in estado){
                    if(name == this.edificacion.estado){
                        estado[name].map((municipio)=> {
                            this.municipiosSelected.push({"text": municipio, "value": municipio});
                        })
                    }
                }
            })
        },        
    },
    computed: {
        setDisabledMunicipiosSelect(){
            return this.edificacion.estado ? false : true;
        }
    }
}
</script>

<style>

</style>