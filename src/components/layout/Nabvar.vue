<template>
    <div class="navbar navbar-dark" style="background-color: #000">
        <div class="ml-3">
            <b-img 
                :src="require('../../media/images/BIM-logo-2.jpg')" 
                fluid 
                alt="Responsive image"
                width="125"
            ></b-img>
            <b-img 
                :src="require('../../media/images/LetrasLOGO.jpg')" 
                fluid 
                alt="Responsive image"
                width="250"
            ></b-img>
        </div>
        <div>
            
        </div><!--h3 class="text-white">BIM Soluciones Tecnologicas</h3-->
        <div>
            <router-link to="/arma-tu-cotizacion" class="button-menu btn btn-outline-primary mx-2">Arma tu cotizacion</router-link>
            <router-link to="/colabora-con-nosotros" class="btn btn-outline-primary mx-2">Colabora con nosotros</router-link>
            <router-link to="/sobre-nosotros" class="btn btn-outline-primary mx-2">Sobre nosotros</router-link>
            <router-link to="/iniciar-sesion" class="btn btn-outline-primary mx-2">Inicia Sesion</router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Navbar",
        data(){
            return{
                
            }
        },
        methods: {
        },

    }
</script>

<style lang="scss" scoped>
    .navbar{
        height: 150px;
    }

    .button-menu{
        background-color: transparent;
    }

    .subMenu{
        display: flex;
        flex-direction: column;
        position: absolute;
        left: 870px;

    }
</style>