<template>
    <div class="relatorioList">
        <ul>
            <b-container>
                <b-row>
                    <b-col>
                        <b-form-group
                            label="Data Início">
                            <b-form-input
                                type="date"
                                v-model="startDate" />
                        </b-form-group>
                    </b-col>
                    <b-col>
                        <b-form-group
                            label="Data Fim">
                            <b-form-input
                                type="date"
                                v-model="endDate" />
                        </b-form-group>
                    </b-col>
                    <b-col >
                         <b-button @click="downloadPDF" variant="primary">Gerar Relatório</b-button>
                    </b-col>
                </b-row>
            </b-container>
        </ul>
        <ul>

            <!-- <div class="mt-3">Selecionado: <strong>{{ tipoRelatorio }}</strong> - {{ dataInicio }} - {{ dataFim }}</div> -->
            
                <vue-html2pdf 
                    :float-layout="false" 
                    :manual-pagination="true" 
                    :enable-download="true" 
                    :pdf-content-width="'100%'" 
                    ref="DownloadComp">

                    <section slot="pdf-content"> 

                        <b-tabs>
                            <b-tab  title="Animais" active>
                                <b-table :items="animais" :fields="fieldsAnimais"></b-table>
                            </b-tab>
                            <b-tab title="Pesagens">
                                <b-table :items="pesagens" :fields="fieldsPesagens"></b-table>
                            </b-tab>
                            <b-tab title="Descartes">
                                <b-table :items="descartes" :fields="fieldsDescartes"></b-table>
                            </b-tab>
                            <b-tab title="Medicação">
                                <b-table :items="vacinas" :fields="fieldsVacinas"></b-table>
                            </b-tab>
                            <b-tab title="Consultas">
                                <b-table :items="consultas" :fields="fieldsConsultas"></b-table>
                            </b-tab>
                            <b-tab title="Eventos">
                                <b-table :items="eventos" :fields="fieldsEventos"></b-table>
                            </b-tab>
                            <b-tab title="Ordenhas">
                                <b-table :items="ordenhas" :fields="fieldsOrdenhas"></b-table>
                            </b-tab>
                        </b-tabs>

                    </section> 

                </vue-html2pdf>

        </ul>
    </div>
</template>

<script>

import axios from "axios";
const baseURL = "http://localhost:3001";
import VueHtml2pdf from 'vue-html2pdf'
import moment from 'moment'

