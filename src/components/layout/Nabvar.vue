<template>
    <div>
        <nav class="navbar navbar-expand-lg" style="background-color: #000; z-index: 1;">
            <div class="ml-3 col-xl-5 col-lg-4 col-md-6 col-sm-8 col-10">
                <router-link to="/">
                    <b-img 
                        :src="require('../../media/images/BIM-logo-2.jpg')" 
                        fluid 
                        alt="Responsive image"
                        width="90%"
                    ></b-img>
                    <b-img 
                        :src="require('../../media/images/LetrasLOGO.jpg')" 
                        fluid 
                        alt="Responsive image"
                        width="180%"
                    ></b-img>
                </router-link>
            </div>
            <b-button 
                id="collapse-button"
                class="navbar-toggler" 
                variant="warning" 
                type="button" 
                data-toggle="collapse" 
                data-target="#navbarSupportedContent" 
                aria-controls="navbarSupportedContent" 
                aria-expanded="false" 
                aria-label="Toggle navigation"
            >
                <b-icon icon="list" variant="warning"></b-icon>
            </b-button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <div class="menu navbar-nav mr-auto">
                    <router-link 
                        @click.native="changeOptionMenu('create-quotation')" 
                        to="/create-quotation" 
                        class="nav-item btn btn-outline-warning mx-2"
                        :class="optionMenuActivated === 'create-quotation' && 'btn-warning text-dark font-weight-bold'"
                    >Arma tu cotización</router-link>
                    <router-link 
                        @click.native="changeOptionMenu('collaborate-with-us')"
                        to="/collaborate-with-us" 
                        class="nav-item btn btn-outline-warning mx-2"
                        :class="optionMenuActivated === 'collaborate-with-us' && 'btn-warning text-dark font-weight-bold'"
                    >Colabora con nosotros</router-link>
                    <router-link 
                        to="/" 
                        class="nav-item btn btn-outline-warning mx-2"
                        @click.native="changeOptionMenu('about-us')"
                        :class="optionMenuActivated === 'about-us' && 'btn-warning text-dark font-weight-bold'"
                    >Sobre nosotros</router-link>
                    <router-link 
                        to="/account-access" 
                        class="nav-item btn btn-outline-warning mx-2"
                        @click.native="changeOptionMenu('account-access')"
                        :class="optionMenuActivated === 'account-access' && 'btn-warning text-dark font-weight-bold'"
                    >{{ authenticated ? "Mi Sesión" : "Iniciar Sesión" }}</router-link>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
    import firebase from '../../plugins/firebase';
    import SocialNetworkNavbar from './SocialNetworkNavbar.vue';

    export default {
        name: "Navbar",
        components: {
            SocialNetworkNavbar
        },
        created(){
            firebase.auth().onAuthStateChanged((user)=> {
                if(user){ this.authenticated= true; }
                else{ this.authenticated= false; }
            });
        },
        data(){
            return{
                authenticated: false,
                optionMenuActivated: 'AboutUs'
            }
        },
        methods: {
            changeOptionMenu(option){
                this.optionMenuActivated= option;
                if(window.screen.width < 992){
                    document.getElementById('collapse-button').click();
                }
            }
        },
        watch: {
            $route(to, from){
                let routeArre = to.fullPath.split('/');
                
                if( routeArre.includes('account') ){ this.changeOptionMenu('account-access'); }
                if( to.fullPath === '/'){ this.changeOptionMenu('about-us'); }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .navbar{
        height: 120px;
        background: #000;
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
        background: #000;
        border-radius: 15px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        width: 75px;
        height: 200px;
        margin-left: 5px;
        margin-bottom: 3px;
    }
</style>