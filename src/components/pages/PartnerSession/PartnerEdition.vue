<template>
    <div>
        <AddressEdition :address="address" />
    </div>
</template>

<script>
import firebase from '../../../plugins/firebase';
import AddressEdition from './AddressEdition.vue';

export default {
    name: 'PartnerEdition',
    components: {
        AddressEdition
    },
    props: {
        uid: String,
    },
    data() {
        return {
            address: {
                street: '',
                extNumber: '',
                intNumber: '',
                state: '',
                delegation: '',
                neighborhood: '',
                city: '',
                cp: '',
            }
        }
    },
    created() {
        this.getUserDataFromFirestore(this.uid);
    },
    methods: {
        async getUserDataFromFirestore(uid) {
            const docRef = firebase.firestore().collection('partners').doc(uid);
            const data = await docRef.get();
            const { address, academicBackground, workExperience, ...response } = data.data();
            this.firestoreUserData = response;
            this.address = address;
            this.academicBackground = academicBackground;
            this.workExperience = workExperience;
            console.log(address);
        },
    }
}
</script>

<style>

</style>