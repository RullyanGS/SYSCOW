<template>
    <div class="home">
        <PageTitle main="Bem vindo ao SYSCOW" />
        <b-container>
            <b-row align-h="between">
                <div class="card">
                    <b-col>
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
                </div>
                <div class="card"> 
                    <b-col>
                        <h3>Leite Diário:</h3>
                        <b-table hover striped small fixed :items="ordenhas" :fields="fieldsOrdenha" :per-page="3"/>
                    </b-col>
                </div>
            </b-row>

            <b-row align-h="between">
                <div class="card"> 
                    <b-col>
                        <h3>Total animais descartados:</h3>
                        <td>  
                            <img src="../../assets/cow-unfill-x.png" width="100"/>
                        </td>
                        <td>
                            <h1 class="totalAnimal">{{totalDescarte}}</h1> 
                        </td>
                    </b-col>
                </div>
                <div class="card">
                    <b-col>
                        <h3>Consultas Veterinária:</h3>
                        <b-table hover striped small fixed :items="consultas" :fields="fieldsConsulta" :per-page="3"/>
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

</style>