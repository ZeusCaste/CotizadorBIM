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
import ImgCarousell from './ImgCarousell.vue';

export default {
    name: 'Constructions',
    components: {
        ImgCarousell
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