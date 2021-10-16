<template>
    <div id="app">
        <div class="navbar navbar-dark" style="background-color: #000">
            <div class="ml-3">
                <router-link to="/sobre-nosotros"><b-img 
                    :src="require('../../media/images/BIM-logo-2.jpg')" 
                    fluid 
                    alt="Responsive image"
                    width="80"
                ></b-img>
                <b-img 
                    :src="require('../../media/images/LetrasLOGO.jpg')" 
                    fluid 
                    alt="Responsive image"
                    width="200"
                ></b-img></router-link>
            </div>
            <div class="fixed-top menu">
                <router-link to="/arma-tu-cotizacion" class="button-menu btn btn-outline-warning mx-2">Arma tu cotización</router-link>
                <router-link to="/colabora-con-nosotros" class="btn btn-outline-warning mx-2">Colabora con nosotros</router-link>
                <router-link to="/sobre-nosotros" class="btn btn-outline-warning mx-2">Sobre nosotros</router-link>
                <router-link to="/iniciar-sesion" class="btn btn-outline-warning mx-2">Inicia Sesión</router-link>
            </div>
        </div>
        <Particles
                id="tsparticles"
                :particlesInit="particlesInit"
                :particlesLoaded="particlesLoaded"
                :options="{
                    background: {
                        color: {
                            value: '#fff'
                        },
                        position: '50% 50%',
                        repeat : 'no-repeat',
                        size : 'cover',
                        opacity : 1
                    },
                    fpsLimit: 60,
                    interactivity: {
                        detectsOn: 'canvas',
                        events: {
                            onClick: {
                                enable: true,
                                mode: 'push'
                            },
                            onHover: {
                                enable: true,
                                mode: 'repulse'
                            },
                            resize: true
                        },
                        modes: {
                            bubble: {
                                distance: 400,
                                duration: 2,
                                opacity: 0.8,
                                size: 40
                            },
                            push: {
                                quantity: 4
                            },
                            repulse: {
                                distance: 200,
                                duration: 0.4
                            }
                        }
                    },
                    particles: {
                        color: {
                            value: '#FCC301'
                        },
                        links: {
                            color: '#000',
                            distance: 150,
                            enable: true,
                            opacity: 0.5,
                            width: 1
                        },
                        collisions: {
                            enable: true
                        },
                        move: {
                            direction: 'none',
                            enable: true,
                            outMode: 'bounce',
                            random: false,
                            speed: 1,
                            straight: false
                        },
                        number: {
                            density: {
                                enable: true,
                                value_area: 800
                            },
                            value: 80
                        },
                        opacity: {
                            value: 0.5
                        },
                        shape: {
                            type: 'square'
                        },
                        size: {
                            random: true,
                            value: 5
                        }
                    },
                    detectRetina: true
                }"
        />
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
        height: 120px;
    }

    .menu{
        left: 600px;
        top: 20px;
        background: #000;
        padding: 20px;
        margin: 0 20px;
        border-radius: 15px;
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