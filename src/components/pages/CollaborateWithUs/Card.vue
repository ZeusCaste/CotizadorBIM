<template>
    <div class="col-md-12 col-xl-3 col-sm-12">
        <h3>{{ title }}</h3>
        <h3>{{ description }}</h3>
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