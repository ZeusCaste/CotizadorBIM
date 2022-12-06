<template>
    <div class="container">
        <b-button variant="info" @click="logOut()"> User </b-button>
        <UserTypeForm />
    </div>
</template>

<script>
import firebase from '../plugins/firebase';
import UserTypeForm from '../components/pages/UserFilters/UserTypeForm.vue';

export default {
    name: 'UserFilter',
    components: {
        UserTypeForm,
    },
    async created(){
        this.signInFirebaseProvider = await this.getCurrentUser();
    },
    data() {
        return {
            signInFirebaseProvider: 'password',
        }
    },
    methods: {
        async getCurrentUser(){
            const currentUser = firebase.auth().currentUser;
            let provider = "";
            if(JSON.stringify(currentUser) === '{}'){
                this.$router.push({ name: AccountAccess });
                return
            }

            await currentUser.getIdTokenResult().then((idTokenResult) => {
                if(idTokenResult.signInProvider === 'password') {
                    provider = "password";
                    return
                }
                if(idTokenResult.signInProvider === 'google.com') { 
                    provider = 'google';
                    return
                }
                if(idTokenResult.signInProvider === 'facebook.com') { 
                    provider = 'facebook';
                    return
                }
            }).catch((error) => {
                console.log(error);
            });

            return provider;
        },
        logOut(){
            console.log('here');
            firebase.auth().signOut().then((result) => {
                console.log('Signed Out User');
            });
        }
    }
}
</script>

<style>

</style>