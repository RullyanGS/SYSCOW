<template>
    <div class="consultaList">
        <ul>
            <b-table hover striped :items="consultas" :fields="fields">          
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

        <b-button v-b-modal.modal-cadastrar-consulta>Cadastrar</b-button>

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

                                    <b-form-select-option v-for="animal of animais" :key="animal.id" :value="animal.nomeAnimal">
                                        {{animal.nomeAnimal}}
                                    </b-form-select-option>

                                </b-form-select>
                            </b-form-group>
                        </b-col>
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
                                label="Nome do Animal*"
                                invalid-feedback="O nome do animal é obrigatório">

                                <b-form-input
                                    v-model="consulta.nomeAnimal"
                                    disabled />
                            </b-form-group>
                        </b-col>
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
            </b-modal>
        </b-row>

    </div>
</template>

<script>
import axios from "axios";
const baseURL = "http://localhost:3001";

export default {
    name: "ConsultaList",
    data () {
        return {
            nomeAnimal: null,
            nomeConsulta: null,
            descricaoConsulta: null,
            dataConsulta: null,
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
                { key: 'nomeConsulta', label: 'Nome Consulta', sortable: true},
                { key: 'descricaoConsulta', label: 'Descricao da Consulta', sortable: true},
                { key: 'dataConsulta', label: 'Data da Consulta', sortable: true},
                //{ key: 'dataLiberacao', label: 'Data de Liberacao', sortable: true},
                { key: 'actions', label: 'Ações' }
            ]

        }
    },
    async created() {
        try {
        const resConsulta = await axios.get(`${baseURL}/consultas`);
        const resAnimal = await axios.get(`${baseURL}/animais?ativo=true`);

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
            this.dataConsulta = ''
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
                const res = await axios.post(`${baseURL}/consultas`, { 
                    nomeAnimal: this.nomeAnimal, 
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
                const res = await axios.put(`${baseURL}/consultas/${id}`, { 
                    nomeAnimal: this.consulta.nomeAnimal, 
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
                await axios.delete(`${baseURL}/consultas/${id}`)
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