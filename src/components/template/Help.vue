<template>
    <aside class="help" v-show="isMenuVisibleHelp">
        <div class="titulo">Help de Contexto</div>

        <div class="accordion">
            <!-- Using modifiers -->
            <b-button v-b-toggle.accordion-1 variant="info" class="m-1">Tela Inicial</b-button>
            <b-button v-b-toggle.accordion-2 variant="info" class="m-1">Animais</b-button>
            <b-button v-b-toggle.accordion-3 variant="info" class="m-1">Pesagem</b-button>
            <b-button v-b-toggle.accordion-4 variant="info" class="m-1">Descarte</b-button>
            <b-button v-b-toggle.accordion-5 variant="info" class="m-1">Medicação</b-button>
            <b-button v-b-toggle.accordion-6 variant="info" class="m-1">Consulta Veterinária</b-button>
            <b-button v-b-toggle.accordion-7 variant="info" class="m-1">Evento</b-button>
            <b-button v-b-toggle.accordion-8 variant="info" class="m-1">Ordenha Diária</b-button>
            <b-button v-b-toggle.accordion-9 variant="info" class="m-1">Relatórios</b-button>

            <b-collapse id="accordion-1" accordion="my-accordion" role="tabpanel" class="cardInfo">
                <b-card>Tela Inicial</b-card>
            </b-collapse>

            <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel" class="cardInfo">
                <b-card>Animais</b-card>
            </b-collapse>

            <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel" class="cardInfo">
                <b-card>Pesagem</b-card>
            </b-collapse>
            
            <b-collapse id="accordion-4" accordion="my-accordion" role="tabpanel" class="cardInfo">
                <b-card>Descarte</b-card>
            </b-collapse>

            <b-collapse id="accordion-5" accordion="my-accordion" role="tabpanel" class="cardInfo">
                <b-card>Medicação</b-card>
            </b-collapse>

            <b-collapse id="accordion-6" accordion="my-accordion" role="tabpanel" class="cardInfo">
                <b-card>Consulta Veterinária</b-card>
            </b-collapse>

            <b-collapse id="accordion-7" accordion="my-accordion" role="tabpanel" class="cardInfo">
                <b-card>Evento</b-card>
            </b-collapse>

            <b-collapse id="accordion-8" accordion="my-accordion" role="tabpanel" class="cardInfo">
                <b-card>Ordenha Diária</b-card>
            </b-collapse>

            <b-collapse id="accordion-9" accordion="my-accordion" role="tabpanel" class="cardInfo">
                <b-card>Relatórios</b-card>
            </b-collapse>

        </div>

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

    .accordion {
        width: 400px;
    }

    .cardInfo{
        width: 840px;
    }
</style>