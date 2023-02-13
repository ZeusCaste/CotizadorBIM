<template>
    <div class="mt-5">
        <div>
            <h4 class="construction-title">Galería de proyectos</h4>
        </div>
        <div :hidden="hiddenProjects" class="project-container">
            <div v-for="project in projects" :key="project" class="m-3">
                <b-button 
                    class="construction-button" 
                    variant="outline-warning"
                    @click="displayHiddenProjects(project)"
                >
                    {{ project }}
                </b-button>
            </div>
        </div>
        <div :hidden="!hiddenProjects" class="mx-4">
            <div>
                <h4 class="font-weight-bolder">{{ activedGalery }}</h4>
                <b-button class="showCarousell" variant="warning" @click="showCarousell()">X</b-button>
            </div>
            <div>
                <ImgCarousell />
            </div>
        </div>
    </div>
</template>

<script>
import firebase from '../../../plugins/firebase';
import ImgCarousell from './ImgCarousell.vue';

export default {
    name: 'Constructions',
    components: {
        ImgCarousell
    },
    created(){
        this.getFilesFromFirebaseStorage();
    },
    data(){
        return {
            projects: [
                'Arquitectura', 
                'Instalación hidrosanitaria', 
                'Instalación Eléctrica',
                'Aire acondicionado sin balance térmico',
                'Aire acondicionado con balance térmico',
                'Ventilación y Extracción',
                'Voz y Datos'
            ],
            hiddenProjects: false,
            activedGalery: ''
        }
    },
    methods: {
        displayHiddenProjects(galery){
            this.hiddenProjects = true;
            this.activedGalery = galery;
        },
        showCarousell(){
            this.hiddenProjects = false;
        },
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
            const ins_hidrosanitaria_ref = storageRef.child('Galeria/ins-hidrosanitaria');
            const proteccion_contra_incendios_ref = storageRef.child('Galeria/proteccion-contra-incendios');

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

            const ins_hidrosanitaria_files = await ins_hidrosanitaria_ref.list();
            ins_hidrosanitaria_files.items.forEach(async (element) => {
                console.log(await element.getDownloadURL());
            });

            const proteccion_contra_incendios_files = await proteccion_contra_incendios_ref.list();
            proteccion_contra_incendios_files.items.forEach(async (element) => {
                console.log(await element.getDownloadURL());
            });
        }
    }
}
</script>

<style lang="scss" scoped>
    .construction-title {
        margin-top: 20px;
        margin-bottom: 40px;
        margin-left: auto; 
        margin-right: auto;
        color: #000;
        opacity: unset;
        font-weight: bold;
        font-size: 6vw;
        text-align: center;
    }

    .construction-button {
        height: 25vw;
        width: 25vw;
        font-size: 3vw;
        border-radius: 50%;
        border-width: .5vw;
        font-weight: bolder;

        &:hover {
            color: #fff;
        }
    }

    .project-container {
        margin: 15px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
    }

    .showCarousell {
        border-radius: 50%;
        margin-bottom: 20px;
        font-weight: bold;
    }
</style>