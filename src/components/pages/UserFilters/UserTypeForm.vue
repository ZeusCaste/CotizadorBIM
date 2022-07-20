<template>
    <div>
        <h3><span>Nombre Completo: </span>{{ displayName }}</h3>
        <h3><span>Email: </span>{{ email }}</h3>
        <h3><span>Email verificado: </span>{{ emailVerified ? 'Si' : 'No' }}</h3>
        <h3><span>Numero Telefonico: </span>{{ phoneNumber }}</h3>
    </div>
</template>

<script>
import firebase from '../../../plugins/firebase';


export default {
    name: 'UserTypeForm',
    created() {
        this.getCurrentUser();
    },
    data() {
        return {
            displayName: '',
            email: '',
            emailVerified: false,
            phoneNumber: '',
            userType: '',
        }
    },
    methods: {
        getCurrentUser(){
            const { displayName, email, emailVerified, phoneNumber } = firebase.auth().currentUser;
            this.displayName = displayName;
            this.email = email;
            this.emailVerified = emailVerified;
            this.phoneNumber = phoneNumber;
        }
    }
}
</script>

<style>

</style>