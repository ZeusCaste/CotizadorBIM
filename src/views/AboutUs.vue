<template>
  <div>
    <div class="header">
      <div class="img-header">
        <h2 class="title">Nosotros</h2>
        <img class="img-fluid" :src="require('../../src/media/images/BIM-us.jpg')" alt="">
      </div>
    </div>
    <div class="mx-auto d-flex flex-xl-row flex-lg-row flex-column-reverse flex-md-column-reverse flex-sm-column-reverse nosotros-description">
      <div class="col-xl-6 col-lg-6 mx-0 my-auto">
        <img class="img-fluid img-BIM" :src="require('../../src/media/images/BIMimagen.jpg')" alt="">
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
        <h1 class="text-warning text-center mx-5 mt-5">Nuestra herramienta</h1>
        <h5 class="text-justify text-warning my-5 px-2 py-4">
          Hemos desarrollado una herramienta de cotización inmobiliaria la cual se basa en las normas, leyes y reglamentos mexicanos,
          utilizando de manera óptima el estimado paramétrico y la ingeniería de costos.
        </h5>
      </div>
      <div class="col-xl-6 col-lg-6 mx-5">
        <img class="img-fluid img-out-tool" :src="require('../../src/media/images/cotizador3.jpg')" alt="">
      </div>
    </div>
    <Constructions />
    <ImgCarousell />
  </div>
</template>

<script>
import ImgCarousell from '../components/pages/AbouUs/ImgCarousell.vue';
import Constructions from '../components/pages/AbouUs/Constructions.vue';

export default {
  name: 'Home',
  components: {
    ImgCarousell,
    Constructions
  }
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
    margin-top: 20px;
    position: absolute;
    left: 0; 
    right: 0;
    margin-left: auto; 
    margin-right: auto;
    color: #000;
    opacity: unset;
    font-weight: bold;
    font-size: 9vw;
    text-align: center;
  }

  .img-header{
    opacity: 0.7;
    width: 100%;
    height: auto;
    border-bottom-left-radius: 15%;
  }

  .img-fluid {
    width: 100%;
    height: auto;
  }

  .nosotros-description {
    margin-top: 60px;
    padding-left: 20px;
    padding-right: 20px;
    text-align: center;
    margin-bottom: 25px;
  }

  .img-BIM {
    width: 75%;
    border-radius: 10%;
    box-shadow: 5px 5px 5px;
  }

  .img-out-tool {
    margin-top: 10px;
    width: 85%;
    border-radius: 5%;
    box-shadow: 2px 2px 10px rgb(248, 248, 152);
  }

  .nuestra-herramienta {
    background: #1B1818;
    color: rgb(192, 192, 192);
    padding-top: 25px;
    padding-bottom: 35px;
    margin-top: 8%;
    margin-bottom: 25px;
    margin-left: 20px;
    margin-right: 20px;
    text-align: justify;
  }

  @media (max-width: 600px) {
    .header {
      background-color: crimson;
    }

    .img-BIM {
      width: 100%;
    }
  }

  @media (min-width: 600px) and (max-width: 990px) {
    .header {
      background-color: darkcyan;
    }

    .img-BIM {
      width: 90%;
    }
  }

</style>