<template>
  <b-modal
    ref="edificacion-nueva"
  >
    <div>
        <div>
            <p>Seccion 1</p>
        </div>
        <div>
            <p>Seccion 2</p>
        </div>
        <div>
            <p>Seccion 3</p>
        </div>
    </div>
  </b-modal>
</template>

<script>
export default {
    name: 'EdificacionNueva',
    created(){
        this.eventHub.$on('create', this.onCreateCotizacion);
    },
    data(){
        return{
            
        }
    },
    methods: {
        onCreateCotizacion(){
            if(typeof this.$refs["edificacion-nueva"] !== "undefined"){
                this.$refs["edificacion-nueva"].show();
            }
        }
    },
}
</script>

<style>

</style>