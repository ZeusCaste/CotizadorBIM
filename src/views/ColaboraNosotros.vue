<template>
  <div class="container">
      <b-overlay :show="show" rounded="sm" @shown="onShown" @hidden="onHidden" :opacity="0.60" :variant="transparent">
        <b-card title="COLABORA CON NOSOTROS">
          <b-card-text>Muy pronto podrás colaborar con nosotros, queremos ofrecerte el mejor servicio.</b-card-text>
        </b-card>
      <template #overlay>
        <div class="text-center">
          <b-icon icon="stopwatch" font-scale="8" animation="throb"></b-icon>
          <h1 id="cancel-label" class="display-6">Muy pronto! Estamos trabajando...</h1>
          <!--p id="cancel-label" font-size="10"></p-->
        </div>
      </template>
        <b-card :img-src="require('../media/images/team.png')" img-alt="Card image" img-center class="mb-3 mt-3">
        </b-card>
      </b-overlay>
  </div>
</template>

<script>
export default {
    data() {
      return {
        show: true,
      }
    },
    methods: {
      onShown() {
        // Focus the cancel button when the overlay is showing
        this.$refs.cancel.focus()
      },
      onHidden() {
        // Focus the show button when the overlay is removed
        this.$refs.show.focus()
      }
    }
  }
</script>

<style>

</style>