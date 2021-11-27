<template>
    <div class="home">
        <PageTitle main="Bem vindo ao SYSCOW" />
        <b-container>
            <b-row align-h="between">
                <b-col cols="6">
                    <h3>Total animais ativos:</h3>
                    <tr>
                        <td>  
                            <img src="../../assets/cow-unfill.png" width="100"/>
                        </td>
                        <td> 
                            <h1 class="totalAnimal">{{totalAnimal}}</h1>
                        </td>
                    </tr>
                </b-col>
                <b-col cols="6">
                    <h3>Leite Diário:</h3>
                    <b-table hover striped small fixed :items="ordenhas" :fields="fieldsOrdenha" :per-page="3"/>
                </b-col>
            </b-row>

            <b-row align-h="between">
                <b-col cols="6">
                    <h3>Total animais descartados:</h3>
                    <td>  
                        <img src="../../assets/cow-unfill-x.png" width="100"/>
                    </td>
                    <td>
                        <h1 class="totalAnimal">{{totalDescarte}}</h1> 
                    </td>
                </b-col>
                <b-col cols="6">
                    <h3>Consultas Veterinária:</h3>
                    <b-table hover striped small fixed :items="consultas" :fields="fieldsConsulta" :per-page="3"/>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import axios from "axios";
const baseURL = "http://localhost:3001";
import moment from 'moment'

export default {
    name: 'Home',
    components: { PageTitle },
    data() {
        return {
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
                //{ key: 'nomeConsulta', label: 'Nome Consulta', sortable: true},
                //{ key: 'descricaoConsulta', label: 'Descricao da Consulta', sortable: true},
                { key: 'dataConsulta', label: 'Data da Consulta', sortable: true,
                formatter: value => {
                    return moment(String(value)).format('DD/MM/YYYY')
                }},
            ],
            fieldsOrdenha: [
                { key: 'qtdeLitros', label: 'Quantidade de Litros', sortable: true},
                //{ key: 'nrFemeas', label: 'Número de Femeas Ordenhadas', sortable: true},
                { key: 'dataOrdenhaDiaria', label: 'Data da Ordenha', sortable: true,
                formatter: value => {
                    return moment(String(value)).format('DD/MM/YYYY')
                }},
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
}

</style>