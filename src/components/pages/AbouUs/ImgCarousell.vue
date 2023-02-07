<template>
    <div id="carouselExampleFade" class="carousel slide carousel-fade" data-ride="carousel">
        <div class="carousel-inner">
            <div class="carousel-item active">
                <img src="../../../media/images/mapsCarousell/map-0001.jpg" class="d-block w-75 img-fluid mx-auto" alt="...">
            </div>
            <div class="carousel-item">
                <img src="../../../media/images/mapsCarousell/map-0002.jpg" class="d-block w-75 img-fluid mx-auto" alt="...">
            </div>
            <div class="carousel-item">
                <img src="../../../media/images/mapsCarousell/map-0003.jpg" class="d-block w-75 img-fluid mx-auto" alt="...">
            </div>
            <div class="carousel-item">
                <img src="../../../media/images/mapsCarousell/map-0004.jpg" class="d-block w-75 img-fluid mx-auto" alt="...">
            </div>
            <div class="carousel-item">
                <img src="../../../media/images/mapsCarousell/map-0005.jpg" class="d-block w-75 img-fluid mx-auto" alt="...">
            </div>
            <div class="carousel-item">
                <img src="../../../media/images/mapsCarousell/map-0006.jpg" class="d-block w-75 img-fluid mx-auto" alt="...">
            </div>
            <div class="carousel-item">
                <img src="../../../media/images/mapsCarousell/map-0007.jpg" class="d-block w-75 img-fluid mx-auto" alt="...">
            </div>
            <div class="carousel-item">
                <img src="../../../media/images/mapsCarousell/map-0008.jpg" class="d-block w-75 img-fluid mx-auto" alt="...">
            </div>
            <div class="carousel-item">
                <img src="../../../media/images/mapsCarousell/map-0009.jpg" class="d-block w-75 img-fluid mx-auto" alt="...">
            </div>
            <div class="carousel-item">
                <img src="../../../media/images/mapsCarousell/map-0010.jpg" class="d-block w-75 img-fluid mx-auto" alt="...">
            </div>
            <div class="carousel-item">
                <img src="../../../media/images/mapsCarousell/map-0011.jpg" class="d-block w-75 img-fluid mx-auto" alt="...">
            </div>
            <div class="carousel-item">
                <img src="../../../media/images/mapsCarousell/map-0012.jpg" class="d-block w-75 img-fluid mx-auto" alt="...">
            </div>
            <div class="carousel-item">
                <img src="../../../media/images/mapsCarousell/map-00013.jpg" class="d-block w-75 img-fluid mx-auto" alt="...">
            </div>
        </div>
        <button class="carousel-control-prev btn btn-info" type="button" data-target="#carouselExampleFade" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </button>
        <button class="carousel-control-next btn btn-info" type="button" data-target="#carouselExampleFade" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </button>
    </div>
</template>

<script>
import firebase from '../../../plugins/firebase';

export default {
    name: 'ImgCarousell',
    created(){
        this.getFilesFromFirebaseStorage();
    },
    data(){
        return {

        }
    },
    methods: {
        async getFilesFromFirebaseStorage(){
             // Creamos una referencia al servicio storage de firebase
            const storage = firebase.storage();
            //creamos una referencia 
            const storageRef = storage.ref();

            // Con nuestra referencia apuntamos a una ruta especifica
            const aire_acondicionado_balances_ref = storageRef.child('Galeria/a-acondicionado-con-balance');
            const arquitectura_ref = storageRef.child('Galeria/arquitectura');
            const edificacion_existente_ref = storageRef.child('Galeria/edificacion-existente');
            const energia_ref = storageRef.child('Galeria/energia');
            const estructura_ref = storageRef.child('Galeria/estructura');

            const aire_acondicionado_balances_files = await aire_acondicionado_balances_ref.list();
            aire_acondicionado_balances_files.items.forEach(async (element) => {
                console.log(await element.getDownloadURL());
            });

            const arquitectura_files = await arquitectura_ref.list();
            arquitectura_files.items.forEach(async (element) => {
                console.log(await element.getDownloadURL());
            });

            const edificacion_existente_files = await edificacion_existente_ref.list();
            edificacion_existente_files.items.forEach(async (element) => {
                console.log(await element.getDownloadURL());
            });

            const energia_files = await energia_ref.list();
            energia_files.items.forEach(async (element) => {
                console.log(await element.getDownloadURL());
            });

            const estructura_files = await estructura_ref.list();
            estructura_files.items.forEach(async (element) => {
                console.log(await element.getDownloadURL());
            });
        }
    }
}
</script>

<style>

</style>