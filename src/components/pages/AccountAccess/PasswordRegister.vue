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
                                <b-form-input v-model="userName" id="name" type="text" placeholder="Nombre de usuario" />
                            </b-col>
                        </b-row>
                    </b-form-group>

                    <!-- Email Input -->
                    <b-form-group class="text-dark text-left mt-3" id="email" label="Correo electrónico:" label-for="email">
                        <b-row>
                            <b-icon class="ml-3" icon="envelope-fill" font-scale="2"></b-icon>
                            <b-col>
                                <b-form-input v-model="email" id="email" type="email" placeholder="Correo Electrónico" />
                            </b-col>
                        </b-row>
                    </b-form-group>
                    
                    <!-- Password Input -->
                    <b-form-group class="text-dark text-left mt-3" id="password" label="Contraseña:" label-for="password">
                        <b-row>
                            <b-icon class="ml-3" icon="file-lock2-fill" font-scale="2"></b-icon>
                            <b-col>
                                <b-form-input v-model="password" id="password" type="password" placeholder="Contraseña" />
                            </b-col>
                        </b-row>
                    </b-form-group>

                    <!-- Repeat Password Input -->
                    <b-form-group class="text-dark text-left mt-3" id="password" label="Repite la contraseña" label-for="repeat-password">
                        <b-row>
                            <b-icon class="ml-3" icon="file-lock2-fill" font-scale="2"></b-icon>
                            <b-col>
                                <b-form-input v-model="repeatPassword" id="repeat-password" type="password" placeholder="Repite la contraseña" />
                            </b-col>
                        </b-row>
                    </b-form-group>

                    <!-- Errors Section -->
                    <div v-if="errorMessage" class="mb-3 mt-5">
                        <b-alert class="text-center" show variant="danger">{{ errorMessage }}</b-alert>
                    </div>
                    
                    <!-- Action buttons -->
                    <div class="d-flex justify-content-between mt-5">
                        <b-button @click="SignUp()" variant="info">Registrarse</b-button>
                        <b-button size="sm" variant="link" @click="returnToRegisterMood()" >Regresar a opciones de registro</b-button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from '../../../plugins/firebase';
import { validateEmail } from '../../../utils/validations';

export default {
    name: 'PasswordRegister',
    data() {
        return {
            userName: '',
            email: '',
            password: '',
            repeatPassword: '',
            errorMessage: '',
        }
    },
    methods: {
        async SignUp(){
            this.errorMessage = '';

            if(!this.userName.trim() || this.userName.trim().length < 3) {
                this.errorMessage = 'Ingresa un nombre de usuario valido, debe de ser mayor a 3 caracteres';
                return
            }
            if(!validateEmail(this.email)) {
                this.errorMessage = 'Ingresa un email valido';
                return
            }
            if(this.password.length < 8){
                this.errorMessage = 'La contraseña debe tener al menos 8 caracteres';
                return
            }
            if(this.password !== this.repeatPassword){
                this.errorMessage = 'Las contraseñas no coinciden';
                return
            }

            try {
                const { user } = await firebase.auth().createUserWithEmailAndPassword(this.email, this.password);
                await user.updateProfile({ displayName: this.userName });
            } catch (error) {
                if(error.code === 'auth/email-already-in-use') {
                    this.errorMessage = 'El email ya  ha sido registrado anteriormente';
                }
            }
        },
        returnToRegisterMood(){
            this.eventHub.$emit('change-mood', '');
        },
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