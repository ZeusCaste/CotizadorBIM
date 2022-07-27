<template>
    <div>
        <div class="container row my-sm-5 my-5">
            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-11 col-11">
                <b-row class="d-flex mx-auto mb-3">
                    <div class="mx-2 mt-1">
                        <label for="mostrar">Mostrar</label>
                    </div>
                    <div class="mx-2">
                        <b-form-select name="mostrar" v-model="mostrar" :options="showOptions"></b-form-select>
                    </div>
                </b-row>
            </div>
            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-11 col-11">
                <div class="w-75 mx-auto">
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
            responsive
        >
            <template #table-busy>
                <div class="text-center text-danger my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong>Loading...</strong>
                </div>
            </template>
            <template #cell(registerDate)="data">
                {{ moment(data.item.registerDate).format('DD/MM/YYYY') }}
            </template>
        </b-table>
        <div class="mx-3 d-flex justify-content-between row">
            <div class="mx-2 col-xl-5 col-lg-4 col-md-6 col-sm-12 col-12">
                <p>Mostrando del {{ currentPage * mostrar - mostrar + 1 }} al {{ currentPage * mostrar }} de {{ getItemsLength }}</p>
            </div> 
            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
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
import moment from 'moment';
import firebase from '../../../plugins/firebase';

export default {
    name: "QuotationsTable",
    data(){
        return{
            showOptions: [5, 10, 15, 20],
            mostrar: 10,
            buscarRegistro: '',
            fields: [
                {'label': "Nombre", 'key': 'name', 'sortable': true},
                {'label': "Correo", 'key': 'email', 'sortable': true},
                {'label': "Fecha de registro", 'key': 'registerDate', 'sortable': true},
                {'label': "Visualizar Registro", 'key': 'link', 'sortable': false},
            ],
            items: [],
            currentPage: 1,
            isBusy: false,
            moment
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