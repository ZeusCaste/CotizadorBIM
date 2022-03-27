<template>
  <div class="cotizacion w-50">
        <b-button
            class="button btn-block"
            variant="outline-warning"
            @click="action()"
        >
            <p class="texto"> {{ title }} </p>

            <p class="icono">
                <b-icon
                    :icon="icon"
                    animation="throb"
                    scale="5"
                ></b-icon>
            </p>
        </b-button>
    </div>
</template>

<script>
export default {
    props: {
        title: String,
        action: Function,
        icon: String,
    }
}
</script>

<style lang="scss" scoped>
    .cotizacion{
        background: #000;
        opacity: 0.7;
        border-radius: 25px;
        margin: 0px 10px;
    }

    .button{
        height: 200px;
        border-width: 3px;
        border-radius: 15px;
    }

    .texto{
        margin-top: -50px;
        font-weight: bold;
    }

    .icono{
        margin-top: 50px;
    }
</style>>

</style>