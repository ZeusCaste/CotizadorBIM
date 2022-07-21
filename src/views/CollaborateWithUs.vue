<template>
  <div>
    <div class="colaborate-with-us animate__animated animate__zoomInDown">
      <div class="row col-12 px-5 h-100">
        <div class="sub-container col-xl-6 col-md-12 col-sm-12 col-lg-6">
          <h1 class="display-3 font-weight-bolder">¡Colabora con nosotros!</h1>
        </div>
        <div class="sub-container col-xl-6 col-md-12 col-sm-12 col-lg-6">
          <h4>
            Si tienes conocimientos que quieres compartir con otros profesionales, te dedicas a la industria de la construcción.
            Te invitamos a ser parte de BIMTECH.
          </h4>
          <h4>
            Actualmente contamos con una gran oportunidad de clientes y proyectos en varios estados de la república
          </h4>
          <div class="my-5">
            <router-link to="/account-access" class="animate__animated animate__tada animate__delay-2s btn btn-dark text-warning">
              Registrate aqui
            <b-icon icon="hand-index" variant="warning" animation="throb"></b-icon>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div>
      <Card :title="title1" :description="description1" />
      <Card :title="title2" :description="description2" />
      <Card :title="title3" :description="description3" />
    </div>
  </div>
</template>

<script>
import Card from '../components/pages/CollaborateWithUs/Card.vue';

export default { 
  name: 'CollaborateWithUs',
  components: {
    Card,
  },
  data() {
    return {
      title1: '¿Porqué ser colaborador?',
      title2: 'Otras formas de colaborar',
      title3: 'Seguir desarrollándose',
      description1: 'Esta plataforma te ayudará a encontrar un eqeuipo de trabajo para poder desarrollar proyectos arquitectónicos de primera calidad.',
      description2: 'Contamos con un programa de recompensas (comisiones) con el cual te beneficiaras al recomendar nuestros servicios ya sea con otros colaboradores o bien con clientes potenciales.',
      description3: 'Es una forma de conectar con el mundo y con otros profesionales como tú. Te permite dar a conocer tu trabajo y recibir retroalimentación de los clientes.'
    }
  }
}
</script>

<style lang="scss" scoped>
  .colaborate-with-us {
    background: rgba(250, 232, 41, 0.6);
    height: 90vh;
    padding: 10px 5px;
  }

  .sub-container {
    text-align: center;
    margin: auto 0;
  }
</style>