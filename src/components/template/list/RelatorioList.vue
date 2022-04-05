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
                                v-model="filter.startDate" />
                        </b-form-group>
                    </b-col>
                    <b-col>
                        <b-form-group
                            label="Data Fim">
                            <b-form-input
                                type="date"
                                v-model="filter.endDate" />
                        </b-form-group>
                    </b-col>
                    <b-col >
                        <b-form-group
                            label=".">
                                <b-button @click="downloadPDF" variant="primary" v-on:click="isHidden = true"
                                >Gerar Relatório</b-button>
                        </b-form-group>
                    </b-col>
                </b-row>
            </b-container>
        </ul>
        <ul>
            <vue-html2pdf 
                :float-layout="false" 
                :manual-pagination="true" 
                :enable-download="true" 
                :pdf-content-width="'100%'"
                :filename="'relatorio'"
                :pdf-quality="2" 
                ref="DownloadComp">

                <section slot="pdf-content"> 
                    <div class="folha" v-show="isHidden">
                        SYSCOW - SISTEMA PARA GESTÃO DE GADO LEITEIRO<br>
                        Chácara Santa Rita da Serra<br>   
                        Emitido em {{dataAtual}}<br>
                        <hr>
                    </div>
                    <b-tabs class="folha">
                        <b-tab  title="Animais" active>
                            <b-table :items="animais" :fields="fieldsAnimais" :filter="filter" :filter-function="filterItemAnimais"></b-table>
                        </b-tab>
                        <b-tab title="Pesagens">
                            <b-table :items="pesagens" :fields="fieldsPesagens" :filter="filter" :filter-function="filterItemPesagens"></b-table>
                        </b-tab>
                        <b-tab title="Descartes">
                            <b-table :items="descartes" :fields="fieldsDescartes" :filter="filter" :filter-function="filterItemDescartes"></b-table>
                        </b-tab>
                        <b-tab title="Medicação">
                            <b-table :items="vacinas" :fields="fieldsVacinas" :filter="filter" :filter-function="filterItemVacinas"></b-table>
                        </b-tab>
                        <b-tab title="Consultas">
                            <b-table :items="consultas" :fields="fieldsConsultas" :filter="filter" :filter-function="filterItemConsultas"></b-table>
                        </b-tab>
                        <b-tab title="Eventos">
                            <b-table :items="eventos" :fields="fieldsEventos" :filter="filter" :filter-function="filterItemEventos"></b-table>
                        </b-tab>
                        <b-tab title="Ordenhas">
                            <b-table :items="ordenhas" :fields="fieldsOrdenhas" :filter="filter" :filter-function="filterItemOrdenhas"></b-table>
                        </b-tab>
                    </b-tabs>
                </section> 
            </vue-html2pdf>
        </ul>
        
        <!-- Help de Contexto -->
        <RelatorioHelp />

    </div>
</template>

<script>

import axios from "axios";
import {baseApiUrl} from '@/global'
import VueHtml2pdf from 'vue-html2pdf'
import moment from 'moment'
import RelatorioHelp from '../help/RelatorioHelp.vue'

export default {
    name: "RelatorioList",
    components: { VueHtml2pdf,  RelatorioHelp},

    data() {
        const hoje = new Date();

        return {
            isHidden: true,

            dataAtual : hoje.toLocaleString(),

            filter: {
                startDate: null,
                endDate: null
            },

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
                { key: 'nomeAnimal', label: 'Nome', sortable: true},
                { key: 'brinco', label: 'Brinco', sortable: true},
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
    async created() {
        try {
        const resAnimal = await axios.get(`${baseApiUrl}/animais?ativo=true`);
        const resPesagem = await axios.get(`${baseApiUrl}/pesagens`);
        const resDescarte = await axios.get(`${baseApiUrl}/descartes`);
        const resVacina = await axios.get(`${baseApiUrl}/vacinas`);
        const resConsulta = await axios.get(`${baseApiUrl}/consultas`);
        const resEvento = await axios.get(`${baseApiUrl}/eventos`);
        const resOrdenha = await axios.get(`${baseApiUrl}/ordenhas`);

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
        },
        filterItemAnimais(row, filter) {
            const startDate = filter.startDate
            const endDate = filter.endDate

            if (startDate && endDate) {
                return startDate <= row.dataNascimento && row.dataNascimento <= endDate;
            } 
            if (startDate && !endDate) {
                return startDate <= row.dataNascimento;
            }
            if (!startDate && endDate) {
                return row.dataNascimento <= endDate;
            }
            return true;
        },
        filterItemPesagens(row, filter) {
            const startDate = filter.startDate
            const endDate = filter.endDate

            if (startDate && endDate) {
                return startDate <= row.dataPesagem && row.dataPesagem <= endDate;
            } 
            if (startDate && !endDate) {
                return startDate <= row.dataPesagem;
            }
            if (!startDate && endDate) {
                return row.dataPesagem <= endDate;
            }
            return true;
        },
        filterItemDescartes(row, filter) {
            const startDate = filter.startDate
            const endDate = filter.endDate

            if (startDate && endDate) {
                return startDate <= row.dataDescarte && row.dataDescarte <= endDate;
            } 
            if (startDate && !endDate) {
                return startDate <= row.dataDescarte;
            }
            if (!startDate && endDate) {
                return row.dataDescarte <= endDate;
            }
            return true;
        },
        filterItemVacinas(row, filter) {
            const startDate = filter.startDate
            const endDate = filter.endDate

            if (startDate && endDate) {
                return startDate <= row.dataVacinacao && row.dataVacinacao <= endDate;
            } 
            if (startDate && !endDate) {
                return startDate <= row.dataVacinacao;
            }
            if (!startDate && endDate) {
                return row.dataVacinacao <= endDate;
            }
            return true;
        },
        filterItemConsultas(row, filter) {
            const startDate = filter.startDate
            const endDate = filter.endDate

            if (startDate && endDate) {
                return startDate <= row.dataConsulta && row.dataConsulta <= endDate;
            } 
            if (startDate && !endDate) {
                return startDate <= row.dataConsulta;
            }
            if (!startDate && endDate) {
                return row.dataConsulta <= endDate;
            }
            return true;
        },
        filterItemEventos(row, filter) {
            const startDate = filter.startDate
            const endDate = filter.endDate

            if (startDate && endDate) {
                return startDate <= row.dataEvento && row.dataEvento <= endDate;
            } 
            if (startDate && !endDate) {
                return startDate <= row.dataEvento;
            }
            if (!startDate && endDate) {
                return row.dataEvento <= endDate;
            }
            return true;
        },
        filterItemOrdenhas(row, filter) {
            const startDate = filter.startDate
            const endDate = filter.endDate

            if (startDate && endDate) {
                return startDate <= row.dataOrdenhaDiaria && row.dataOrdenhaDiaria <= endDate;
            } 
            if (startDate && !endDate) {
                return startDate <= row.dataOrdenhaDiaria;
            }
            if (!startDate && endDate) {
                return row.dataOrdenhaDiaria <= endDate;
            }
            return true;
        },
    }
}
</script>

<style>
    .folha{
        padding: 20px 20px 0px 20px ;
    }
</style>