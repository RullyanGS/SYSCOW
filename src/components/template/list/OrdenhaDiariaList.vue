<template>
    <div class="ordenhaDiariaList">

        <b-row>
            <b-col cols="1" />
            <b-col cols="6">
                <b-input v-model="filter" placeholder="Buscar..."></b-input>
            </b-col>
            <b-col cols="1" />
            <b-col cols="4">
                <b-button v-b-modal.modal-cadastrar-ordenha variant="primary">Cadastrar</b-button>
            </b-col>
        </b-row>
        
        <hr />

        <!-- Tabela Ordenha Diaria -->
        <ul>
            <b-table hover striped :items="ordenhas" :fields="fields" :current-page="currentPage" :per-page="5" :filter="filter">          
                <template #cell(actions)="data">
                    <b-button variant="warning" v-b-modal.modal-editar-ordenha @click="loadOrdenha(data.item)" class="mr-2">
                        <i class="fa fa-pencil"></i>
                    </b-button>
                    <b-button variant="danger" v-b-modal.modal-excluir-ordenha @click="loadOrdenha(data.item)">
                        <i class="fa fa-trash"></i>
                    </b-button>
                </template>
            </b-table>
        </ul>

        <ul class="justify-content-center row my-1">
            <b-pagination size="md" :total-rows="this.ordenhas.length" :per-page="5" v-model="currentPage" />
        </ul>

        <!-- Cadastro Ordenha -->
        <b-row>
            <b-modal
            id="modal-cadastrar-ordenha"
            ref="modal"
            title="Cadastro da Ordenha Diária"
            size="lg"
            @show="resetModal"
            @hidden="resetModal"
            @ok="cadastroOk">

            <form ref="form" @submit.stop.prevent="handleSubmit">
                
                <b-container>
                    <b-row>
                        <b-col>
                            <b-form-group
                                label="Quantidade de Litros* (L)"
                                invalid-feedback="A Quantidade de Litros é obrigatório">

                                <b-form-input
                                    type="tel" 
                                    v-mask="'###'"
                                    v-model="qtdeLitros"
                                    :state="qtdeLitrosState"
                                    required/>
                            </b-form-group>
                        </b-col>
                        <b-col>
                            <b-form-group
                                label="Nº de Vacas Ordenhadas*"
                                invalid-feedback="O Número de Vacas Ordenhadas é obrigatório">

                                <b-form-input
                                    type="tel" 
                                    v-mask="'###'"
                                    v-model="nrFemeas"
                                    :state="nrFemeasState"
                                    required />

                            </b-form-group>
                        </b-col>
                        <b-col>    
                            <b-form-group
                                label="Data de Ordenha Diaria*"
                                invalid-feedback="A data da Ordenha Diaria é obrigatório">
                                <b-form-input
                                    type = "date"
                                    v-model="dataOrdenhaDiaria"
                                    :state="dataOrdenhaDiariaState"
                                    :max="max"
                                    required
                                    disabled/>
                            </b-form-group>
                        </b-col>
                    </b-row>
                </b-container>

            </form>

            <template #modal-footer="{ ok, cancel }">
                <b-button size="md" variant="success" @click="ok()">
                    Confirmar
                </b-button>
                <b-button size="md" variant="danger" @click="cancel()">
                    Cancelar
                </b-button>
            </template>

            </b-modal>
        </b-row>

        <!-- Editar Ordenha -->
        <b-row>
            <b-modal
            id="modal-editar-ordenha"
            ref="modal"
            title="Editar a Ordenha Diária"
            size="lg"
            @show="resetModal"
            @hidden="resetModal"
            @ok="editarOk">

            Deseja realmente editar a ordenha desse dia ?

            <br><br>

            <form ref="form" @submit.stop.prevent="cadastrar">
                
                <b-container>
                    <b-row>
                        <b-col>
                            <b-form-group
                                label="Quantidade de Litros*"
                                invalid-feedback="A Quantidade de Litros é obrigatório">

                                <b-form-input
                                    type="tel" 
                                    v-mask="'###'"
                                    v-model="ordenha.qtdeLitros"
                                    :state="qtdeLitrosState"
                                    required />
                            </b-form-group>
                        </b-col>
                        <b-col>
                            <b-form-group
                                label="Nº de Vacas Ordenhadas*"
                                invalid-feedback="O Número de Vacas Ordenhadas é obrigatório">

                                <b-form-input
                                    type="tel" 
                                    v-mask="'###'"
                                    v-model="ordenha.nrFemeas"
                                    :state="nrFemeasState"
                                    required />

                            </b-form-group>
                        </b-col>
                        <b-col>    
                            <b-form-group
                                label="Data de Ordenha Diaria*"
                                invalid-feedback="A data da Ordenha Diaria é obrigatório">
                                <b-form-input
                                    type="date"
                                    v-model="ordenha.dataOrdenhaDiaria"
                                    :state="dataOrdenhaDiariaState"
                                    :max="max"
                                    required />
                            </b-form-group>
                        </b-col>
                    </b-row>
                </b-container>

            </form>

            <template #modal-footer="{ ok, cancel }">
                <b-button size="md" variant="success" @click="ok()">
                    Confirmar
                </b-button>
                <b-button size="md" variant="danger" @click="cancel()">
                    Cancelar
                </b-button>
            </template>

            </b-modal>
        </b-row>

        <!-- Excluir Ordenha -->
        <b-row>
            <b-modal
                id="modal-excluir-ordenha"
                title="Excluir Ordenha" 
                size="lg"
                @ok="remove">
                    <br>
                    Deseja realmente excluir a Ordenha do dia <strong>{{ordenha.dataOrdenhaDiaria}}</strong> ?

            <template #modal-footer="{ ok, cancel }">
                <b-button size="md" variant="success" @click="ok()">
                    Confirmar
                </b-button>
                <b-button size="md" variant="danger" @click="cancel()">
                    Cancelar
                </b-button>
            </template>

            </b-modal>
        </b-row>

        <!-- Help de Contexto -->
        <OrdenhaDiariaHelp />

    </div>
