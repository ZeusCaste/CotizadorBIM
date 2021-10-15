<template>
  <div>
    <b-overlay show rounded="sm" opacity="0.60" variant="primary">
      <template #overlay>
        <div class="text-center">
          <h1 class="display-6 text-white">Nosotros</h1>
        </div>
      </template>
        <b-card :img-src="require('../media/images/BIM.jpg')" img-alt="Card image" img-center class="mb-3 mt-3">
        </b-card>
    </b-overlay>
    <!--b-card
        overlay
        :img-src="require('../media/images/BIM.jpg')"
        img-alt="Card Image"
        title="Sobre Nosotros"
    
    <b-card-text class="container">
      <div>
        <p> se puede escribir una frase</p>
      </div>
    </b-card-text>
    </b-card-->
    <b-card :img-src="require('../media/images/BIMimagen.jpg')" img-alt="Card image" img-left class="mb-3 mt-3">
      <b-card-text>
        <h1>¿Quiénes somos?</h1>
        <h5>Somos una comunidad de ingenieros y expertos que ejecuta y supervisa proyectos de obra pública y privada 
        en las  áreas de construcción, remodelación y mantenimiento de inmuebles.<p></p>
        Contamos con un equipo profesional comprometido con la calidad de nuestros servicios cumpliendo el compromiso 
        adquirido con nuestros clientes.</h5>
      </b-card-text>
    </b-card>
    <b-card :img-src="require('../media/images/cotizador2.jpg')" bg-variant="dark" text-variant="white" class="text-center" img-right>
      <b-card-text>
        <h3>
          Hemos desarrollado una herramienta de cotización inmobiliaria la cual se basa en las normas, leyes y reglamentos mexicanos,
          utilizando de manera óptima el estimado paramétrico y la ingeniería de costos.
        </h3>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'Home',
}
</script>

<style>

</style>