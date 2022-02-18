<template>
    <div class="container">
      <p class="display-4 font-weight-bold text-dark mt-1 text-center">Iniciar Sesión</p>

      <!-- Formulario para iniciar sesion -->
      <b-form @submit="onSubmit">

        <!-- Input correo electronico -->
        <b-form-group class="text-dark text-left mt-5" id="inputg1" label="Correo electrónico:" label-for="input-1">
          <b-icon icon="envelope" font-scale="2"></b-icon>
            <b-form-input
              id="input-1"
              v-model="form.email"
              type="email"
              placeholder="Ingrese su correo electrónico"
            ></b-form-input>
        </b-form-group>

        <!-- Input contraseña -->
        <b-form-group class="text-dark text-left mt-5" id="inputg2" label="Contraseña:" label-for="input-2">
          <b-icon  icon="file-lock2-fill" font-scale="2"></b-icon>
          <b-form-input
            id="input-2"
            v-model="form.password"
            type="password"
            placeholder="Ingrese su contraseña"
          ></b-form-input>
        </b-form-group>

        <!-- Boton de inicio y link para cambiar al formulario de registro -->
        <div class="my-4 text-center">
          <b-button class="mr-3" type="submit" variant="primary">Ingresar</b-button>
          <b-button disabled type="registrar">Registrarse</b-button>
        </div>
      </b-form>

      <!-- Alerts para mostrar errores -->
      <div v-if="error">
        <b-alert class="text-center" show variant="danger"><h4>{{ errorMessage }}</h4></b-alert>
      </div>
    </div>
</template>

<script>

import firebase from '../../../plugins/firebase';

export default {
  created(){
    firebase.auth().onAuthStateChanged((user)=> {
      if(user){
        this.$router.push({name: 'AdminSession'});
      }
    });
  },
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
        this.error  = false;
        this.errorMessage= "";
        event.preventDefault();
        if (!this.form.email.trim() && !this.form.password.trim()){
          this.error= true;
          this.errorMessage= "Ingresa tu correo y contraseña";
          return
        }
        await firebase.auth().signInWithEmailAndPassword(this.form.email,this.form.password)
          .then(user => {
            // this.$router.push({name: 'AdminSession'})
          }). catch( err => {
            this.error= true;
            this.errorMessage= "Correo o contraseña incorrectos"
          })
        
      },
      onRegistrar(event) {
        event.preventDefault()
        firebase.auth().createUserWithEmailAndPassword(this.form.email,this.form.password);
      }
    }
  
}
</script>
<style lang="scss" scoped>
  .container{
    width: 35%;
    background: #fff;
    border: solid yellow 3px;
    margin-top: 25px;
    border-radius: 25px;
  }
</style>