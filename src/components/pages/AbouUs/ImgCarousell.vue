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
                console.log(element_array[5]);
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

<style>

</style>