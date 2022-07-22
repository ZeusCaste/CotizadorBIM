<template>
    <div class="col-md-12 col-xl-3 col-sm-12 text-center">
        <b-icon icon="check-circle-fill" style="width: 80px; height: 80px;" variant="warning"></b-icon>
        <h3 class="text-white font-weight-bolder text-warning mt-3">{{ title }}</h3>
        <h4 class="text-white font-weight-light mt-3">{{ description }}</h4>
    </div>
</template>

<script>
export default {
    name: 'Card',
    props: {
        title: { type: String },
        description: { type: String},
    }
}
</script>

<style>

</style>