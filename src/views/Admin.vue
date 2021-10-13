<template>
    <div class="container">
      <div class="d-flex flex-row-reverse bd-highlight">
          <div class="p-2 bd-highlight">
          <b-button variant="dark" @click.prevent="logout">Salir</b-button>
          </div>
      </div>
      <h1>Bienvenido administrador: {{ user.email }}</h1>
        <b-form @submit="onSubmit" inline>
          <table class="table table-responsive">
            <tr><th>Factores Económicos</th>
		          <td>
                <label class="sr-only" for="inline-form-input-FE">Factor Situación de la Empresa</label>
                <b-form-input id="inline-form-input-FE" aria-describedby="FE" v-model="form.FE"></b-form-input>
                <b-form-text id="FE">
                  Factor Situación de la Empresa
                </b-form-text>
              </td>
              <td>
                <label class="sr-only" for="inline-form-input-FM">Factor Mercado</label>
                <b-form-input 
                  id="inline-form-input-FM" 
                  aria-describedby="FM"
                  v-model="form.economicFactors.market"
                ></b-form-input>
                <b-form-text id="FM">
                  Factor Mercado
                </b-form-text>
              </td>
              <td>
                <label class="sr-only" for="inline-form-input-FR">Factor Reducción Tabulador</label>
                <b-form-input 
                  id="inline-form-input-FR" 
                  aria-describedby="FR"
                  v-model="form.economicFactors.tabularReduction"
                ></b-form-input>
                <b-form-text id="FR">
                  Factor Reducción Tabulador
                </b-form-text>
              </td>
            </tr>
	          <tr><th>Factores Tiempos de entrega</th>
	          	<td>
                <label class="sr-only" for="inline-form-input-FT">Factor Tabulador</label>
                <b-form-input 
                  id="inline-form-input-FT" 
                  aria-describedby="FT"
                  v-model="form.deliveryTimeFactors.tabuladorFactor2"
                ></b-form-input>
                <b-form-text id="FT">
                  Factor Tabulador
                </b-form-text>
              </td>
              <td>
                <label class="sr-only" for="inline-form-input-FEE">Factor Eficencia de la Empresa</label>
                <b-form-input 
                  id="inline-form-input-FEE" 
                  aria-describedby="FEE"
                  v-model="form.deliveryTimeFactors.efficiencyCompany"
                ></b-form-input>
                <b-form-text id="FEE">
                  Factor Eficencia de la Empresa
                </b-form-text>
              </td>
              <td>
                <label class="sr-only" for="inline-form-input-FC">Factor Carga de trabajo Empresa</label>
                <b-form-input 
                  id="inline-form-input-FC" 
                  aria-describedby="FC"
                  v-model="form.deliveryTimeFactors.companyWorkLoad"
                ></b-form-input>
                <b-form-text id="FC">
                  Factor Carga de trabajo Empresa
                </b-form-text>
              </td>
            </tr>
	          <tr><th>Factores de Comisión</th>
		          <td>
                <label class="sr-only" for="inline-form-input-FCO">Factor Comisión</label>
                <b-form-input 
                  id="inline-form-input-FCO" 
                  aria-describedby="FCO"
                  v-model="form.comissionFactors.comission"
                ></b-form-input>
                <b-form-text id="FCO">
                  Factor Comisión
                </b-form-text>
              </td>
              <td>
                <label class="sr-only" for="inline-form-input-FCC">Factor Comisión Coordinador</label>
                <b-form-input 
                  id="inline-form-input-FCC" 
                  aria-describedby="FCC"
                  v-model="form.comissionFactors.coordinatorComission"
                ></b-form-input>
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
  mounted(){
    this.getFactors();
  },
  data() {
      return {
        user: null,
        form: {
          economicFactors: {
            companySituation: 0,
            market: 0,
            tabularReduction: 0,
          },
          deliveryTimeFactors: {
            companyWorkLoad: 0,
            efficiencyCompany: 0,
            tabuladorFactor2: 0,
          },
          comissionFactors: {
            comission: 0,
            coordinatorComission: 0,
          }
        }
      }
    },
    methods: {
      onSubmit(event) {
        event.preventDefault()
        //firebase.auth().createUserWithEmailAndPassword(this.form.email,this.form.password);
        alert(JSON.stringify(this.form))
      },
      logout(){
        firebase.auth().signOut().then(() => {
          this.$router.push({name: 'Sesion'})
        })
        //alert(JSON.stringify(this.form))
      },
      async getFactors(){
        const factorsRef= firebase.firestore().collection('factors').doc('bQS31BEEdF9n5HHatkB9');
        const factorsDoc= await factorsRef.get();

        this.form= Object.assign(this.form, factorsDoc.data());
      }
    },
    created(){
      firebase.auth().onAuthStateChanged(user => {
        if(user){
          this.user = user
        }else {
          this.user = null
        }
      })
    }
  
}
</script>