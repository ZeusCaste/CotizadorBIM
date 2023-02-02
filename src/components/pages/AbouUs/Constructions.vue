<template>
    <div class="mt-5">
        <div>
            <h4 class="construction-title">Galería de proyectos</h4>
        </div>
        <div class="project-container">
            <div v-for="project in projects" :key="project" class="m-3">
                <b-button class="construction-button" variant="outline-warning">{{ project }}</b-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
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
            ]
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
</style>