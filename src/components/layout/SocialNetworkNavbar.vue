<template>
    <div class="fixed-bottom">
        <b-navbar class="social-network-navbar" toggleable="lg">
            <b-navbar-toggle target="nav-collapse" class="btn btn-dark" >
                <b-icon icon="globe2" variant="dark"></b-icon>
            </b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav class="navbar-items">
                    <b-nav-item href="https://www.facebook.com/BIMSolucionesTacnologicas" class="m-2">
                        <b-icon icon="facebook" scale="2" variant="primary"></b-icon>
                    </b-nav-item>
                    <b-nav-item href="https://www.instagram.com/bim_soluciones_tecnologicas" class="m-2">
                        <b-icon icon="instagram" scale="2" variant="warning"></b-icon>
                    </b-nav-item>
                    <b-nav-item href="contacto@bimtech.solutions" class="m-2">
                        <b-icon icon="envelope" scale="2" variant="danger"></b-icon>
                    </b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
export default {
    name: 'SocialNetworkNavbar'
}
</script>

<style lang="scss" scoped>
</style>