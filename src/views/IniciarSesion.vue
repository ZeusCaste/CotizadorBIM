<template>
    <div class="container">
      <b-form @submit="onSubmit">
        <b-form-group id="inputg1" label="Correo electrónico:" label-for="input-1">
          <b-icon icon="envelope" font-scale="2"></b-icon>
            <b-form-input
              id="input-1"
              v-model="form.email"
              type="email"
              placeholder="Ingrese su correo electrónico"
              required
            ></b-form-input>
        </b-form-group>

        <b-form-group id="inputg2" label="Contraseña:" label-for="input-2">
          <b-icon icon="file-lock2-fill" font-scale="2"></b-icon>
          <b-form-input
            id="input-2"
            v-model="form.password"
            type="password"
            placeholder="Ingrese su contraseña"
            required
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Ingresar</b-button>
        <b-button type="registrar">Registrarse</b-button>
      </b-form>
    </div>
</template>

<script>

import firebase from '../plugins/firebase';

export default {
  data() {
      return {
        form: {
          email: '',
          password: '',
        },
      }
    },
    methods: {
      onSubmit(event) {
        event.preventDefault()
        firebase.auth().createUserWithEmailAndPassword(this.form.email,this.form.password);
        //alert(JSON.stringify(this.form))
      },
      onReset(event) {
        event.preventDefault()
        // Reset our form values
        this.form.email = ''
        this.form.password = ''
      }
    }
  
}
</script>