</template>



<script>
import axios from "axios";
import {baseApiUrl} from '@/global'
import moment from 'moment'

import OrdenhaDiariaHelp from "../help/OrdenhaDiariaHelp";

export default {
    name: "OrdenhaDiariaList",
    components: { OrdenhaDiariaHelp },

    data () {
        const now = new Date()
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

        const maxDate = new Date(today)
        var maxDateMoment = moment(maxDate, "DD/MM/YYYY");

        return {
            max: maxDateMoment.format("YYYY-MM-DD"),
            filter: '',
            currentPage: 1,
            perPage: 5,
            qtdeLitros: null,
            qtdeLitrosState: null,
            nrFemeas: null,
            nrFemeasState: null,
            dataOrdenhaDiaria: new Date().toISOString().substr(0, 10),
            dataOrdenhaDiariaState: null,

            ordenha: {},
            ordenhas: [],
            fields: [
                { key: 'qtdeLitros', label: 'Quantidade de Litros', sortable: true},
                { key: 'nrFemeas', label: 'Número de Femeas Ordenhadas', sortable: true},
                { key: 'dataOrdenhaDiaria', label: 'Data da Ordenha', sortable: true,
                    formatter: value => {
                        return moment(String(value)).format('DD/MM/YYYY')
                    }},
                { key: 'actions', label: 'Ações' }
            ]

        }
    },
    async created() {
        try {
        const res = await axios.get(`${baseApiUrl}/ordenhas`);

        this.ordenhas = res.data;
        } catch (e) {
        console.error(e);
        }
    },
    methods: {
        checkFormValidity() {
            const valid = this.$refs.form.checkValidity()
            this.qtdeLitrosState = valid
            this.nrFemeasState = valid
            this.dataOrdenhaDiariaState = valid
            return valid
        },
        resetModal() {
            this.qtdeLitros = ''
            this.nrFemeas = ''
            //this.dataOrdenhaDiaria = ''
            this.qtdeLitrosState = null
            this.nrFemeasState = null
            this.dataOrdenhaDiariaState = null
        },
        cadastroOk(bvModalEvt) {
            bvModalEvt.preventDefault()
            this.cadastrar()
        },
        editarOk(bvModalEvt) {
            bvModalEvt.preventDefault()
            this.editar()
        },
        async cadastrar() {
            if (!this.checkFormValidity()) {
                return
            }
            try {
                const res = await axios.post(`${baseApiUrl}/ordenhas`, { 
                    qtdeLitros: this.qtdeLitros, 
                    nrFemeas: this.nrFemeas, 
                    dataOrdenhaDiaria: this.dataOrdenhaDiaria});

                    this.ordenhas = [...this.ordenhas, res.data];

            } catch (e) {
                console.error(e);
            }

            // Esconder o modal manualmente
            this.$nextTick(() => {
                this.$bvModal.hide('modal-cadastrar-ordenha')
            })
        },
        async editar() {
            if (!this.checkFormValidity()) {
                return
            }
            try {
                const id = this.ordenha.id
                const res = await axios.put(`${baseApiUrl}/ordenhas/${id}`, { 
                    qtdeLitros: this.ordenha.qtdeLitros, 
                    nrFemeas: this.ordenha.nrFemeas, 
                    dataOrdenhaDiaria: this.ordenha.dataOrdenhaDiaria});

                    this.ordenhas = [...this.ordenhas, res.data];

            } catch (e) {
                console.error(e);
            }

            // Esconder o modal manualmente
            this.$nextTick(() => {
                //this.$bvModal.hide('modal-cadastrar-ordenha')
                location.reload();
            })
        },
        async remove() {
            try {
                const id = this.ordenha.id
                await axios.delete(`${baseApiUrl}/ordenhas/${id}`)
                    .then(() => {
                        location.reload();
                    });
            } catch (e) {
                console.error(e);
            }

            this.$nextTick(() => {
                this.$bvModal.hide('modal-excluir-peso')
            })
        },
        loadOrdenha(ordenha) {
            this.ordenha = { ...ordenha }
        }
    }
}
</script>

<style>

</style>