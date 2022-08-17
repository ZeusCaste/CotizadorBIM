<template>
    <div class="footer-container">
        <div class="custom-footer row">
            <div class="col-xl-3 col-lg-4 col-12 col-md-12 col-sm-12 text-center mt-4">
                &copy; 2022 BIM Tech Solutions || Todos los derechos reservados
            </div>
            <div class="col-xl-3 col-lg-4 col-12 col-md-12 col-sm-12 text-center mt-4">
                Social NetWork
            </div>
            <div class="col-xl-3 col-lg-4 col-12 col-md-12 col-sm-12 text-center font-weight-bolder mt-4">
                contacto@bimtech.solutions
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Footer",
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
        padding-top: 5%;
        padding-bottom: 5%;
    }

    .footer-container {
        background: #000;
    }
</style>