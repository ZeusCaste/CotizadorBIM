<template>
    <div id="app">
        <div class="centered-content navbar navbar-dark px-3" style="background-color: #000">
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
            <div class="fixed-top social-networks">
                <b-col class=" d-flex flex-row justify-content-center">
                    <br>
                    <a class="mx-4" href="https://www.facebook.com/BIMSolucionesTacnologicas">
                        <b-icon icon="facebook" scale="2"></b-icon>
                    </a>
                    <br>
                    <br>
                    <a class="mx-4" href="https://www.instagram.com/bim_soluciones_tecnologicas">
                        <b-icon icon="instagram" scale="2" variant="warning"></b-icon>
                    </a>
                    <br>
                    <br>
                    <a class="mx-4" href="contacto@bimtech.solutions">
                        <b-icon icon="envelope" scale="2"></b-icon>
                    </a>
                    <br>
                </b-col>
            </div>
            <div class="fixed-top menu">
                <router-link 
                    @click.native="changeOptionMenu('Arma tu cotizacion')" 
                    to="/arma-tu-cotizacion" 
                    class="btn btn-outline-warning mx-2"
                    :class="optionMenuActivated === 'Arma tu cotizacion' && 'btn-warning text-dark font-weight-bold'"
                >Arma tu cotización</router-link>
                <router-link 
                    @click.native="changeOptionMenu('Colabora con nosotros')"
                    to="/colabora-con-nosotros" 
                    class="btn btn-outline-warning mx-2"
                    :class="optionMenuActivated === 'Colabora con nosotros' && 'btn-warning text-dark font-weight-bold'"
                >Colabora con nosotros</router-link>
                <router-link 
                    to="/sobre-nosotros" 
                    class="btn btn-outline-warning mx-2"
                    @click.native="changeOptionMenu('Sobre nosotros')"
                    :class="optionMenuActivated === 'Sobre nosotros' && 'btn-warning text-dark font-weight-bold'"
                >Sobre nosotros</router-link>
                <router-link 
                    to="/acceso-cuenta" 
                    class="btn btn-outline-warning mx-2"
                    @click.native="changeOptionMenu(authenticated ? 'Mi Sesion' : 'Iniciar Sesion')"
                    :class="(optionMenuActivated === 'Iniciar Sesion' || optionMenuActivated === 'Mi Sesion') && 'btn-warning text-dark font-weight-bold'"
                >{{ authenticated ? "Mi Sesión" : "Iniciar Sesión" }}</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from '../../plugins/firebase';

    export default {
        name: "Navbar",
        created(){
            firebase.auth().onAuthStateChanged((user)=> {
                if(user) this.authenticated= true;
                else this.authenticated= false;
            });
        },
        data(){
            return{
                authenticated: false,
                optionMenuActivated: 'Sobre nosotros'
            }
        },
        methods: {
            changeOptionMenu(option){
                this.optionMenuActivated= option;
            }
        },


    }
</script>

<style lang="scss" scoped>
    .navbar{
        height: 120px;
    }

    .menu{
        left: 750px;
        top: 20px;
        background: #000;
        padding: 20px;
        margin: 0 20px;
        border-radius: 15px;
    }

    .subMenu{
        display: flex;
        flex-direction: column;
        position: absolute;
        left: 870px;
    }

    .social-networks{
        width: 250px;
        height: 75px;
        left: 400px;
        top: 20px;
        background: #000;
        padding: 20px;
        margin: auto 20px;
        border-radius: 15px;
    }
</style>