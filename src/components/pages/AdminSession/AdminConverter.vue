<template>
    <div>
        <div class="container">
            <b-row class="form-content">
                <b-col>
                    <b-input placeholder="Email" v-model="email"></b-input>
                    <b-button class="mt-3" variant="info" @click="converterToAdmin()">
                        Convertir Administrador
                        <b-spinner small v-if="spinner" label="Spinning"></b-spinner>
                    </b-button>
                </b-col>
                <b-col></b-col>
            </b-row>
            <b-row class="ml-4">
                <b-alert 
                    :show="dismissCountDown"
                    dismissible
                    :variant="success ? 'success' : 'danger'"
                    @dismissed="dismissCountDown=0"
                    @dismiss-count-down="countDownChanged"
                >
                    {{ responseMessage }}
                </b-alert>
            </b-row>
        </div>
    </div>
</template>

<script>
import firebase from '../../../plugins/firebase';
import { validateEmail } from '../../../utils/validations';


export default {
    data(){
        return{
            email: '',
            dismissSecs: 5,
            dismissCountDown: 0,
            success: '',
            responseMessage: '',
            spinner: false,
        }
    },
    methods: {
        async converterToAdmin(){
            this.spinner= true;
            this.error= '';

            if(!validateEmail(this.email)){
                console.log("Email invalido");
                this.success= false;
                this.responseMessage= "Formato de correo electrónico invalido";
                this.dismissCountDown = this.dismissSecs;
                this.spinner= false;
                return
            }

            try {
                const createAdminUser= firebase.functions().httpsCallable('createAdminUser');
                const response= await createAdminUser({ 'email': this.email, 'name': 'el maquino' });
                this.success= true;
                this.responseMessage= response.data.message;
                this.dismissCountDown = this.dismissSecs;
                this.spinner= false;
            } catch (error) {
                this.success= false;
                this.responseMessage= error;
                this.dismissCountDown = this.dismissSecs;
                this.spinner= false;
            }
        },
        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown
        },
    }
}
</script>

<style lang="scss" scoped>
    .form-content{
        border: 2px solid;
        border-color: rgb(252, 167, 41);
        margin: 20px 25px;
        padding: 20px 15px;
        border-radius: 5px;
    }
</style>