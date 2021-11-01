<template>
    <aside class="menu" v-show="isMenuVisible">
        <div class="navegacao">NAVEGAÇÃO</div>
        <router-link to="/">Tela Inicial</router-link>
        <router-link to="/animais">Animais</router-link>
        <router-link to="/pesagem">Pesagem</router-link>
        <router-link to="/descarte">Descarte</router-link>
        <router-link to="/vacinacao">Vacinacao</router-link>
        <router-link to="/consulta">Consulta</router-link>
        <router-link to="/evento">Evento</router-link>
        <router-link to="/ordenhadiaria">Ordenha Diaria</router-link>
        <router-link to="/relatorios">Relatórios</router-link>
    </aside>
</template>

<script>
import {mapState} from 'vuex'

export default {
    name: 'Menu',
    computed: mapState(['isMenuVisible'])
}
</script>

<style>
    .menu {
        grid-area: menu;
        background: #222D32;

        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
    }

    .menu a,
    .menu a:hover {
        color: #fff;
        display: flex;
        align-items: center;
        padding-left: 15px;
        padding-bottom: 8px;
    }

    .navegacao {
        background: #1A2226;
        font-size: 20px;
        text-align: center;
        color: #fff;
        padding: 10px 0 10px 0;
        margin-bottom: 10px;
    }
</style>