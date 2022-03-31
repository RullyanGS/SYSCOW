<template>
    <div class="home">
        <PageTitle main="Bem vindo ao SYSCOW" />
        <b-container>
            <b-row align-h="between">
                <div class="card">
                    <b-col>
                        <h3>Total animais ativos:</h3>
                        <div  class="cardAnimal">
                            <tr>
                                <td>  
                                    <img src="../../assets/cow-unfill.png" width="100"/>
                                </td>
                                <td> 
                                    <h1 class="totalAnimal">{{totalAnimal}}</h1>
                                </td>
                            </tr>
                        </div>
                    </b-col>
                    <b-col>
                        <h3>Total animais descartados:</h3>
                        <div  class="cardAnimal">
                            <tr class="cardAnimal">
                                <td>  
                                    <img src="../../assets/cow-unfill-x.png" width="100"/>
                                </td>
                                <td>
                                    <h1 class="totalAnimal">{{totalDescarte}}</h1> 
                                </td>
                            </tr>
                        </div>
                    </b-col>
                </div>
                <div class="card"> 
                    <b-col>
                        <!-- <h3>Leite Diário:</h3>
                        <b-table hover striped small fixed :items="ordenhas" :fields="fieldsOrdenha" :per-page="3"/> -->
                        <apexchart width="400" type="line" :options="options" :series="series"></apexchart>
                    </b-col>
                </div>
            </b-row>

            <b-row align-h="between">
                <div class="card"> 
                    <h3>Consulta Veterinária</h3>
                    <b-table hover striped small fixed :items="consultas" :fields="fieldsConsulta" :filter="filter" :filter-function="filterItemConsulta" :per-page="3"/>
                </div>
                <div class="card">
                    <b-col>
                        <h3>Animais em Quarentena</h3>
                        <b-table hover striped small fixed :items="vacinas" :fields="fieldsQuarentena" :filter="filter" :filter-function="filterItemQuarentena" :per-page="3"/>
                    </b-col>
                </div>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import axios from "axios";
import {baseApiUrl} from '@/global'
import moment from 'moment'

export default {
    name: 'Home',
    components: { PageTitle },
    data() {
        const now = new Date()
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

        const maxDate = new Date(today)
        var maxDateMoment = moment(maxDate, "DD/MM/YYYY");

        return {
            filter: {
                dataHoje: maxDateMoment.format("YYYY-MM-DD"),
            },
            
            options: {
                title: {
                    text: 'Produção de Leite',
                    align: 'left'
                },
                chart: {
                    id: 'vuechart-example'
                },
                xaxis: {
                    categories: [],
                    title: {
                        text: 'Data'
                    }
                },
                yaxis: {
                    title: {
                        text: 'Quantidade Leite (L)'
                    }
                }
            },
            series: [{
                name: 'Qtde Litros',
                data: []
            }],

            totalAnimal: '',
            totalDescarte: '',

            animais: [],
            pesagens: [],
            descartes: [],
            vacinas: [],
            consultas: [],
            eventos: [],
            ordenhas: [],

            fieldsConsulta: [
                { key: 'nomeAnimal', label: 'Nome do Animal', sortable: true},
                { key: 'nomeConsulta', label: 'Nome Consulta', sortable: true},
                { key: 'dataConsulta', label: 'Data da Consulta', sortable: true,
                formatter: value => {
                    return moment(String(value)).format('DD/MM/YYYY')
                }},
            ],
            fieldsOrdenha: [
                { key: 'qtdeLitros', label: 'Quantidade de Litros', sortable: true},
                { key: 'dataOrdenhaDiaria', label: 'Data da Ordenha', sortable: true,
                formatter: value => {
                    return moment(String(value)).format('DD/MM/YYYY')
                }},
            ],

            fieldsQuarentena: [
                { key: 'nomeAnimal', label: 'Nome do Animal', sortable: true},
                { key: 'nomePatologia', label: 'Patologia', sortable: true},
                { key: 'dataLiberacao', label: 'Data de Liberação', sortable: true,
                formatter: value => {
                    return moment(String(value)).format('DD/MM/YYYY')
                }},
            ]
        }
    },
    methods: {
        filterItemQuarentena(row, filter) {

            const dataHoje = filter.dataHoje;

            //console.log(row.dataLiberacao + " < " + dataHoje)
            //return row.dataLiberacao <= dataHoje
            return dataHoje <= row.dataLiberacao
        },

        filterItemConsulta(row, filter) {

            const dataHoje = filter.dataHoje;

            //console.log(row.dataConsulta + " < " + dataHoje)
            //return row.dataLiberacao <= dataHoje
            return dataHoje <= row.dataConsulta
        }
    },
    async created() {
        try {
        const resAnimal = await axios.get(`${baseApiUrl}/animais?ativo=true&id>=9`);
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

        var json = JSON.parse(JSON.stringify(resOrdenha.data));
        
        let tiposQtdeLitros = json.map((i) => {
            return i.qtdeLitros;
        })

        var ultimasQtdeLitros = tiposQtdeLitros.slice(tiposQtdeLitros.length - 7);

        this.series = [{
            data: ultimasQtdeLitros
        }]

        let tiposDataOrdenhaDiaria = json.map((i) => {
            return i.dataOrdenhaDiaria;
        })
        
        var ultimasDataOrdenhaDiaria = tiposDataOrdenhaDiaria.slice(tiposDataOrdenhaDiaria.length - 7);

        ultimasDataOrdenhaDiaria = ultimasDataOrdenhaDiaria.map((element) => {
            var d = new Date(element);
            return `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`;
        })

        this.options = {
            xaxis: {
                categories: ultimasDataOrdenhaDiaria
            }
        }

       

        for(var i = 0; i < this.animais.length; i++) {
            this.totalAnimal++
        }

        for(i = 0; i < this.descartes.length; i++) {
            this.totalDescarte++
        }

        } catch (e) {
        console.error(e);
        }
    },
}
</script>

<style>

.totalAnimal {
    font-size: 60px;
    margin-left: 100%;
}

.card {
    padding: 20px;
    margin: 10px;
    width: 45%;
}

.cardAnimal {
    margin-left: 30%;
}
</style>