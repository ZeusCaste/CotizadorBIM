<template>
  <div>
    <b-overlay show rounded="sm" opacity="0.30" variant="warning">
      <template #overlay>
        <div class="text-center">
          <h1 class="display-3 text-white font-weight-bold">Nosotros</h1>
        </div>
      </template>
        <b-card :img-src="require('../media/images/BIM.jpg')" img-alt="Card image" img-center >
        </b-card>
    </b-overlay>
    <div class="nosotros-description">
      <div class="image">
        <img :src="require('../../src/media/images/BIMimagen.jpg')" alt="">
      </div>
      <div class="text my-auto">
        <h1 class="text-warning">¿Quiénes somos?</h1>
        <h5 class="text-justify">Somos una comunidad de ingenieros y expertos que ejecuta y supervisa proyectos de obra pública y privada 
          en las  áreas de construcción, remodelación y mantenimiento de inmuebles.<p></p>
          Contamos con un equipo profesional comprometido con la calidad de nuestros servicios cumpliendo el compromiso 
          adquirido con nuestros clientes.
        </h5>
      </div>
    </div>
    <!-- <b-card :img-src="require('../media/images/BIMimagen.jpg')" img-alt="Card image" img-left class="mb-3 mt-3">
      <b-card-text class="my-auto">
        <h1>¿Quiénes somos?</h1>
        <h5>Somos una comunidad de ingenieros y expertos que ejecuta y supervisa proyectos de obra pública y privada 
        en las  áreas de construcción, remodelación y mantenimiento de inmuebles.<p></p>
        Contamos con un equipo profesional comprometido con la calidad de nuestros servicios cumpliendo el compromiso 
        adquirido con nuestros clientes.</h5>
      </b-card-text>
    </b-card> -->
    <!-- <b-card :img-src="require('../media/images/cotizador2.jpg')" bg-variant="dark" text-variant="white" class="text-center" img-right>
      <b-card-text>
        <h3>
          Hemos desarrollado una herramienta de cotización inmobiliaria la cual se basa en las normas, leyes y reglamentos mexicanos,
          utilizando de manera óptima el estimado paramétrico y la ingeniería de costos.
        </h3>
      </b-card-text>
    </b-card> -->
    <div class="nuestra-herramienta">
      <div>
        <h3 class="text">
          Hemos desarrollado una herramienta de cotización inmobiliaria la cual se basa en las normas, leyes y reglamentos mexicanos,
          utilizando de manera óptima el estimado paramétrico y la ingeniería de costos.
        </h3>
      </div>
      <div class="image">
        <img :src="require('../../src/media/images/cotizador2.jpg')" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
}
</script>

<style scoped>
  .nosotros-description, .nuestra-herramienta {
    margin: 40px 20px;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .nosotros-description .image{
    box-shadow: 10px 10px 2px 1px rgba(0, 0, 0, 0.1);;
  }

  .nosotros-description .text{
    text-align: center;
    margin-left: 35px;
    margin-right: 25px;
  }

  .nuestra-herramienta {
    margin: 0;
    margin-bottom: 20px;
    background: #1B1818     ;
  }

  .nuestra-herramienta .text{
    color: rgb(192, 192, 192);
    margin-top: 8%;
    margin-left: 20px;
    margin-right: 20px;
    text-align: justify;
  }

</style>