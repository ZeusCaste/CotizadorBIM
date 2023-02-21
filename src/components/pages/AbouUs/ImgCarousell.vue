<template>
    <div id="carouselExampleFade" class="carousel slide carousel-fade" data-ride="carousel">
        <div class="carousel-inner">
            <div 
                v-for="(construction, idx) in activatedConstruction" 
                :key="construction.url" 
                class="carousel-item" 
                :class="idx === 0 && 'active'"
            >
                <img 
                    v-if="construction.type === 'image'" 
                    :src="construction.url" 
                    class="d-block w-75 img-fluid mx-auto" 
                    alt="..."
                >
                <video 
                    v-if="construction.type === 'video'" 
                    :src="construction.url"
                    controls
                ></video>
            </div>
            <!-- <div class="carousel-item">
                <img src="../../../media/images/mapsCarousell/map-0002.jpg" class="d-block w-75 img-fluid mx-auto" alt="...">
            </div> -->
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

export default {
    name: 'ImgCarousell',
    props: {
        construction: Array
    },
    beforeMount(){
        this.betweenVideosAndImages();
    },
    data(props){
        return {
            activatedConstruction: props.construction
        }
    },
    methods: {
        betweenVideosAndImages(){
            this.activatedConstruction = this.activatedConstruction.map((element) => {
                const element_array = element.split('.');
                if(element_array[5].startsWith('jpg') || element_array[5].startsWith('png')){
                    return { type: 'image', url: element }
                }

                if(element_array[5].startsWith('mp4')){
                    return { type: 'video', url: element };
                }
            });
        }
    }
}
</script>

<style lang="scss" scoped>
    .carousel-control-next, .carousel-control-prev {
        width: 10%;
    }

    .carousel-item {
        text-align: center;
    }

    @media (max-width: 375px){
        video {
            width: 200px;
        }
    }

    @media (min-width: 375px) and (max-width: 450px) {
        video {
            width: 250px;
        }
    }

    @media (min-width: 450px) and (max-width: 600px) {
        video {
            width: 330px;
        }
    }

    @media (min-width: 600px) and (max-width: 750px) {
        video {
            width: 450px;
        }
    }

    @media (min-width: 750px) and (max-width: 900px) {
        video {
            width: 550px;
        }
    }

    @media (min-width: 900px) and (max-width: 1150px) {
        video {
            width: 680px;
        }
    }

    @media (min-width: 1150px) and (max-width: 1300px) {
        video {
            width: 880px;
        }
    }

    @media (min-width: 1300px) and (max-width: 1450px) {
        video {
            width: 1000px;
        }
    }

    @media (min-width: 1450px) and (max-width: 1600px) {
        video {
            width: 1120px;
        }
    }
    
    @media (min-width: 1600px){
        video {
            width: 1240px;
        }
    }
</style>