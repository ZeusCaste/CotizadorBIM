<template>
    <div class="container">
        <b-button variant="info" @click="logOut()"> User </b-button>
        <PasswordForm v-if="signInProvider === 'password'"/>
        <GoogleForm v-if="signInProvider === 'google'" />
        <FacebookForm v-if="signInProvider === 'facebook'" />
    </div>
</template>

<script>
import firebase from '../plugins/firebase';
import PasswordForm from '../components/pages/UserFilters/PasswordForm.vue';
import GoogleForm from '../components/pages/UserFilters/GoogleForm.vue';
import FacebookForm from '../components/pages/UserFilters/FacebookForm.vue';

export default {
    name: 'UserFilters',
    components: {
        PasswordForm,
        GoogleForm,
        FacebookForm,
    },
    data() {
        return {
            signInProvider: '',
        }
    },
    created(){
        this.getCurrentUser();
    },
    methods: {
        getCurrentUser(){
            const currentUser = firebase.auth().currentUser;
            if(!currentUser){
                this.$router.push({ name: AccountAccess });
                return
            }

            currentUser.getIdTokenResult()
                // idTokenResult es un objeto no iterable
                .then((idTokenResult) => {
                    if(idTokenResult.signInProvider === 'password') { return this.signInProvider = 'password' }
                    if(idTokenResult.signInProvider === 'google.com') { return this.signInProvider = 'google' }
                    if(idTokenResult.signInProvider === 'facebook.com') { return this.signInProvider = 'facebook' }
                })
                .catch(error => { console.log(error) });
        },
        logOut(){
            firebase.auth().signOut().then((result) => {
                console.log('Signed Out User');
            });
        }
    }
}
</script>

<style>

</style>