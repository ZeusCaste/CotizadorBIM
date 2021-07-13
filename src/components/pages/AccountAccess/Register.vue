<template>
    <div>
        <div v-if="!mood" class="all-registers container px-5 mb-5">
            <p class="display-4 font-weight-bold text-dark mt-1 text-center mt-4">Únete a BIMTECH</p>
            <h4 class="mt-5">Selecciona una forma de registro </h4>
            <div class="my-4 text-center d-flex flex-column">
                <b-button variant="primary" class="my-2" @click="signUpWithFacebook()">
                    <b-icon icon="facebook" class="mx-2"></b-icon>
                    Continuar con Facebook
                </b-button>
                <b-button variant="danger" class="my-2" @click="signUpWithGoogle()">
                    <b-icon icon="google" class="mx-2"></b-icon>
                    Continuar con Google
                </b-button>
                <b-button variant="info" class="my-2" @click="toEmailPasswordRegister()">
                    <b-icon icon="at" class="mx-2"></b-icon>
                    Continua con cuenta email
                </b-button>
            </div>
            <div class="my-4">
                <b-form-checkbox
                    id="checkbox-1"
                    v-model="termnsAndCondition"
                    name="checkbox-1"
                    value="accepted"
                    unchecked-value="not_accepted"
                >
                    Acepto los términos y condiciones de las <a href="">politicas de privacidad</a>
                </b-form-checkbox>
            </div>
            <div class="text-center mb-4">
                ¿Tienes cuenta en BIMTECH?
                <b-button 
                    variant="link"
                    @click="goToLogIn(true)"
                >Inicia Sesión</b-button>
            </div>
        </div>
        <PasswordRegister v-if="mood === 'password'" />
    </div>
</template>

<script>
import firebase from '../../../plugins/firebase';
import PasswordRegister from './PasswordRegister.vue';


export default {
    name: 'Register',
    components: {
        PasswordRegister,
    },
    data(){
        return {
            termnsAndCondition: 'not_accepted',
            mood: '',
        }
    },
    created(){
        // Events
        this.eventHub.$on('change-mood', this.changeMood);
    },
    methods: {
        goToLogIn(state){
            this.eventHub.$emit('change-form', state);
        },
        signUpWithGoogle(){
            const provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider)
                .then((result) => { console.log(result) })
                .catch((err) => { console.log(err) });
        },
        signUpWithFacebook(){
            const provider = new firebase.auth.FacebookAuthProvider();
            firebase.auth().signInWithPopup(provider)
                .then(result => { console.log(result) })
                .catch(error => { console.log(error) });
        },
        toEmailPasswordRegister(){
            this.mood = 'password';
        },
        changeMood(){
            this.mood = '';
        }
    }
}
</script>

<style lang="scss" scoped>
    .all-registers {
        width: 35%;
        background: #fff;
        border: solid yellow 3px;
        margin-top: 70px;
        border-radius: 25px;
    }
</style>