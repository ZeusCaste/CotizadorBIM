<template>
    <div class="mt-5">
        <div>
            <p><strong>Name: </strong> {{ user && user.displayName }}</p>
            <p><strong>Correo: </strong> {{ user && user.email }}</p>
            <p><strong>Tipo de usuario: </strong> {{ user && user.customClaims.userType === 'partner' && 'Colaborador' }}</p>
            <div class="mt-5">
                <h2 class="mb-2">Datos Personales</h2>
                <p><strong>Fecha de Nacimiento: </strong>{{ firestoreUserData && firestoreUserData.bornDate }}</p>
                <p><strong>CURP: </strong>{{ firestoreUserData && firestoreUserData.curp }}</p>
                <p><strong>Actividad Solicitada: </strong>{{ firestoreUserData && firestoreUserData.requestedActivity }}</p>
                <div>
                    <h3 class="text-center">Dirección</h3>
                    <div>
                        <div class="row">
                            <div class="col-4">
                                <p><strong>Calle: </strong>{{ address && address.street }}</p>
                            </div>
                            <div class="col-4">
                                <p><strong>Numero: </strong> Exterior: {{ address && address.extNumber }} Interior: {{ address && address.intNumber }}</p>
                            </div>
                            <div class="col-4">
                                <p><strong>Colonia: </strong>{{ address && address.neighborhood }}</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-3">
                                <p><strong>Delegación: </strong>{{ address && address.delegation }}</p>
                            </div>
                            <div class="col-3">
                                <p><strong>Ciudad: </strong>{{ address && address.city }}</p>
                            </div>
                            <div class="col-3">
                                <p><strong>Estado: </strong>{{ address && address.state }}</p>
                            </div>
                            <div class="col-3">
                                <p><strong>CP: </strong>{{ address && address.cp }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="my-5">
                    <h3>Formación Académica</h3>
                    <div v-for="(ac, idx) in academicBackground" :key="idx" class="my-3">
                        <div class="row">
                            <div class="col-6">
                                <p><strong>Nivel Académico: </strong>{{ ac.academicLevel }}</p>
                            </div>
                            <div class="col-6">
                                <p><strong>Especialidad: </strong>{{ ac.specialty }}</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-6">
                                <p><strong>Institución: </strong>{{ ac.institution }}</p>
                            </div>
                            <div class="col-6">
                                <p><strong>Inicio: </strong>{{ ac.startPeriod }}</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-6">
                                <p><strong>Finalización: </strong>{{ ac.actualLevel ? 'En curso': ac.endPeriod }}</p>
                            </div>
                            <div class="col-6">
                                <p><strong>Certificado: </strong>{{ ac.cert }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from '../../../plugins/firebase.js';

export default {
    name: 'MyPerfilPartner',
    created() {
        this.getUserData();
    },
    data() {
        return {
            user: null,
            firestoreUserData: null,
            address: null,
            academicBackground: null
        }
    },
    methods: {
        async getUserData() {
            const getUpdatedUserDataFunction = firebase.functions().httpsCallable('getUpdatedUserData');
            const { data } = await getUpdatedUserDataFunction();
            this.user = data;
            await this.getUserDataFromFirestore(data.uid);
        },
        async getUserDataFromFirestore(uid) {
            const docRef = firebase.firestore().collection('partners').doc(uid);
            const data = await docRef.get();
            const { address, academicBackground, workExperience, ...response } = data.data();
            this.firestoreUserData = response;
            this.address = address;
            this.academicBackground = academicBackground;
        }
    }
}
</script>

<style>

</style>