<template>
    <div>
        <b-table
            :fields="fields"
            :items="items"
            striped
            bordered
            foot-clone
            hover
            head-variant="dark"
            table-variant="light"
        >
            
        </b-table>
    </div>
</template>

<script>
import firebase from '../../../plugins/firebase';

export default {
    name: "QuotationsTable",
    data(){
        return{
            fields: [
                {'label': "ID", 'key': 'id', 'sortable': false},
                {'label': "Nombre", 'key': 'name', 'sortable': true},
                {'label': "Correo", 'key': 'email', 'sortable': true},
                {'label': "Fecha", 'key': 'date', 'sortable': true},
                {'label': "Enlace", 'key': 'link', 'sortable': false},
            ],
            items: [],
        }
    },
    created(){
        this.getQuotations();
    },
    methods: {
        getQuotations(){
            try {
                const ref= firebase.firestore().collection('quotations');
                ref.onSnapshot((snapshot)=> {
                    snapshot.forEach((doc)=> {
                        // console.log("id: " + doc.id + " data: " + doc.data());
                        this.items.push({ 'id': doc.id, ...doc.data() });
                    })
                })
            } catch (error) {
                console.log(error);
            }

        }
    }
}
</script>

<style>

</style>