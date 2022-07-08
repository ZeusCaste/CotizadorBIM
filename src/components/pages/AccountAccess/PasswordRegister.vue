<template>
    <div>
        <h1>Registro con Correo y contraseña</h1>
        <div>
            <b-button variant="dark" @click="returnToRegisterMood()">Regresar a opciones de registro</b-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PasswordRegister',
    data() {
        return {

        }
    },
    methods: {
        returnToRegisterMood(){
            this.eventHub.$emit('change-mood', '');
        }
    }
}
</script>

<style>

</style>