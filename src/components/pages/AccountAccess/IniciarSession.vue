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
              required
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
            required
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
        <b-alert show variant="danger">Danger Alert</b-alert>
      </div>
      <b-modal ref="my-modal" hide-footer>
        <div class="d-block text-center">
          <h3>El correo o contraseña  son incorrectos</h3>
        </div>
    </b-modal>
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
        form: {
          email: '',
          password: '',
        },
      }
    },
    methods: {
      async onSubmit(event) {
        this.error  = '';
        event.preventDefault()
        if (this.form.email && this.form.password){
          await firebase.auth().signInWithEmailAndPassword(this.form.email,this.form.password)
          .then(user => {
            // this.$router.push({name: 'AdminSession'})
          }). catch( err => {
            this.error= true;
          })
        }else{
          this.$refs['my-modal'].show()
        }
        
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