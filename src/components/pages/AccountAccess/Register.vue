<template>
    <div class="col-10 col-xl-5 col-lg-7 col-md-7 col-sm-12">
        <div v-if="!mood" class="all-registers container px-5 mb-5">
            <p class="display-4 font-weight-bold text-dark mt-1 text-center mt-4">Únete a BIMTECH</p>
            <div class="my-4">
                <b-form-checkbox
                    id="checkbox-1"
                    v-model="termsAndConditions"
                    name="checkbox-1"
                    value="accepted"
                    unchecked-value="not_accepted"
                >
                    Acepto los términos y condiciones de las <a href="https://firebasestorage.googleapis.com/v0/b/pruebascotizadorbim.appspot.com/o/aviso-privacidad%2FAviso%20de%20privacidad.pdf?alt=media&token=7f0b11bf-1df1-4a3f-8d9e-04b4369c88c4">politicas de privacidad</a>
                    <b-button variant="success" @click="getURLFromFirebaseStorage()">Test</b-button>
                </b-form-checkbox>
            </div>
            <h4 class="mt-5">Selecciona una forma de registro </h4>
            <div class="my-4 text-center d-flex flex-column">
                <b-button :disabled="termsAndConditions !== 'accepted'" variant="primary" class="my-2" @click="signUpWithFacebook()">
                    <b-icon icon="facebook" class="mx-2"></b-icon>
                    Continuar con Facebook
                </b-button>
                <b-button :disabled="termsAndConditions !== 'accepted'" variant="danger" class="my-2" @click="signUpWithGoogle()">
                    <b-icon icon="google" class="mx-2"></b-icon>
                    Continuar con Google
                </b-button>
                <b-button :disabled="termsAndConditions !== 'accepted'" variant="info" class="my-2" @click="toEmailPasswordRegister()">
                    <b-icon icon="at" class="mx-2"></b-icon>
                    Continua con cuenta email
                </b-button>
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
            termsAndConditions: 'not_accepted',
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
        async getURLFromFirebaseStorage(){
            // Creamos una referencia al servicio storage de firebase
            const storage = firebase.storage();
            //creamos una referencia 
            const storageRef = storage.ref();
            // Con nuestra referencia apuntamos a una ruta especifica
            const privacidadFile = storageRef.child('aviso-privacidad/aviso-de-privacidad.pdf');
            //Obtenemos la ruta de descargar
            const url = await privacidadFile.getDownloadURL();
            console.log(url);
            //const files = await privacidadFile.listAll();
            
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
        background: #fff;
        border: solid yellow 3px;
        border-radius: 25px;
        margin-top: 70px;
    }
</style>