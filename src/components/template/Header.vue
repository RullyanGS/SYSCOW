<template>
    <header class="header">
        <h1 class="title">
            <strong>{{title}}</strong>
        </h1>
        <UserDropdown v-if="!hideUserDropdown" />
        <div class="icon" @click="toggleMenu">
            <i class="fa fa-question"></i>
        </div>
    </header>
</template>

<script>
import UserDropdown from './UserDropdown'

export default {
    name: 'Header',
    components: { UserDropdown },
    props: {
        title: String,
        hideUserDropdown: Boolean,
        hideToggle: Boolean
    },
    computed: {
    },
    methods: {
        toggleMenu() {
            this.$store.commit('toggleMenu')
        }
    }
    
}
</script>

<style>
    .header {
        grid-area: header;
        background: #0084DC;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    .title {
        font-size: 2.5em;
        color: #fff;
        font-weight: 100;
        flex-grow: 1;
        margin-left: 70px;
    }

    .icon {
        margin: 0px 10px;
        font-size: 40px;
        padding-right: 10px;
    }
</style>