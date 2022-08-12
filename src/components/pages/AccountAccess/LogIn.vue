<template>
    <div class="container mb-5 col-10 col-xl-4 col-lg-6 col-md-7 col-sm-10">
      <p class="display-4 font-weight-bold text-dark mt-1 text-center">Iniciar Sesión</p>

      <div class="my-4 mx-3 text-center d-flex flex-column">
        <b-button variant="primary" class="my-2" @click="signUpWithFacebook()">
          <b-icon icon="facebook" class="mx-2"></b-icon>
          Continuar con Facebook
        </b-button>
        <b-button variant="danger" class="my-2" @click="signUpWithGoogle()">
          <b-icon icon="google" class="mx-2"></b-icon>
          Continuar con Google
        </b-button>
      </div>

      <!-- Formulario para iniciar sesion con email y password -->
      <b-form @submit="onSubmit">
        <!-- Input correo electronico -->
        <b-form-group class="text-dark text-left mt-5 " id="inputg1" label="Correo electrónico:" label-for="input-1">
          <b-row>
            <b-icon class="ml-3" icon="envelope-fill" font-scale="2"></b-icon>
            <b-col>
              <b-form-input
                id="input-1"
                v-model="form.email"
                type="email"
                placeholder="Correo Electrónico"
              ></b-form-input>
            </b-col>
          </b-row>
        </b-form-group>

        <!-- Input contraseña -->
        <b-form-group class="text-dark text-left mt-3" id="inputg2" label="Contraseña:" label-for="input-2">
          <b-row>
            <b-icon class="ml-3"  icon="file-lock2-fill" font-scale="2"></b-icon>
            <b-col>
              <b-form-input
                id="input-2"
                v-model="form.password"
                type="password"
                placeholder="Ingrese su contraseña"
              ></b-form-input>
            </b-col>
          </b-row>
        </b-form-group>

        <!-- Boton de inicio y link para cambiar al formulario de registro -->
        <div class="my-4 text-center">
          <b-button class="mr-3" type="submit" variant="primary">Ingresar</b-button>
          <b-button 
            variant="link"
            type="registrar"
            @click="goToRegister(false)"
          >Registrarse</b-button>
        </div>
      </b-form>

      <!-- Alerts para mostrar errores -->
      <div v-if="error">
        <b-alert class="text-center" show variant="danger">{{ errorMessage }}</b-alert>
      </div>
    </div>
</template>

<script>
import firebase from '../../../plugins/firebase';


export default {
  name: 'LogIn',
  data() {
    return {
      error: false,
      errorMessage: "",
      form: {
        email: '',
        password: '',
      },
    }
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault();
      this.error = false;
      this.errorMessage = "";

      if (!this.form.email.trim() && !this.form.password.trim()){
        this.error= true;
        this.errorMessage= "Ingresa tu correo y contraseña";
        return
      }

      await firebase.auth().signInWithEmailAndPassword(this.form.email, this.form.password)
        .then((user) => { console.log('Logged User') })
        .catch((err) => {
          this.error= true;
          if(err.code === 'auth/user-not-found'){
            this.errorMessage= "Usuario no encontrado";
            return
          }
          console.log(err);
          // this.errorMessage= "Correo o contraseña incorrectos"
        });
    },
    goToRegister(state){
      this.eventHub.$emit('change-form', state)
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
  }
  
}
</script>
<style lang="scss" scoped>
  .container{
    background: #fff;
    border: solid yellow 3px;
    border-radius: 25px;
    margin-top: 70px;
  }
</style>