<template>
    <div class="footer-container">
        <div class="custom-footer row">
            <div class="col-xl-3 col-lg-4 col-12 col-md-12 col-sm-12 text-center mt-4">
                &copy; {{ actualYear.getFullYear() }} BIM Tech Solutions || Todos los derechos reservados
            </div>
            <div class="col-xl-3 col-lg-4 col-12 col-md-12 col-sm-12 text-center mt-4">
                <SocialNetworkNavbar />
            </div>
            <div class="col-xl-3 col-lg-4 col-12 col-md-12 col-sm-12 text-center font-weight-bolder mt-4">
                <a href="mailto:contacto@bimtech.solutions?Subject=Interesado%20en%20saber%20mas%20de%20ustedes">
                    contacto@bimtech.solutions
                </a>
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
            actualYear: new Date(),
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