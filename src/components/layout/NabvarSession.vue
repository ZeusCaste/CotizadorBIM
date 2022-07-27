<template>
    <div>
        <nav class="navbar navbar-expand-lg">
            <button 
                class="btn btn-dark navbar-toggler bg-dark" 
                type="button" 
                data-toggle="collapse" 
                data-target="#navbarSupportedContent-user" 
                aria-controls="navbarSupportedContent" 
                aria-expanded="false" 
                aria-label="Toggle navigation"
            >
                <b-icon variant="warning" icon="person-circle"></b-icon>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent-user">
                <ul class="navbar-nav mr-auto row">
                    <li class="nav-item w-100" v-for="(menuName, idx) in menuComponents" :key="idx">
                        <b-button 
                            class="text-left mt-1 font-weight-bold shadow"
                            :class="selectedMenu == menuName ? 'actived-menu' : 'desactivedMenu'"
                            variant="warning"
                            block
                            @click="showContent(menuName)"
                        > 
                            {{ menuName }}
                        </b-button>
                    </li>
                </ul>
            </div>
        </nav>
        <!-- <b-nav vertical pills >
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
        </b-nav> -->
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