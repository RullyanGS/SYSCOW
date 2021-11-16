<template>
    <div class="relatorioList">
        <ul>
            <b-container>
                <b-row>
                    <!--
                    <b-col>
                        <b-form-group
                            label="Tipo de Relatório">
                            <b-form-select
                                v-model="tipoRelatorio"
                                :options="opcaoRelatorios">
                                <template #first>
                                    <b-form-select-option :value="null" disabled>-- Por favor selecione uma opção --</b-form-select-option>
                                </template>
                            </b-form-select>
                        </b-form-group>
                    </b-col>
                    -->
                    <b-col>
                        <b-form-group
                            label="Data Início">
                            <b-form-input
                                type="date"
                                v-model="dataInicio" />
                        </b-form-group>
                    </b-col>
                    <b-col>
                        <b-form-group
                            label="Data Fim">
                            <b-form-input
                                type="date"
                                v-model="dataFim" />
                        </b-form-group>
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
                                <b-table hover striped :items="pesagens" :fields="fieldsPesagens"></b-table>
                            </b-tab>
                            <b-tab title="Descartes">
                                <b-table hover striped :items="descartes" :fields="fieldsDescartes"></b-table>
                            </b-tab>
                            <b-tab title="Medicação">
                                <b-table hover striped :items="vacinas" :fields="fieldsVacinas"></b-table>
                            </b-tab>
                            <b-tab title="Consultas">
                                <b-table hover striped :items="consultas" :fields="fieldsConsultas"></b-table>
                            </b-tab>
                            <b-tab title="Eventos">
                                <b-table hover striped :items="eventos" :fields="fieldsEventos"></b-table>
                            </b-tab>
                            <b-tab title="Ordenhas">
                                <b-table hover striped :items="ordenhas" :fields="fieldsOrdenhas"></b-table>
                            </b-tab>
                        </b-tabs>

                    </section> 

                </vue-html2pdf>

                <b-button @click="downloadPDF">Gerar Relatório</b-button>
        </ul>
    </div>
</template>

<script>

import axios from "axios";
const baseURL = "http://localhost:3001";
import VueHtml2pdf from 'vue-html2pdf'

export default {
    name: "RelatorioList",
    data() {
        return {
            tipoRelatorio: '',
            dataInicio: '',
            dataFim: '',

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
                { key: 'dataNascimento', label: 'Data Nascimento', sortable: true}
            ],
            fieldsPesagens: [
                { key: 'nomeAnimal', label: 'Nome', sortable: true},
                { key: 'dataPesagem', label: 'Data Pesagem', sortable: true},
                { key: 'peso', label: 'Peso (Kg)', sortable: true}
            ],
            fieldsDescartes: [
                { key: 'nomeAnimal', label: 'Nome', sortable: true},
                { key: 'dataDescarte', label: 'Data Descarte', sortable: true},
                { key: 'motivo', label: 'Motivo', sortable: true},
                { key: 'causa', label: 'Causa', sortable: true}
            ],
            fieldsVacinas: [
                { key: 'nomeAnimal', label: 'Nome do Animal', sortable: true},
                { key: 'nomePatologia', label: 'Nome Vacina', sortable: true},
                { key: 'nomeMedicamento', label: 'Nome Medicamento', sortable: true},
                { key: 'observacao', label: 'Observação', sortable: true},
                { key: 'dataVacinacao', label: 'Data da Vacinação', sortable: true},
                { key: 'dataLiberacao', label: 'Data de Liberacao', sortable: true}
            ],
            fieldsConsultas: [
                { key: 'nomeAnimal', label: 'Nome do Animal', sortable: true},
                { key: 'nomeConsulta', label: 'Nome Consulta', sortable: true},
                { key: 'descricaoConsulta', label: 'Descricao da Consulta', sortable: true},
                { key: 'dataConsulta', label: 'Data da Consulta', sortable: true}
            ],
            fieldsEventos: [
                { key: 'nomeAnimal', label: 'Nome do Animal', sortable: true},
                { key: 'nomeEvento', label: 'Evento', sortable: true},
                { key: 'dataEvento', label: 'Data do Evento', sortable: true},
                { key: 'dataProximoEvento', label: 'Data do Próximo Evento', sortable: true},
                { key: 'descricaoEvento', label: 'Descrição do Evento', sortable: true}
            ],
            fieldsOrdenhas: [
                { key: 'qtdeLitros', label: 'Quantidade de Litros', sortable: true},
                { key: 'nrFemeas', label: 'Número de Femeas Ordenhadas', sortable: true},
                { key: 'dataOrdenhaDiaria', label: 'Data da Ordenha', sortable: true}
            ]
        }
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