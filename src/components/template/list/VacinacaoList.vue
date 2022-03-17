<template>
    <div class="vacinacaoList">

        <b-row>
            <b-col cols="1" />
            <b-col cols="6">
                <b-input v-model="filter" placeholder="Buscar..."></b-input>
            </b-col>
            <b-col cols="1" />
            <b-col cols="4">
                <b-button v-b-modal.modal-cadastrar-vacinacao variant="primary">Cadastrar</b-button>
            </b-col>
        </b-row>
        
        <hr />

        <ul>
            <b-table hover striped :items="vacinas" :fields="fields" :current-page="currentPage" :per-page="5" :filter="filter">          
                <template #cell(actions)="data">
                    <b-button variant="warning" v-b-modal.modal-editar-vacinacao @click="loadVacinacao(data.item)" class="mr-2">
                        <i class="fa fa-pencil"></i>
                    </b-button>
                    <b-button variant="danger" v-b-modal.modal-excluir-vacinacao @click="loadVacinacao(data.item)">
                        <i class="fa fa-trash"></i>
                    </b-button>
                </template>
            </b-table>
        </ul>

        <ul class="justify-content-center row my-1">
            <b-pagination size="md" :total-rows="this.vacinas.length" :per-page="5" v-model="currentPage" />
        </ul>

        <!-- Cadastro Medicação -->
        <b-row>
            <b-modal
            id="modal-cadastrar-vacinacao"
            ref="modal"
            title="Cadastro da Medicação"
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
                                label="Nome da Patologia*"
                                invalid-feedback="O nome da patologia é obrigatório">

                                <b-form-input
                                    v-model="nomePatologia"
                                    :state="nomePatologiaState"
                                    required />

                            </b-form-group>
                        </b-col>
                        <b-col>
                            <b-form-group
                                label="Nome do Medicamento*"
                                invalid-feedback="O nome do medicamento é obrigatório">

                                <b-form-input
                                    v-model="nomeMedicamento"
                                    :state="nomeMedicamentoState"
                                    required />

                            </b-form-group>
                        </b-col>
                    </b-row>
                </b-container>

                <b-container>
                    <b-row>
                        <b-col>    
                            <b-form-group
                                label="Data da medicação*" 
                                invalid-feedback="A data da medicação é obrigatoria">
                                <b-form-input
                                    type = "date"
                                    v-model="dataVacinacao"  
                                    :state="dataVacinacaoState"
                                    required />
                            </b-form-group>
                        </b-col>
                        <b-col>    
                            <b-form-group
                                label="Data de Liberação" >
                                <b-form-input
                                    type = "date"
                                    v-model="dataLiberacao"/>
                            </b-form-group>
                        </b-col>
                    </b-row>
                </b-container>

                <b-container>
                    <b-row>
                        <b-col>
                            <b-form-group
                                label="Observação">

                                <b-form-input
                                    v-model="observacao" />

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

        <!-- Cadastro Vacinacao -->
        <b-row>
            <b-modal
            id="modal-editar-vacinacao"
            ref="modal"
            title="Editar Medicação"
            size="lg"
            @show="resetModal"
            @hidden="resetModal"
            @ok="editarOk">

            Deseja realmente editar o medicamento do animal <strong>{{vacina.nomeAnimal}}</strong> ?
            <br><br>

            <form ref="form" @submit.stop.prevent="handleSubmit">
                
                <b-container>
                    <b-row>
                        <b-col>
                            <b-form-group
                                label="Nome*">

                                <b-form-input 
                                    v-model="vacina.nomeAnimal"
                                    disabled />
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col>
                            <b-form-group
                                label="Nome da Patologia*"
                                invalid-feedback="O nome da Patologia é obrigatório">

                                <b-form-input
                                    v-model="vacina.nomePatologia"
                                    :state="nomePatologiaState"
                                    required />

                            </b-form-group>
                        </b-col>
                        <b-col>
                            <b-form-group
                                label="Nome do Medicamento*"
                                invalid-feedback="O nome do medicamento é obrigatório">

                                <b-form-input
                                    v-model="vacina.nomeMedicamento"
                                    :state="nomeMedicamentoState"
                                    required />

                            </b-form-group>
                        </b-col>
                    </b-row>
                </b-container>

                <b-container>
                    <b-row>
                        <b-col>    
                            <b-form-group
                                label="Data da Medicação*" 
                                invalid-feedback="A data de medicação é obrigatoria">
                                <b-form-input
                                    type = "date"
                                    v-model="vacina.dataVacinacao"  
                                    :state="dataVacinacaoState"
                                    required />
                            </b-form-group>
                        </b-col>
                        <b-col>    
                            <b-form-group
                                label="Data de Liberação" >
                                <b-form-input
                                    type = "date"
                                    v-model="vacina.dataLiberacao"/>
                            </b-form-group>
                        </b-col>
                    </b-row>
                </b-container>

                <b-container>
                    <b-row>
                        
                        <b-col>
                            <b-form-group
                                label="Observação">

                                <b-form-input
                                    v-model="vacina.observacao" />

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

        <!-- Excluir Vacinacao -->
        <b-row>
            <b-modal
                id="modal-excluir-vacinacao"
                title="Excluir Medicação" 
                size="lg"
                @ok="remove">
                    <br>
                    Deseja realmente excluir a vacinacao do animal <strong>{{vacina.nomeAnimal}}</strong> ?

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
    name: "VacinacaoList",
    data () {
        return {
            filter: '',
            currentPage: 1,
            perPage: 5,
            nomeAnimal: null,
            brinco: null,
            nomePatologia: null,
            nomeMedicamento: null,
            observacao: null,
            dataVacinacao: new Date().toISOString().substr(0, 10),
            dataLiberacao: null,
            nomeAnimalState: null,
            nomePatologiaState: null,
            nomeMedicamentoState: null,
            dataVacinacaoState: null,

            vacina: {},
            vacinas: [],

            animal: {},
            animais: [],

            fields: [
                { key: 'nomeAnimal', label: 'Nome do Animal', sortable: true},
                { key: 'brinco', label: 'Brinco', sortable: true},
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
                { key: 'actions', label: 'Ações' }
            ]

        }
    },
    async created() {
        try {
        const resVacina = await axios.get(`${baseApiUrl}/vacinas`);
        const resAnimal = await axios.get(`${baseApiUrl}/animais?ativo=true`);

        this.vacinas = resVacina.data;
        this.animais = resAnimal.data;

        } catch (e) {
        console.error(e);
        }
    },
    methods: {
        checkFormValidity() {
            const valid = this.$refs.form.checkValidity()
            this.nomeAnimalState = valid
            this.nomePatologiaState = valid
            this.nomeMedicamentoState = valid
            this.dataVacinacaoState = valid
            return valid
        },
        resetModal() {
            this.nomeAnimal = ''
            this.nomePatologia = ''
            this.nomeMedicamento = ''
            this.observacao = ''
            //this.dataVacinacao = ''
            this.dataLiberacao = ''
            this.nomeAnimalState = null
            this.nomePatologiaState = null
            this.nomeMedicamentoState = null
            this.dataVacinacaoState = null
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

                const res = await axios.post(`${baseApiUrl}/vacinas`, { 
                    nomeAnimal: this.backupAnimal.nomeAnimal, 
                    brinco: this.backupAnimal.brinco, 
                    nomePatologia: this.nomePatologia,
                    nomeMedicamento: this.nomeMedicamento,
                    observacao: this.observacao, 
                    dataVacinacao: this.dataVacinacao, 
                    dataLiberacao: this.dataLiberacao});

                    this.vacinas = [...this.vacinas, res.data];

            } catch (e) {
                console.error(e);
            }

            // Esconder o modal manualmente
            this.$nextTick(() => {
                this.$bvModal.hide('modal-cadastrar-vacinacao')
            })
        },
        async editar() {
            if (!this.checkFormValidity()) {
                return
            }
            try {
                const id = this.vacina.id
                const res = await axios.put(`${baseApiUrl}/vacinas/${id}`, { 
                    nomeAnimal: this.vacina.nomeAnimal, 
                    brinco: this.vacina.brinco, 
                    nomePatologia: this.vacina.nomePatologia, 
                    nomeMedicamento: this.vacina.nomeMedicamento, 
                    observacao: this.vacina.observacao, 
                    dataVacinacao: this.vacina.dataVacinacao, 
                    dataLiberacao: this.vacina.dataLiberacao});

                    this.vacinas = [...this.vacinas, res.data];

            } catch (e) {
                console.error(e);
            }

            // Esconder o modal manualmente
            this.$nextTick(() => {
                //this.$bvModal.hide('modal-cadastrar-vacina')
                location.reload();
            })
        },
        async remove() {
            try {
                const id = this.vacina.id
                await axios.delete(`${baseApiUrl}/vacinas/${id}`)
                    .then(() => {
                        location.reload();
                    });
            } catch (e) {
                console.error(e);
            }

            this.$nextTick(() => {
                this.$bvModal.hide('modal-excluir-vacina')
            })
        },
        loadVacinacao(vacina) {
            this.vacina = { ...vacina }
        }
    }
}
</script>

<style>

</style>