<template>
    <div class="container">
        <h1>Bienvenido administrador!</h1>
        <p></p>
        <b-form @submit="onSubmit" inline>
          <table class="table table-responsive">
            <tr><th>Factores Económicos</th>
		          <td>
                <label class="sr-only" for="inline-form-input-FE">Factor Situación de la Empresa</label>
                <b-form-input id="inline-form-input-FE" aria-describedby="FE"></b-form-input>
                <b-form-text id="FE">
                  Factor Situación de la Empresa
                </b-form-text>
              </td>
              <td>
                <label class="sr-only" for="inline-form-input-FM">Factor Mercado</label>
                <b-form-input id="inline-form-input-FM" aria-describedby="FM"></b-form-input>
                <b-form-text id="FM">
                  Factor Mercado
                </b-form-text>
              </td>
              <td>
                <label class="sr-only" for="inline-form-input-FR">Factor Reducción Tabulador</label>
                <b-form-input id="inline-form-input-FR" aria-describedby="FR"></b-form-input>
                <b-form-text id="FR">
                  Factor Reducción Tabulador
                </b-form-text>
              </td>
            </tr>
	          <tr><th>Factores Tiempos de entrega</th>
	          	<td>
                <label class="sr-only" for="inline-form-input-FT">Factor Tabulador</label>
                <b-form-input id="inline-form-input-FT" aria-describedby="FT"></b-form-input>
                <b-form-text id="FT">
                  Factor Tabulador
                </b-form-text>
              </td>
              <td>
                <label class="sr-only" for="inline-form-input-FEE">Factor Eficencia de la Empresa</label>
                <b-form-input id="inline-form-input-FEE" aria-describedby="FEE"></b-form-input>
                <b-form-text id="FEE">
                  Factor Eficencia de la Empresa
                </b-form-text>
              </td>
              <td>
                <label class="sr-only" for="inline-form-input-FC">Factor Carga de trabajo Empresa</label>
                <b-form-input id="inline-form-input-FC" aria-describedby="FC"></b-form-input>
                <b-form-text id="FC">
                  Factor Carga de trabajo Empresa
                </b-form-text>
              </td>
            </tr>
	          <tr><th>Factores de Comisión</th>
		          <td>
                <label class="sr-only" for="inline-form-input-FCO">Factor Comisión</label>
                <b-form-input id="inline-form-input-FCO" aria-describedby="FCO"></b-form-input>
                <b-form-text id="FCO">
                  Factor Comisión
                </b-form-text>
              </td>
              <td>
                <label class="sr-only" for="inline-form-input-FCC">Factor Comisión Coordinador</label>
                <b-form-input id="inline-form-input-FCC" aria-describedby="FCC"></b-form-input>
                <b-form-text id="FCC">
                  Factor Comisión Coordinador
                </b-form-text>
              </td>
            </tr>
            <b-button type="submit" variant="info">Editar</b-button>
          </table>
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
        }
      }
    },
    methods: {
      onSubmit(event) {
        event.preventDefault()
        //firebase.auth().createUserWithEmailAndPassword(this.form.email,this.form.password);
        //alert(JSON.stringify(this.form))
      }
    }
  
}
</script>