export default {
    name: "RelatorioList",
    data() {
        return {
            selectedType: '',
            startDate: null,
            endDate: null,

            animais: [],
            pesagens: [],
            descartes: [],
            vacinas: [],
            consultas: [],
            eventos: [],
            ordenhas: [],
            opcaoRelatorios: [
                    { value: 'animais', text: 'Animais'},
                    { value: 'pesagens', text: 'Pesagem'},
                    { value: 'descartes', text: 'Descarte'},
                    { value: 'vacinas', text: 'Vacinas'},
                    { value: 'consultas', text: 'Consultas'},
                    { value: 'eventos', text: 'Eventos'},
                    { value: 'ordenhas', text: 'Ordenhas'}
            ],

            fieldsAnimais: [
                { key: 'brinco', label: 'Brinco', sortable: true},
                { key: 'nomeAnimal', label: 'Nome', sortable: true},
                { key: 'raca', label: 'Raça', sortable: true},
                { key: 'sexo', label: 'Sexo', sortable: true},
                { key: 'dataNascimento', label: 'Data Nascimento', sortable: true,
                formatter: value => {
                    return moment(String(value)).format('DD/MM/YYYY')
                }},
            ],
            fieldsPesagens: [
                { key: 'nomeAnimal', label: 'Nome', sortable: true},
                { key: 'dataPesagem', label: 'Data Pesagem', sortable: true,
                formatter: value => {
                    return moment(String(value)).format('DD/MM/YYYY')
                }},
                { key: 'peso', label: 'Peso (Kg)', sortable: true}
            ],
            fieldsDescartes: [
                { key: 'nomeAnimal', label: 'Nome', sortable: true},
                { key: 'dataDescarte', label: 'Data Descarte', sortable: true,
                formatter: value => {
                    return moment(String(value)).format('DD/MM/YYYY')
                }},
                { key: 'motivo', label: 'Motivo', sortable: true},
                { key: 'causa', label: 'Causa', sortable: true}
            ],
            fieldsVacinas: [
                { key: 'nomeAnimal', label: 'Nome do Animal', sortable: true},
                { key: 'nomePatologia', label: 'Nome Vacina', sortable: true},
                { key: 'nomeMedicamento', label: 'Nome Medicamento', sortable: true},
                { key: 'observacao', label: 'Observação', sortable: true},
                { key: 'dataVacinacao', label: 'Data da Vacinação', sortable: true,
                formatter: value => {
                    return moment(String(value)).format('DD/MM/YYYY')
                }},
                { key: 'dataLiberacao', label: 'Data de Liberacao', sortable: true,
                formatter: value => {
                    if (moment(value).isValid()) {
                        return moment(String(value)).format('DD/MM/YYYY')
                    } else {
                        return 'Não informado'
                    }
                }},
            ],
            fieldsConsultas: [
                { key: 'nomeAnimal', label: 'Nome do Animal', sortable: true},
                { key: 'nomeConsulta', label: 'Nome Consulta', sortable: true},
                { key: 'descricaoConsulta', label: 'Descricao da Consulta', sortable: true},
                { key: 'dataConsulta', label: 'Data da Consulta', sortable: true,
                formatter: value => {
                    return moment(String(value)).format('DD/MM/YYYY')
                }},
            ],
            fieldsEventos: [
                { key: 'nomeAnimal', label: 'Nome do Animal', sortable: true},
                { key: 'nomeEvento', label: 'Evento', sortable: true},
                { key: 'dataEvento', label: 'Data do Evento', sortable: true,
                formatter: value => {
                    return moment(String(value)).format('DD/MM/YYYY')
                }},
                { key: 'dataProximoEvento', label: 'Data do Próximo Evento', sortable: true,
                formatter: value => {
                    return moment(String(value)).format('DD/MM/YYYY')
                }},
                { key: 'descricaoEvento', label: 'Descrição do Evento', sortable: true}
            ],
            fieldsOrdenhas: [
                { key: 'qtdeLitros', label: 'Quantidade de Litros', sortable: true},
                { key: 'nrFemeas', label: 'Número de Femeas Ordenhadas', sortable: true},
                { key: 'dataOrdenhaDiaria', label: 'Data da Ordenha', sortable: true,
                formatter: value => {
                    return moment(String(value)).format('DD/MM/YYYY')
                }},
            ]
        }
    },
    computed: {
    },
    async created() {
        try {
        const resAnimal = await axios.get(`${baseURL}/animais?ativo=true&id>=9`);
        const resPesagem = await axios.get(`${baseURL}/pesagens`);
        const resDescarte = await axios.get(`${baseURL}/descartes`);
        const resVacina = await axios.get(`${baseURL}/vacinas`);
        const resConsulta = await axios.get(`${baseURL}/consultas`);
        const resEvento = await axios.get(`${baseURL}/eventos`);
        const resOrdenha = await axios.get(`${baseURL}/ordenhas`);

        this.animais = resAnimal.data;
        this.pesagens = resPesagem.data;
        this.descartes = resDescarte.data;
        this.vacinas = resVacina.data;
        this.consultas = resConsulta.data;
        this.eventos = resEvento.data;
        this.ordenhas = resOrdenha.data;
        } catch (e) {
        console.error(e);
        }
    },
    methods: {
        downloadPDF () {
            this.$refs.DownloadComp.generatePdf()
        }
    },
    components: {
        VueHtml2pdf
    },
}
</script>

<style>

</style>