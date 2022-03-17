<template>
    <div class="consultaList">

        <b-row>
            <b-col cols="1" />
            <b-col cols="6">
                <b-input v-model="filter" placeholder="Buscar..."></b-input>
            </b-col>
            <b-col cols="1" />
            <b-col cols="4">
                <b-button v-b-modal.modal-cadastrar-consulta variant="primary">Cadastrar</b-button>
            </b-col>
        </b-row>
        
        <hr />

        <ul>
            <b-table hover striped :items="consultas" :fields="fields" :current-page="currentPage" :per-page="5" :filter="filter">          
                <template #cell(actions)="data">
                    <b-button variant="warning" v-b-modal.modal-editar-consulta @click="loadConsulta(data.item)" class="mr-2">
                        <i class="fa fa-pencil"></i>
                    </b-button>
                    <b-button variant="danger" v-b-modal.modal-excluir-consulta @click="loadConsulta(data.item)">
                        <i class="fa fa-trash"></i>
                    </b-button>
                </template>
            </b-table>
        </ul>

        <ul class="justify-content-center row my-1">
            <b-pagination size="md" :total-rows="this.consultas.length" :per-page="5" v-model="currentPage" />
        </ul>

        <!-- Cadastro Consulta -->
        <b-row>
            <b-modal
            id="modal-cadastrar-consulta"
            ref="modal"
            title="Cadastro da Consulta"
            size="lg"
            @show="resetModal"
            @hidden="resetModal"
            @ok="cadastroOk">

            <form ref="form" @submit.stop.prevent="handleSubmit">
                
                <b-container>
                    <b-row>
                        <b-col>
                            <b-form-group
                                label="Nome do Animal*"
                                invalid-feedback="O nome do animal é obrigatório">

                                <b-form-select
                                    v-model="nomeAnimal"
                                    :state="nomeAnimalState"
                                    required >

                                    <template #first>
                                        <b-form-select-option :value="null" disabled>-- Por favor selecione uma opção --</b-form-select-option>
                                    </template>

                                    <b-form-select-option v-for="animal of animais" :key="animal.id" :value="animal.id">
                                        {{animal.brinco}} - {{animal.nomeAnimal}}
                                    </b-form-select-option>

                                </b-form-select>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col>
                            <b-form-group
                                label="Nome da Consulta*"
                                invalid-feedback="O nome da consulta é obrigatório">

                                <b-form-input
                                    v-model="nomeConsulta"
                                    :state="nomeConsultaState"
                                    required />

                            </b-form-group>
                        </b-col>
                        <b-col>    
                            <b-form-group
                                label="Data da Consulta*" 
                                invalid-feedback="A data de consulta é obrigatoria">
                                <b-form-input
                                    type = "date"
                                    v-model="dataConsulta"  
                                    :state="dataConsultaState"
                                    required />
                            </b-form-group>
                        </b-col>
                        
                    </b-row>
                </b-container>

                <b-container>
                    <b-row>
                        <!--
                        <b-col>    
                            <b-form-group
                                label="Data de Liberação" >
                                <b-form-input
                                    type = "date"
                                    v-model="dataLiberacao"/>
                            </b-form-group>
                        </b-col>
                        -->
                        <b-col>
                            <b-form-group
                                label="Descrição da Consulta">

                                <b-form-input
                                    v-model="descricaoConsulta" />

                            </b-form-group>
                        </b-col>
                    </b-row>
                </b-container>

            </form>

            <template #modal-footer="{ ok, cancel }">
                <b-button size="md" variant="success" @click="ok()">
                    OK
                </b-button>
                <b-button size="md" variant="danger" @click="cancel()">
                    Cancel
                </b-button>
            </template>

            </b-modal>
        </b-row>

        <!-- Cadastro Consulta -->
        <b-row>
            <b-modal
            id="modal-editar-consulta"
            ref="modal"
            title="Editar Consulta"
            size="lg"
            @show="resetModal"
            @hidden="resetModal"
            @ok="editarOk">

            <form ref="form" @submit.stop.prevent="handleSubmit">
                
                <b-container>
                    <b-row>
                        <b-col>
                            <b-form-group
                                label="Nome*">

                                <b-form-input 
                                    v-model="consulta.nomeAnimal"
                                    disabled />
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col>
                            <b-form-group
                                label="Nome da Consulta*"
                                invalid-feedback="O nome da consulta é obrigatório">

                                <b-form-input
                                    v-model="consulta.nomeConsulta"
                                    :state="nomeConsultaState"
                                    required />

                            </b-form-group>
                        </b-col>
                        <b-col>    
                            <b-form-group
                                label="Data da Consulta*" 
                                invalid-feedback="A data de consulta é obrigatoria">
                                <b-form-input
                                    type = "date"
                                    v-model="consulta.dataConsulta"  
                                    :state="dataConsultaState"
                                    required />
                            </b-form-group>
                        </b-col>
                    </b-row>
                </b-container>

                <b-container>
                    <b-row>
                        <!--
                        <b-col>    
                            <b-form-group
                                label="Data de Liberação" >
                                <b-form-input
                                    type = "date"
                                    v-model="consulta.dataLiberacao"/>
                            </b-form-group>
                        </b-col>
                        -->
                        <b-col>
                            <b-form-group
                                label="Descrição da Consulta">

                                <b-form-input
                                    v-model="consulta.descricaoConsulta" />

                            </b-form-group>
                        </b-col>
                    </b-row>
                </b-container>

            </form>

            <template #modal-footer="{ ok, cancel }">
                <b-button size="md" variant="success" @click="ok()">
                    OK
                </b-button>
                <b-button size="md" variant="danger" @click="cancel()">
                    Cancel
                </b-button>
            </template>

            </b-modal>
        </b-row>

        <!-- Excluir Consulta -->
        <b-row>
            <b-modal
                id="modal-excluir-consulta"
                title="Excluir Consulta" 
                size="lg"
                @ok="remove">
                    <br>
                    Deseja realmente excluir a consulta do animal <strong>{{consulta.nomeAnimal}}</strong> ?

            <template #modal-footer="{ ok, cancel }">
                <b-button size="md" variant="success" @click="ok()">
                    OK
                </b-button>
                <b-button size="md" variant="danger" @click="cancel()">
                    Cancel
                </b-button>
            </template>
            
            </b-modal>
        </b-row>

    </div>
