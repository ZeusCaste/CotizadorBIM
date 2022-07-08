<template>
    <div class="full-container d-flex justify-content-center py-5">
        <div class="custom-container">
            <div>
            <h1>Registro con Correo y Contraseña</h1>
                <form>
                    <!-- User Name Input -->
                    <b-form-group class="text-dark text-left mt-3" id="name" label="Nombre de usuario:" label-for="name">
                        <b-row>
                            <b-icon class="ml-3" icon="person-square" font-scale="2"></b-icon>
                            <b-col>
                                <b-form-input id="name" type="text" placeholder="Nombre de usuario" />
                            </b-col>
                        </b-row>
                    </b-form-group>

                    <!-- Email Input -->
                    <b-form-group class="text-dark text-left mt-3" id="email" label="Correo electrónico:" label-for="email">
                        <b-row>
                            <b-icon class="ml-3" icon="envelope-fill" font-scale="2"></b-icon>
                            <b-col>
                                <b-form-input id="email" type="email" placeholder="Correo Electrónico" />
                            </b-col>
                        </b-row>
                    </b-form-group>
                    
                    <!-- Password Input -->
                    <b-form-group class="text-dark text-left mt-3" id="password" label="Contraseña:" label-for="password">
                        <b-row>
                            <b-icon class="ml-3" icon="file-lock2-fill" font-scale="2"></b-icon>
                            <b-col>
                                <b-form-input id="password" type="password" placeholder="Contraseña" />
                            </b-col>
                        </b-row>
                    </b-form-group>

                    <!-- Repeat Password Input -->
                    <b-form-group class="text-dark text-left mt-3" id="password" label="Repite la contraseña" label-for="repeat-password">
                        <b-row>
                            <b-icon class="ml-3" icon="file-lock2-fill" font-scale="2"></b-icon>
                            <b-col>
                                <b-form-input id="repeat-password" type="password" placeholder="Repite la contraseña" />
                            </b-col>
                        </b-row>
                    </b-form-group>
                    
                    <!-- Action buttons -->
                    <div class="d-flex justify-content-between mt-5">
                        <b-button variant="info">Registrarse</b-button>
                        <b-button size="sm" variant="link" @click="returnToRegisterMood()">Regresar a opciones de registro</b-button>
                    </div>
                </form>
            </div>
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

<style lang="scss" scoped>
    .full-container{
        background: rgba(250, 232, 41, 0.4);

        .custom-container {
            width: 35%;
            padding: 10px 20px;
            border: 5px solid #000;
            border-radius: 20px;
        }
    }
</style>