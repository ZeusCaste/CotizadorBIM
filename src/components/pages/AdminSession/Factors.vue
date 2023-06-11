<template>
    <div class="my-5">
        <div>
            <div class="row">
                <div class="col-12">
                    <p><strong> Factores Económicos </strong></p>
                </div>
                <div class="mb-3 col-xl-3 col-lg-4 col-md-4 col-12 col-sm-12">
                    <label class="sr-only" for="inline-form-input-FE">Factor Situación de la Empresa</label>
                    <b-form-input 
                        id="inline-form-input-FE"
                        v-model="form.economicFactors.companySituation"
                        aria-describedby="FE"
                        :readonly="!edit"
                    ></b-form-input>
                    <b-form-text id="FE"> Factor Situación de la Empresa </b-form-text>
                </div>
                <div class="mb-3 col-xl-3 col-lg-4 col-md-4 col-12 col-sm-12">
                    <label class="sr-only" for="inline-form-input-FM">Factor Mercado</label>
                    <b-form-input 
                        id="inline-form-input-FM" 
                        aria-describedby="FM"
                        v-model="form.economicFactors.market"
                        :readonly="!edit"
                    ></b-form-input>
                    <b-form-text id="FM"> Factor Mercado </b-form-text>
                </div>
                <div class="mb-3 col-xl-3 col-lg-4 col-md-4 col-12 col-sm-12">
                    <label class="sr-only" for="inline-form-input-FR">Factor Tabulador</label>
                    <b-form-input 
                        id="inline-form-input-FR" 
                        aria-describedby="FR"
                        v-model="form.economicFactors.tabularReduction"
                        :readonly="!edit"
                    ></b-form-input>
                    <b-form-text id="FR"> Factor Reducción Tabulador </b-form-text>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <p><strong> Factores Tiempos de Entrega</strong></p>
                </div>
                <div class="mb-3 col-xl-3 col-lg-4 col-md-4 col-12 col-sm-12">
                    <label class="sr-only" for="inline-form-input-FT">Factor Tabulador</label>
                    <b-form-input 
                        id="inline-form-input-FT" 
                        aria-describedby="FT"
                        v-model="form.deliveryTimeFactors.tabuladorFactor2"
                        :readonly="!edit"
                    ></b-form-input>
                    <b-form-text id="FT"> Factor Tabulador </b-form-text>
                </div>
                <div class="mb-3 col-xl-3 col-lg-4 col-md-4 col-12 col-sm-12">
                    <label class="sr-only" for="inline-form-input-FEE">Factor Eficencia de la Empresa</label>
                    <b-form-input 
                        id="inline-form-input-FEE" 
                        aria-describedby="FEE"
                        v-model="form.deliveryTimeFactors.efficiencyCompany"
                        :readonly="!edit"
                    ></b-form-input>
                    <b-form-text id="FEE"> Factor Eficencia de la Empresa </b-form-text>
                </div>
                <div class="mb-3 col-xl-3 col-lg-4 col-md-4 col-12 col-sm-12">
                    <label class="sr-only" for="inline-form-input-FC">Factor Carga de trabajo Empresa</label>
                    <b-form-input 
                        id="inline-form-input-FC" 
                        aria-describedby="FC"
                        v-model="form.deliveryTimeFactors.companyWorkLoad"
                        :readonly="!edit"
                    ></b-form-input>
                    <b-form-text id="FC"> Factor Carga de trabajo Empresa </b-form-text>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <p><strong> Factores de Comisión</strong></p>
                </div>
                <div class="mb-3 col-xl-3 col-lg-4 col-md-4 col-12 col-sm-12">
                    <label class="sr-only" for="inline-form-input-FCO">Factor Comisión</label>
                    <b-form-input 
                        id="inline-form-input-FCO" 
                        aria-describedby="FCO"
                        v-model="form.comissionFactors.comission"
                        :readonly="!edit"
                    ></b-form-input>
                    <b-form-text id="FCO"> Factor Comisión </b-form-text>
                </div>
                <div class="mb-3 col-xl-3 col-lg-4 col-md-4 col-12 col-sm-12">
                    <label class="sr-only" for="inline-form-input-FCC">Factor Comisión Coordinador</label>
                    <b-form-input 
                        id="inline-form-input-FCC" 
                        aria-describedby="FCC"
                        v-model="form.comissionFactors.coordinatorComission"
                        :readonly="!edit"
                    ></b-form-input>
                    <b-form-text id="FCC"> Factor Comisión Coordinador </b-form-text>
                </div>
            </div>
            <div>
                <b-button 
                    class="mt-3"
                    type="submit" 
                    variant="info"
                    @click="editingFactors()"
                    size="lg"
                >
                    {{ edit ? "Guardar" : "Editar" }}
                    <b-spinner v-if="spinner" variant="light"></b-spinner>
                </b-button>
            </div>
            <div class="my-3">
                <b-alert
                    :show="dismissCountDown"
                    dismissible
                    :variant="alertStyle"
                    @dismissed="dismissCountDown=0"
                    @dismiss-count-down="countDownChanged"
                >
                    {{ error ? error : success }}
                </b-alert>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from '../../../plugins/firebase';


export default {
    name: "Factors",
    created(){
        this.getFactors();
    },
    data(){
        return {
            edit: false,
            error: null,
            success: null,
            dismissCountDown: 0,
            spinner: false,
            user: {},
            form: {
                economicFactors: {
                    companySituation: 0,
                    market: 0,
                    tabularReduction: 0,
                },
                deliveryTimeFactors: {
                    companyWorkLoad: 0,
                    efficiencyCompany: 0,
                    tabuladorFactor2: 0,
                },
                comissionFactors: {
                    comission: 0,
                    coordinatorComission: 0,
                }
            }
        }
    },
    methods: {
        async getFactors(){
            try {
                const factorsRef= firebase.firestore().collection('factors').doc('bQS31BEEdF9n5HHatkB9');
                const factorsDoc= await factorsRef.get();
                this.form= Object.assign(this.form, factorsDoc.data());

            } catch (error) { console.log(error) }
        },
        async editingFactors(){
            this.edit= !this.edit;
            this.dismissCountDown= 0;
            this.error= null;
            this.success= null;

            if(!this.edit){
                this.spinner= true;
                try {
                    const editFactors= firebase.functions().httpsCallable('editFactors');
                    const response= await editFactors(this.form);
                    
                    if(response.data.success) {
                        this.dismissCountDown= 7;
                        this.success= response.data.msg;
                        await this.getFactors();
                    }
                    this.spinner= false;

                } catch (error) {
                    this.dismissCountDown= 7;
                    this.error= error.message;
                    this.edit= true;
                    this.spinner= false;
                }
            }        
        },
        countDownChanged(dismissCountDown){
            this.dismissCountDown = dismissCountDown;
        },
    },
    computed: {
        alertStyle(){
            return this.error !== null && this.success === null ? 'danger' : 'success'
        }
    },
}
</script>

<style>

</style>