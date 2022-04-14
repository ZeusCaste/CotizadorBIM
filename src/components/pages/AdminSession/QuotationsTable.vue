<template>
    <div>
        <div class="container row">
            <div class="col-lg-6 col-md-6 col-sm-12">
                <b-row class="d-flex mx-3 mb-3">
                    <div class="mx-2 mt-1">
                        <label for="mostrar">Mostrar</label>
                    </div>
                    <div class="mx-2">
                        <b-form-select name="mostrar" v-model="mostrar" :options="showOptions"></b-form-select>
                    </div>
                </b-row>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12">
            </div>
        </div>
        <b-table
            :fields="fields"
            :items="items"
            striped
            bordered
            foot-clone
            hover
            head-variant="dark"
            table-variant="light"
            :per-page="mostrar"
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
            showOptions: [5, 10, 15, 20],
            mostrar: 10,
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