<template>
  <div class="conatiner w-50 px-4">
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
                        v-model="form.calle"
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
                        v-model="form.estado"
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
                        v-model="form.municipio"
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
                    <label for="">Codigo Postal</label>
                    <b-form-input
                        v-model="form.codigoPostal"
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
                        v-model="form.areaPlantaBaja"
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
                        v-model="form.numeroNiveles"
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
                        v-model="form.areaNivelTipo"
                        placeholder="Introduce el area en m2"
                    ></b-form-input>
                </b-col>
            </b-row>
        </div>
  </div>
</template>

<script>
import {estados} from '../../../db/estados';
import {municipios} from '../../../db/municipios';

export default {
    data(){
        return{
            estados: estados,
            municipiosSelected: [],
            municipios: municipios,
            form: {
                calle: '',
                estado: null,
                municipio: null,
                codigo_postal: '',
                areaPlantaBaja: '',
                numeroNiveles: '',
                areaNivelTipo: '',
            }
        }
    },
    methods: {
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
    },
    computed: {
        setDisabledMunicipiosSelect(){
            return this.form.estado ? false : true;
        }
    }
}
</script>

<style>

</style>