<template>
    <aside class="help" v-show="isMenuVisibleHelp">
        <div class="titulo">
            <div class="icon" @click="toggleMenu">
                <i class="fa fa-times-circle"/>
            </div>
            <div class="icon"> Help de Contexto </div>
            
        </div>

        <div class="helpContent">
            <div style="color: #fff;" v-if="movie === '#/home'">
                <h3>Tela Inicial</h3>
                <p>Nessa seção odemos ver algumas insformações gerais</p>
            </div>
            <div style="color: #fff;" v-if="movie === '#/animais'">
                <h3>Animais</h3>
                <p>Nessa seção é realizado o cadastro dos animais</p>
            </div>
            <div style="color: #fff;" v-if="movie === '#/pesagem'">
                <h3>Pesagem</h3>
                <p>Nessa seção é realizado o cadastro das pesagens</p>
            </div>
            <div style="color: #fff;" v-if="movie === '#/descarte'">
                <h3>Descarte</h3>
                <p>Nessa seção é realizado o cadastro dos descartes</p>
            </div>
            <div style="color: #fff;" v-if="movie === '#/consulta'">
                <h3>Consulta Veterinária</h3>
                <p>Nessa seção é realizado o cadastro das consultas veterinárias</p>
            </div>
            <div style="color: #fff;" v-if="movie === '#/evento'">
                <h3>Evento</h3>
                <p>Nessa seção é realizado o cadastro dos eventos</p>
            </div>
            <div style="color: #fff;" v-if="movie === '#/evento'">
                <h3>Evento</h3>
                <p>Nessa seção é realizado o cadastro dos eventos</p>
            </div>
            <div style="color: #fff;" v-if="movie === '#/ordenhadiaria'">
                <h3>Ordenha Diária</h3>
                <p>Nessa seção é realizado o cadastro das ordenhas diárias</p>
            </div>
            <div style="color: #fff;" v-if="movie === '#/relatorios'">
                <h3>Relatórios</h3>
                <p>Nessa seção é realizado os relatórios</p>
            </div>
        </div>
    </aside>
</template>

<script>
import {mapState} from 'vuex'

export default {
    name: 'Help',
    data () {
        return {
           movie: window.location.hash,
           a: false,
        }
    },
    methods: {
        toggleMenu() {
            this.$store.commit('toggleMenu')
        }
    },
    watch: {
        movie(movie) {
            // Fetch data about the movie
            fetch(`/${movie}`).then((data) => {
            this.movieData = data;
            });
        }
    },
    computed: mapState(['isMenuVisibleHelp']),
    props: ['titulo', 'texto']
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

    .accordion {
        width: 400px;
    }

    .cardInfo{
        width: 840px;
    }

    .helpContent{
        margin: 10px;
    }
</style>