<template>
    <div>
        <b-nav vertical pills >
            <div v-for="(menuComponent, idx) in menuComponents" :key="idx">
                <b-button class="text-left mt-1" block variant="warning">{{ menuComponent }}</b-button>
            </div>
            <!-- {{ menuComponents }}
            <b-nav-item active active-class="bg-info" class="bg-warning">Active</b-nav-item>
            <b-nav-item>Link</b-nav-item>
            <b-nav-item>Another Link</b-nav-item>
            <b-nav-item disabled>Disabled</b-nav-item> -->
        </b-nav>
    </div>
</template>

<script>
export default {
    name: "NabvarSession",
    props: {
        menuComponents: Array,
    }
}
</script>

<style>

</style>