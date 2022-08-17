<template>
    <div class="footer-container">
        <div class="custom-footer row">
            <div class="col-xl-3 col-lg-4 col-12 col-md-12 col-sm-12 text-center mt-4">
                &copy; 2022 BIM Tech Solutions || Todos los derechos reservados
            </div>
            <div class="col-xl-3 col-lg-4 col-12 col-md-12 col-sm-12 text-center mt-4">
                <SocialNetworkNavbar />
            </div>
            <div class="col-xl-3 col-lg-4 col-12 col-md-12 col-sm-12 text-center font-weight-bolder mt-4">
                contacto@bimtech.solutions
            </div>
        </div>
    </div>
</template>

<script>
import SocialNetworkNavbar from '../layout/SocialNetworkNavbar.vue';


export default {
    name: "Footer",
    components: {
        SocialNetworkNavbar,
    },
    data(){
        return {

        }
    }
}
</script>

<style lang="scss" scoped>
    .custom-footer {
        width: 100%;
        height: auto;
        display: flex;
        justify-content: space-around;
        align-items: center;
        color: #fff;
        padding-top: 3%;
        padding-bottom: 3%;
    }

    .footer-container {
        background: #000;
    }
</style>