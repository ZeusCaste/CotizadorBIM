<template>
    <div class="container">
        <b-button variant="info" @click="logOut()">User</b-button>
        <PasswordForm v-if="signInProvider === 'password'"/>
    </div>
</template>

<script>
import firebase from '../plugins/firebase';
import PasswordForm from '../components/pages/UserFilters/PasswordForm.vue';

export default {
    name: 'UserFilters',
    components: {
        PasswordForm,
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
            
            currentUser.getIdTokenResult().then((idTokenResult) => {
                if(idTokenResult.signInProvider === 'password'){ this.signInProvider = 'password' }
                
            }).catch(error => { console.log(error) });
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