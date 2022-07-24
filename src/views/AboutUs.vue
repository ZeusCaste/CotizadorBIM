<template>
  <div>
    <div class="header">
      <div class="img-header">
        <h2 class="title">Nosotros</h2>
        <img class="img-fluid" :src="require('../../src/media/images/BIM.jpg')" alt="">
      </div>
    </div>
    <div class="mx-auto d-flex flex-xl-row flex-lg-row flex-column-reverse flex-md-column-reverse flex-sm-column-reverse nosotros-description">
      <div class="col-xl-6 col-lg-6 mx-0">
        <img class="img-fluid" :src="require('../../src/media/images/BIMimagen.jpg')" alt="">
      </div>
      <div class="col-xl-6 col-lg-6 my-auto">
        <h1 class="text-warning">¿Quiénes somos?</h1>
        <h5 class="text-justify text-dark my-5">Somos una comunidad de ingenieros y expertos que ejecuta y supervisa proyectos de obra pública y privada 
          en las  áreas de construcción, remodelación y mantenimiento de inmuebles.<p></p>
          Contamos con un equipo profesional comprometido con la calidad de nuestros servicios cumpliendo el compromiso 
          adquirido con nuestros clientes.
        </h5>
      </div>
    </div>
    <div class="mx-auto d-flex flex-xl-row flex-lg-row flex-column-reverse flex-md-column-reverse flex-sm-column-reverse nuestra-herramienta">
      <div class="col-xl-6 col-lg-6 my-auto">
        <h5 class="text-justify text-warning my-5 px-2 py-4">
          Hemos desarrollado una herramienta de cotización inmobiliaria la cual se basa en las normas, leyes y reglamentos mexicanos,
          utilizando de manera óptima el estimado paramétrico y la ingeniería de costos.
        </h5>
      </div>
      <div class="col-xl-6 col-lg-6 image mx-0">
        <img class="img-fluid" :src="require('../../src/media/images/cotizador2.jpg')" alt="">
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
  
  .header{
    background: #F4D03F ;
    width: 100%;
    height: auto;
  }
  
  .title{
    width: 50%;
    position: absolute;
    left: 0; 
    right: 0;
    margin-left: auto; 
    margin-right: auto;
    color: #000;
    opacity: unset;
    font-weight: bold;
    font-size: 11vw;
    text-align: center;
  }

  .img-header{
    opacity: 0.7;
    width: 100%;
    height: auto;
  }

  .img-fluid {
    width: 100%;
    height: auto;
  }

  .nosotros-description {
    margin-top: 25px;
    padding-left: 20px;
    padding-right: 20px;
    text-align: center;
    margin-bottom: 25px;
  }

  .nuestra-herramienta {
    background: #1B1818     ;
    margin-bottom: 20px;
    color: rgb(192, 192, 192);
    padding-top: 15px;
    margin-top: 8%;
    margin-left: 20px;
    margin-right: 20px;
    text-align: justify;
  }

</style>