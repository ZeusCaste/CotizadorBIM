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
        <div v-if="hiddenProjects" class="mx-4">
            <div>
                <h4 class="font-weight-bolder">{{ activedGalery }}</h4>
                <b-button class="showCarousell" variant="warning" @click="showCarousell()">X</b-button>
            </div>
            <div>
                <ImgCarousell :construction="activedConstruction" />
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
                'Aire acondicionado con balance térmico',
                'Arquitectura',
                'Edificación existente',
                'Energía', 
                'Estructura',
                'Instalación Hidrosanitaria',
                'Protección contra incendios'
            ],
            hiddenProjects: false,
            activedGalery: '',
            aire_acondicionado_balances_files_array: [],
            arquitectura_files_array: [],
            edificacion_existente_files_array: [],
            energia_files_array: [],
            estructura_files_array: [],
            ins_hidrosanitaria_files_array: [],
            proteccion_contra_incendios_files_array: [],
            activedConstruction: [],
        }
    },
    methods: {
        displayHiddenProjects(galery){
            this.hiddenProjects = true;
            this.activedGalery = galery;

            if(galery === 'Aire acondicionado con balance térmico'){
                this.activedConstruction = this.aire_acondicionado_balances_files_array;
                return
            }

            if (galery === 'Arquitectura'){
                this.activedConstruction = this.arquitectura_files_array;
                return
            }

            if(galery === 'Edificación existente'){
                this.activedConstruction = this.edificacion_existente_files_array;
                return;
            }

            if(galery === 'Energía'){
                this.activedConstruction = this.energia_files_array;
                return;
            }

            if(galery === 'Estructura'){
                this.activedConstruction = this.estructura_files_array;
                return;
            }

            if(galery === 'Instalación Hidrosanitaria'){
                this.activedConstruction = this.ins_hidrosanitaria_files_array;
                return;
            }

            if(galery === 'Protección contra incendios'){
                this.activedConstruction = this.proteccion_contra_incendios_files_array;
                return;
            }
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
                this.aire_acondicionado_balances_files_array.push(await element.getDownloadURL());
            });

            const arquitectura_files = await arquitectura_ref.list();
            arquitectura_files.items.forEach(async (element) => {
                this.arquitectura_files_array.push(await element.getDownloadURL());
            });

            const edificacion_existente_files = await edificacion_existente_ref.list();
            edificacion_existente_files.items.forEach(async (element) => {
                this.edificacion_existente_files_array.push(await element.getDownloadURL());
            });

            const energia_files = await energia_ref.list();
            energia_files.items.forEach(async (element) => {
                this.energia_files_array.push(await element.getDownloadURL());
            });

            const estructura_files = await estructura_ref.list();
            estructura_files.items.forEach(async (element) => {
                this.estructura_files_array.push(await element.getDownloadURL());
            });

            const ins_hidrosanitaria_files = await ins_hidrosanitaria_ref.list();
            ins_hidrosanitaria_files.items.forEach(async (element) => {
                this.ins_hidrosanitaria_files_array.push(await element.getDownloadURL());
            });

            const proteccion_contra_incendios_files = await proteccion_contra_incendios_ref.list();
            proteccion_contra_incendios_files.items.forEach(async (element) => {
                this.proteccion_contra_incendios_files_array.push(await element.getDownloadURL());
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