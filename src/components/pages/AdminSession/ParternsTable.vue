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
                <div class="w-50 m-auto">
                    <b-input placeholder="Buscar" v-model="buscarRegistro"></b-input>
                </div>
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
            :filter="buscarRegistro"
            :current-page="currentPage"
            :busy="isBusy"
        >
            <template #table-busy>
                <div class="text-center text-danger my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong>Loading...</strong>
                </div>
            </template>
        </b-table>
        <div class="container d-flex justify-content-between">
            <div class="mx-2">
                <p>Mostrando del {{ currentPage * mostrar - mostrar + 1 }} al {{ currentPage * mostrar }} de {{ getItemsLength }}</p>
            </div> 
            <div class="mx-2">
                <b-pagination
                    pills
                    v-model="currentPage"
                    :per-page="mostrar"
                    :total-rows="getItemsLength"
                >
                </b-pagination>
            </div>
        </div>
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
            buscarRegistro: '',
            fields: [
                {'label': "ID", 'key': 'id', 'sortable': false},
                {'label': "Nombre", 'key': 'name', 'sortable': true},
                {'label': "Correo", 'key': 'email', 'sortable': true},
                {'label': "Fecha de registro", 'key': 'registerDate', 'sortable': true},
                {'label': "Visualizar Registro", 'key': 'link', 'sortable': false},
            ],
            items: [],
            currentPage: 1,
            isBusy: false,
        }
    },
    created(){
        this.getPartners();
    },
    methods: {
        getPartners(){
            this.isBusy= true;
            try {
                const ref= firebase.firestore().collection('partners');
                ref.onSnapshot((snapshot)=> {
                    snapshot.forEach((doc)=> {
                        // console.log("id: " + doc.id + " data: " + doc.data());
                        this.items.push({ 'id': doc.id, ...doc.data() });
                    })
                });

            } catch (error) {
                console.log(error);
            }

            this.isBusy= false;
        }
    },
    computed: {
        getItemsLength(){
            return this.items.length;
        }
    }
}
</script>

<style>

</style>