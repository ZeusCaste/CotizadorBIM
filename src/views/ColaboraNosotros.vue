<template>
  <div class="container mt-5">
    <div class="colaborate-with-us animate__animated animate__zoomInDown row col-12">
      <div class="sub-container col-xl-6 col-md-8 col-sm-12 col-lg-6">
        <h1 class="display-3 font-weight-bolder">¡Colabora con nosotros!</h1>
      </div>
      <div class="sub-container col-xl-6 col-md-4 col-sm-12 col-lg-6 mt-4">
        <p>
          Si tienes conocimientos que quieres compartir con otros profesionales, te dedicas a la industria de la construcción.
          Te invitamos a ser parte de BIMTECH.
        </p>
        <p>
          Actualmente contamos con una gran oportunidad de clientes y proyectos en varios estados de la república
        </p>
        <div class="my-5">
          <router-link to="/acceso-cuenta" class="animate__animated animate__tada animate__delay-2s btn btn-dark text-warning">
            Registrate aqui
          <b-icon icon="hand-index" variant="warning" animation="throb"></b-icon>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default { 

}
</script>

<style lang="scss" scoped>
  .colaborate-with-us{
    background: rgba(250, 232, 41, 0.6);
    padding: 10px 5px;
  }
</style>