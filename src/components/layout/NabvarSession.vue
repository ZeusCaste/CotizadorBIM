<template>
    <div>
        <b-nav vertical pills >
            <div v-for="(menuName, idx) in menuComponents" :key="idx">
                <b-button 
                    class="text-left mt-1 font-weight-bold shadow"
                    :class="selectedMenu == menuName ? 'actived-menu' : 'desactivedMenu'"
                    variant="warning"
                    block 
                    @click="showContent(menuName)"
                >
                    {{ menuName }}
                </b-button>
            </div>
        </b-nav>
    </div>
</template>

<script>
export default {
    name: "NabvarSession",
    props: {
        menuComponents: Array,
        selectedMenu: String,
        setNewSelectedMenu: Function,
    },
    data(){
        return {

        }
    },
    methods: {
        showContent(newSelectedMenu){
            this.$props.setNewSelectedMenu(newSelectedMenu);
        }
    }
}
</script>

<style lang="scss" scoped>
    .actived-menu {
        border: 3px solid #000;
    }

    .desactivedMenu {
        background: rgb(241, 208, 109);
    }
</style>