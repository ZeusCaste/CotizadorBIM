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
            <div class="my-5">
                <div class="text-center">
                    <b-form-checkbox
                        v-model="sotanos"
                        value="true"
                        unchecked-value="false"
                    >Sotanos</b-form-checkbox>
                </div>
                <div v-if="sotanos === 'true'">
                    <b-row>
                        <b-col>
                            <b-icon
                                icon="bricks"
                                scale="1"
                            ></b-icon>
                            <label for="">Número de sotanos</label>
                            <b-form-input
                                v-model="edificacion.numeroSotanos"
                                placeholder="2"
                            ></b-form-input>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col>
                            <b-icon
                                icon="bounding-box-circles"
                                scale="1"
                            ></b-icon>
                            <label for="">Área de sotano (m2)</label>
                            <b-form-input
                                v-model="edificacion.areaSotano"
                                placeholder="Introduce el area en m2"
                            ></b-form-input>
                        </b-col>
                    </b-row>
                </div>
            </div>
            <div>
                <div class="row d-flex justify-content-center">
                    <b-icon icon="app-indicator" class="mt-1 mr-2"></b-icon>
                    <p class="font-weight-bold">Accesibilidad</p>
                </div>
                <b-row>
                    <b-col>
                        <b-form-group v-slot="{ ariaDescribedby }">
                            <b-form-radio-group
                                id="radio-group-accesibilidad"
                                v-model="edificacion.accesibilidad"
                                :options="accesibilidadOptions"
                                name="accesibilidad"
                                stacked
                                :aria-describedby="ariaDescribedby"
                            ></b-form-radio-group>
                        </b-form-group>
                    </b-col>
                </b-row>
            </div>
            <div>
                <div class="row d-flex justify-content-center">
                    <b-icon icon="image-fill" class="mt-1 mr-2"></b-icon>
                    <p class="font-weight-bold">Topografía</p>
                </div>
                <b-row>
                    <b-col>
                        <b-form-group v-slot="{ ariaDescribedby }">
                            <b-form-radio-group
                                id="radio-group-topografia"
                                v-model="edificacion.topografia"
                                :options="topografiaOptions"
                                name="topografia"
                                stacked
                                :aria-describedby="ariaDescribedby"
                            ></b-form-radio-group>
                        </b-form-group>
                    </b-col>
                </b-row>
            </div>
            <div>
                <div class="row d-flex justify-content-center">
                    <b-icon icon="geo-fill" class="mt-1 mr-2"></b-icon>
                    <p class="font-weight-bold">Ubicación</p>
                </div>
                <b-row>
                    <b-col>
                        <b-form-group v-slot="{ ariaDescribedby }">
                            <b-form-radio-group
                                id="radio-group-ubicacion"
                                v-model="edificacion.ubicacion"
                                :options="ubicacionOptions"
                                name="ubicacion"
                                stacked
                                :aria-describedby="ariaDescribedby"
                            ></b-form-radio-group>
                        </b-form-group>
                    </b-col>
                </b-row>
            </div>
        </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import {estados} from '../../../db/estados';
import {municipios} from '../../../db/municipios';

export default {
    props: {
        edificacion: Object
    },
    data(){
        return{
            estados: estados,
            municipiosSelected: [],
            municipios: municipios,
            sotanos: "false",
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
        ...mapState(['accesibilidadOptions', 'topografiaOptions', 'ubicacionOptions']),
        setDisabledMunicipiosSelect(){
            return this.edificacion.estado ? false : true;
        }
    }
}
</script>

<style>

</style>