</template>

<script>
import axios from "axios";
import {baseApiUrl} from '@/global'
import moment from 'moment'

export default {
    name: "ConsultaList",
    data () {
        return {
            filter: '',
            currentPage: 1,
            perPage: 5,
            nomeAnimal: null,
            brinco: null,
            nomeConsulta: null,
            descricaoConsulta: null,
            dataConsulta: new Date().toISOString().substr(0, 10),
            //dataLiberacao: null,
            nomeAnimalState: null,
            nomeConsultaState: null,
            dataConsultaState: null,

            consulta: {},
            consultas: [],

            animal: {},
            animais: [],

            fields: [
                { key: 'nomeAnimal', label: 'Nome do Animal', sortable: true},
                { key: 'brinco', label: 'Brinco', sortable: true},
                { key: 'nomeConsulta', label: 'Nome Consulta', sortable: true},
                { key: 'descricaoConsulta', label: 'Descricao da Consulta', sortable: true},
                { key: 'dataConsulta', label: 'Data da Consulta', sortable: true,
                formatter: value => {
                    return moment(String(value)).format('DD/MM/YYYY')
                }},
                //{ key: 'dataLiberacao', label: 'Data de Liberacao', sortable: true},
                { key: 'actions', label: 'Ações' }
            ]

        }
    },
    async created() {
        try {
        const resConsulta = await axios.get(`${baseApiUrl}/consultas`);
        const resAnimal = await axios.get(`${baseApiUrl}/animais?ativo=true`);

        this.consultas = resConsulta.data;
        this.animais = resAnimal.data;

        } catch (e) {
        console.error(e);
        }
    },
    methods: {
        checkFormValidity() {
            const valid = this.$refs.form.checkValidity()
            this.nomeAnimalState = valid
            this.nomeConsultaState = valid
            this.dataConsultaState = valid
            return valid
        },
        resetModal() {
            this.nomeAnimal = ''
            this.nomeConsulta = ''
            this.descricaoConsulta = ''
            //this.dataConsulta = ''
            //this.dataLiberacao = ''
            this.nomeAnimalState = null
            this.nomeConsultaState = null
            this.dataConsultaState = null
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
                const id = this.nomeAnimal

                const resB = await axios.get(`${baseApiUrl}/animais/${id}`);
                this.backupAnimal = resB.data;


                const res = await axios.post(`${baseApiUrl}/consultas`, { 
                    nomeAnimal: this.backupAnimal.nomeAnimal, 
                    brinco: this.backupAnimal.brinco, 
                    nomeConsulta: this.nomeConsulta, 
                    descricaoConsulta: this.descricaoConsulta, 
                    dataConsulta: this.dataConsulta, 
                    //dataLiberacao: this.dataLiberacao
                    });

                    this.consultas = [...this.consultas, res.data];

            } catch (e) {
                console.error(e);
            }

            // Esconder o modal manualmente
            this.$nextTick(() => {
                this.$bvModal.hide('modal-cadastrar-consulta')
            })
        },
        async editar() {
            if (!this.checkFormValidity()) {
                return
            }
            try {
                const id = this.consulta.id
                const res = await axios.put(`${baseApiUrl}/consultas/${id}`, { 
                    nomeAnimal: this.consulta.nomeAnimal, 
                    brinco: this.consulta.brinco, 
                    nomeConsulta: this.consulta.nomeConsulta, 
                    descricaoConsulta: this.consulta.descricaoConsulta, 
                    dataConsulta: this.consulta.dataConsulta, 
                    //dataLiberacao: this.consulta.dataLiberacao
                    });

                    this.consultas = [...this.consultas, res.data];

            } catch (e) {
                console.error(e);
            }

            // Esconder o modal manualmente
            this.$nextTick(() => {
                //this.$bvModal.hide('modal-cadastrar-consulta')
                location.reload();
            })
        },
        async remove() {
            try {
                const id = this.consulta.id
                await axios.delete(`${baseApiUrl}/consultas/${id}`)
                    .then(() => {
                        location.reload();
                    });
            } catch (e) {
                console.error(e);
            }

            this.$nextTick(() => {
                this.$bvModal.hide('modal-excluir-consulta')
            })
        },
        loadConsulta(consulta) {
            this.consulta = { ...consulta }
        }
    }
}
</script>

<style>

</style>