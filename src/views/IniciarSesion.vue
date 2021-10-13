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
        <b-row>
          <b-col lg="2" class="pb-2"><b-button type="submit" variant="primary">Ingresar</b-button></b-col>
          <b-col lg="1" class="pb-2"><b-button disabled type="registrar"  >Registrarse</b-button></b-col>
        </b-row>
      </b-form>
      <b-modal ref="my-modal" hide-footer>
      <div class="d-block text-center">
        <h3>El correo o contraseña  son incorrectos</h3>
      </div>
    </b-modal>
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
        this.error  = '';
        event.preventDefault()
        if (this.form.email && this.form.password){
          firebase.auth().signInWithEmailAndPassword(this.form.email,this.form.password)
          .then(user => {
            this.$router.push({name: 'Admin'})
          }). catch( err => {
            this.$refs['my-modal'].show()
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