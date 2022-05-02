<template>
    <div>
        <div class="container">
            <b-row class="form-content">
                <b-col>
                    <b-input placeholder="Email" v-model="email"></b-input>
                    <b-button class="mt-3" variant="info" @click="converterToAdmin()">Convertir Administrador</b-button>
                </b-col>
                <b-col></b-col>
            </b-row>
        </div>
    </div>
</template>

<script>
import { validateEmail } from '../../../utils/validations';


export default {
    data(){
        return{
            email: '',
        }
    },
    methods: {
        converterToAdmin(){
            if(!validateEmail(this.email)){
                console.log("Email invalido");
                return
            }

            console.log("va que va");
        }
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