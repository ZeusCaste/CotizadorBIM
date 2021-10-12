<template>
  <div>
    <b-card
        overlay
        :img-src="require('../media/images/BIM.jpg')"
        img-alt="Card Image"
        title="Sobre Nosotros"
    >
    <!--b-card-text class="container">
      <div>
        <p> se puede escribir una frase</p>
      </div>
    </b-card-text-->
    </b-card>
    <b-card :img-src="require('../media/images/BIMimagen.jpg')" img-alt="Card image" img-left class="mb-3 mt-3">
      <b-card-text>
        ¿Quiénes somos?
      </b-card-text>
    </b-card>
    <b-card bg-variant="dark" text-variant="white" title="Titulo">
      <b-card-text>
        Aqui se puede mostrar más texto
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