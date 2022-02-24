<template>
    <aside class="help" v-show="isMenuVisibleHelp">
        <div class="titulo">Help de Contexto</div>
        <router-link to="/home">Ajuda 1</router-link>
        <router-link to="/animais">Ajuda 2</router-link>
        <router-link to="/pesagem">Ajuda 3</router-link>
        <router-link to="/descarte">Ajuda 4</router-link>
        <router-link to="/vacinacao">Ajuda 5</router-link>
        <router-link to="/consulta">Ajuda 6</router-link>
        <router-link to="/evento">Ajuda 7</router-link>
        <router-link to="/ordenhadiaria">Ajuda 8</router-link>
        <router-link to="/relatorios">Ajuda 9</router-link>
    </aside>
</template>

<script>
import {mapState} from 'vuex'

export default {
    name: 'Help',
    computed: mapState(['isMenuVisibleHelp'])
}
</script>

<style>
    .help {
        grid-area: help;
        background: #222D32;

        display: flex;
        flex-direction: column;
        flex-wrap: wrap;

        width: 400px;
    }

    .help a,
    .help a:hover {
        color: #fff;
        display: flex;
        align-items: center;
        padding-left: 15px;
        padding-bottom: 8px;
    }

    .titulo {
        background: #1A2226;
        font-size: 20px;
        text-align: center;
        color: #fff;
        padding: 10px 0 20px 0;
        margin-bottom: 10px;
    }
</style>