<template>
    <div>
        <div class="row">
            <div class="col-11 col-sm-11 col-md-6 col-lg-5 col-xl-5 mx-auto">
                <b-form-group class="text-dark text-left mt-3" label="Calle" label-for="street">
                    <b-row>
                        <b-icon class="ml-3" icon="house" font-scale="2"></b-icon>
                        <b-col>
                            <b-form-input v-model="address.street" id="street" type="text" placeholder="Calle" />
                        </b-col>
                    </b-row>
                </b-form-group>
            </div>
    
            <div class="col-11 col-sm-11 col-md-6 col-lg-5 col-xl-5 mx-auto">
                <b-form-group class="text-dark text-left mt-3" id="extNumber" label="Numero Exterior" label-for="extNumber">
                    <b-row>
                        <b-icon class="ml-3" icon="geo-alt-fill" font-scale="2"></b-icon>
                        <b-col>
                            <b-form-input v-model="address.extNumber" id="extNumber" type="text" placeholder="Número Interior" />
                        </b-col>
                    </b-row>
                </b-form-group>
            </div>
    
            <div class="col-11 col-sm-11 col-md-6 col-lg-5 col-xl-5 mx-auto">
                <b-form-group class="text-dark text-left mt-3" id="intNumber" label="Numero Interior" label-for="intNumber">
                    <b-row>
                        <b-icon class="ml-3" icon="geo-alt-fill" font-scale="2"></b-icon>
                        <b-col>
                            <b-form-input v-model="address.intNumber" id="intNumber" type="text" placeholder="Número Interior" />
                        </b-col>
                    </b-row>
                </b-form-group>
            </div>
    
            <div class="col-11 col-sm-11 col-md-6 col-lg-5 col-xl-5 mx-auto">
                <b-form-group class="text-dark text-left mt-3" id="state" label="Estado" label-for="state">
                    <b-row>
                        <b-icon class="ml-3" icon="geo-fill" font-scale="2"></b-icon>
                        <b-col>
                            <b-form-select 
                                v-model="address.state" 
                                :options="stateOptions" 
                                id="state"
                                @change="toActivateDelegations"
                            ></b-form-select>
                        </b-col>
                    </b-row>
                </b-form-group>
            </div>
    
            <div class="col-11 col-sm-11 col-md-6 col-lg-5 col-xl-5 mx-auto">
                <b-form-group class="text-dark text-left mt-3" id="delegation" label="Delegacion o Municipio" label-for="delegation">
                    <b-row>
                        <b-icon class="ml-3" icon="geo-fill" font-scale="2"></b-icon>
                        <b-col>
                            <b-form-select v-model="address.delegation" :options="delegationOptions" id="delegation" ></b-form-select>
                        </b-col>
                    </b-row>
                </b-form-group>
            </div>
            
            <div class="col-11 col-sm-11 col-md-6 col-lg-5 col-xl-5 mx-auto">
                <b-form-group class="text-dark text-left mt-3" id="neighborhood" label="Colonia" label-for="neighborhood">
                    <b-row>
                        <b-icon class="ml-3" icon="geo-fill" font-scale="2"></b-icon>
                        <b-col>
                            <b-form-input v-model="address.neighborhood" id="neighborhood" type="text" placeholder="Colonia" />
                        </b-col>
                    </b-row>
                </b-form-group>
            </div>
    
            <div class="col-11 col-sm-11 col-md-6 col-lg-5 col-xl-5 mx-auto">
                <b-form-group class="text-dark text-left mt-3" id="city" label="Ciudad" label-for="city">
                    <b-row>
                        <b-icon class="ml-3" icon="geo-fill" font-scale="2"></b-icon>
                        <b-col>
                            <b-form-input v-model="address.city" id="city" type="text" placeholder="Ciudad" />
                        </b-col>
                    </b-row>
                </b-form-group>
            </div>
    
            <div class="col-11 col-sm-11 col-md-6 col-lg-5 col-xl-5 mx-auto">
                <b-form-group class="text-dark text-left mt-3" id="cp" label="Codigo Postal" label-for="cp">
                    <b-row>
                        <b-icon class="ml-3" icon="geo-fill" font-scale="2"></b-icon>
                        <b-col>
                            <b-form-input 
                                id="cp" 
                                v-model="address.cp" 
                                type="tel" 
                                placeholder="Código Postal"
                                :formatter="formatCP"
                            />
                        </b-col>
                    </b-row>
                </b-form-group>
            </div>
        </div>
    </div>
</template>

<script>
import { estados } from '../../../db/estados.js';
import { municipios } from '../../../db/municipios.js';

export default {
    name: 'AddressEdition',
    data() {
        return {
            address: null,
            stateOptions: estados,
            delegationOptions: municipios,
        }
    },
    created() {
        this.address = {
            street: '',
            extNumber: '',
            intNumber: '',
            state: '',
            delegation: '',
            neighborhood: '',
            city: '',
            cp: '',
        }
    },
    methods: {
        formatCP(evt) { return String(evt).substring(0, 5) },
        toActivateDelegations() {
            this.delegationOptions = [{ 'value': '', 'text': "Selecciona una opción" }];

            municipios.forEach((state) => {
                for(let name in state) {
                    if(name === this.address.state) this.delegationOptions = [ ...this.delegationOptions, ...state[this.address.state] ];
                }
            });
        },
    }
}
</script>

<style>

</style>