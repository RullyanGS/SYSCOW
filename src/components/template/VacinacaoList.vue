<template>
    <div class="vacinacaoList">
        <ul>
            <b-table hover striped :items="vacinas" :fields="fields">          
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

        <b-button v-b-modal.modal-cadastrar-vacinacao>Cadastrar</b-button>

        <!-- Cadastro Vacinacao -->
        <b-row>
            <b-modal
            id="modal-cadastrar-vacinacao"
            ref="modal"
            title="Cadastro da Vacinação"
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
                                label="Nome da Vacina*"
                                invalid-feedback="O nome da Vacina é obrigatório">

                                <b-form-input
                                    v-model="nomeVacina"
                                    :state="nomeVacinaState"
                                    required />

                            </b-form-group>
                        </b-col>
                        <b-col>
                            <b-form-group
                                label="Descrição da Vacina">

                                <b-form-input
                                    v-model="descricaoVacina" />

                            </b-form-group>
                        </b-col>
                    </b-row>
                </b-container>

                <b-container>
                    <b-row>
                        <b-col>    
                            <b-form-group
                                label="Data da Vacinação*" 
                                invalid-feedback="A data de vacinação é obrigatoria">
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

            </form>
            </b-modal>
        </b-row>

        <!-- Cadastro Vacinacao -->
        <b-row>
            <b-modal
            id="modal-editar-vacinacao"
            ref="modal"
            title="Editar Vacinação"
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
                                    v-model="vacina.nomeAnimal"
                                    disabled />
                            </b-form-group>
                        </b-col>
                        <b-col>
                            <b-form-group
                                label="Nome da Vacina*"
                                invalid-feedback="O nome da Vacina é obrigatório">

                                <b-form-input
                                    v-model="vacina.nomeVacina"
                                    :state="nomeVacinaState"
                                    required />

                            </b-form-group>
                        </b-col>
                        <b-col>
                            <b-form-group
                                label="Descrição da Vacina">

                                <b-form-input
                                    v-model="vacina.descricaoVacina" />

                            </b-form-group>
                        </b-col>
                    </b-row>
                </b-container>

                <b-container>
                    <b-row>
                        <b-col>    
                            <b-form-group
                                label="Data da Vacinação*" 
                                invalid-feedback="A data de vacinação é obrigatoria">
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

            </form>
            </b-modal>
        </b-row>

        <!-- Excluir Vacinacao -->
        <b-row>
            <b-modal
                id="modal-excluir-vacinacao"
                title="Excluir Vacinacao" 
                size="lg"
                @ok="remove">
                    <br>
                    Deseja realmente excluir a vacinacao do animal <strong>{{vacina.nomeAnimal}}</strong> ?
            </b-modal>
        </b-row>

    </div>
</template>

<script>
import axios from "axios";
const baseURL = "http://localhost:3001";

export default {
    name: "VacinacaoList",
    data () {
        return {
            nomeAnimal: null,
            nomeVacina: null,
            descricaoVacina: null,
            dataVacinacao: null,
            dataLiberacao: null,
            nomeAnimalState: null,
            nomeVacinaState: null,
            dataVacinacaoState: null,

            vacina: {},
            vacinas: [],

            animal: {},
            animais: [],

            fields: [
                { key: 'nomeAnimal', label: 'Nome do Animal', sortable: true},
                { key: 'nomeVacina', label: 'Nome Vacina', sortable: true},
                { key: 'descricaoVacina', label: 'Descricao da Vacina', sortable: true},
                { key: 'dataVacinacao', label: 'Data da Vacinação', sortable: true},
                { key: 'dataLiberacao', label: 'Data de Liberacao', sortable: true},
                { key: 'actions', label: 'Ações' }
            ]

        }
    },
    async created() {
        try {
        const resVacina = await axios.get(`${baseURL}/vacinas`);
        const resAnimal = await axios.get(`${baseURL}/animais?ativo=true`);

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
            this.nomeVacinaState = valid
            this.dataVacinacaoState = valid
            return valid
        },
        resetModal() {
            this.nomeAnimal = ''
            this.nomeVacina = ''
            this.descricaoVacina = ''
            this.dataVacinacao = ''
            this.dataLiberacao = ''
            this.nomeAnimalState = null
            this.nomeVacinaState = null
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
                const res = await axios.post(`${baseURL}/vacinas`, { 
                    nomeAnimal: this.nomeAnimal, 
                    nomeVacina: this.nomeVacina, 
                    descricaoVacina: this.descricaoVacina, 
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
                const res = await axios.put(`${baseURL}/vacinas/${id}`, { 
                    nomeAnimal: this.vacina.nomeAnimal, 
                    nomeVacina: this.vacina.nomeVacina, 
                    descricaoVacina: this.vacina.descricaoVacina, 
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
                await axios.delete(`${baseURL}/vacinas/${id}`)
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