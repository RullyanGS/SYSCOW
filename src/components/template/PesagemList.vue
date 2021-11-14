<template>
    <div class="pesagemList">

        <!-- Tabela Pesagem -->
        <ul>
            <b-table hover striped :items="pesagens" :fields="fields">          
                <template #cell(actions)="data">
                    <b-button variant="warning" v-b-modal.modal-editar-peso @click="loadPesagem(data.item)" class="mr-2">
                        <i class="fa fa-pencil"></i>
                    </b-button>
                    <b-button variant="danger" v-b-modal.modal-excluir-peso @click="loadPesagem(data.item)">
                        <i class="fa fa-trash"></i>
                    </b-button>
                </template>
            </b-table>
        </ul>

        <b-button v-b-modal.modal-cadastrar-peso>Cadastrar</b-button>

        <!-- Cadastro Peso -->
        <b-row>
            <b-modal
            id="modal-cadastrar-peso"
            ref="modal"
            title="Cadastro de Peso"
            size="lg"
            @show="resetModal"
            @hidden="resetModal"
            @ok="cadastroOk">

            <form ref="form" @submit.stop.prevent="handleSubmit">
                
                <b-container>
                    <b-row>
                        <b-col>
                            <b-form-group
                                label="Nome*"
                                invalid-feedback="O nome é obrigatório">

                                <b-form-select
                                    v-model="nomeAnimal"
                                    :state="nomeAnimalState"
                                    required >
                                    <b-form-select-option v-for="animal of animais" :key="animal.id" :value="animal.nomeAnimal">
                                        {{animal.nomeAnimal}}
                                    </b-form-select-option>

                                </b-form-select>
                            </b-form-group>
                        </b-col>
                        <b-col>
                            <b-form-group
                                label="Peso*"
                                invalid-feedback="O Peso é obrigatório">

                                <b-form-input
                                    type="number"
                                    v-model="peso"
                                    :state="pesoState"
                                    required />

                            </b-form-group>
                        </b-col>
                        <b-col>    
                            <b-form-group
                                label="Data de Pesagem*"
                                invalid-feedback="A data da Pesagem é obrigatório">
                                <b-form-input
                                    type = "date"
                                    v-model="dataPesagem"
                                    :state="dataPesagemState"
                                    required />
                            </b-form-group>
                        </b-col>
                    </b-row>
                </b-container>

            </form>
            </b-modal>
        </b-row>

        <!-- Editar Peso -->
        <b-row>
            <b-modal
            id="modal-editar-peso"
            ref="modal"
            title="Editar Peso do animal"
            size="lg"
            @show="resetModal"
            @hidden="resetModal"
            @ok="editarOk">

            Deseja realmente editar o peso do animal <strong>{{pesagem.nomeAnimal}}</strong> ?
            <br><br>

            <form ref="form" @submit.stop.prevent="cadastrar">
                
                <b-container>
                    <b-row>
                        <b-col>
                            <b-form-group
                                label="Nome*"
                                invalid-feedback="O nome é obrigatório">
                                
                                <b-form-select
                                    v-model="pesagem.nomeAnimal"
                                    :state="nomeAnimalState" 
                                    required >

                                    <b-form-select-option v-for="animal of animais" :key="animal.id" :value="animal.nomeAnimal">
                                        {{animal.nomeAnimal}}
                                    </b-form-select-option>

                                </b-form-select>
                            </b-form-group>
                        </b-col>
                        <b-col>
                            <b-form-group
                                label="Peso*"
                                invalid-feedback="O Peso é obrigatório">

                                <b-form-input
                                    v-model="pesagem.peso"
                                    :state="pesoState"
                                    required 
                                    type="number"/>
                                    
                            </b-form-group>
                        </b-col>
                        <b-col>    
                            <b-form-group
                                label="Data de Pesagem*"
                                invalid-feedback="A data da Pesagem é obrigatório">
                                <b-form-input
                                    type = "date"
                                    v-model="pesagem.dataPesagem"
                                    required
                                    :state="dataPesagemState" />
                            </b-form-group>
                        </b-col>
                    </b-row>
                </b-container>

            </form>

            </b-modal>
        </b-row>

        <!-- Excluir Peso -->
        <b-row>
            <b-modal
                id="modal-excluir-peso"
                title="Excluir Peso" 
                size="lg"
                @ok="remove">
                    <br>
                    Deseja realmente excluir o peso do animal <strong>{{pesagem.nomeAnimal}}</strong> ?
            </b-modal>
        </b-row>


    </div>
</template>

<script>
import axios from "axios";
const baseURL = "http://localhost:3001";

export default {
    name: "PesagemList",
    data () {
        return {
            nomeAnimal: '',
            nomeAnimalState: null,
            peso: '',
            pesoState: null,
            dataPesagem: '',
            dataPesagemState: null,
            animal: {},
            animais: [],

            pesagem: {},
            pesagens: [],
            fields: [
                { key: 'nomeAnimal', label: 'Nome', sortable: true},
                { key: 'dataPesagem', label: 'Data Pesagem', sortable: true},
                { key: 'peso', label: 'Peso (Kg)', sortable: true},
                { key: 'actions', label: 'Ações' }
            ]
        }      
    },
    async created() {
        try {
        const resPesagem = await axios.get(`${baseURL}/pesagens`);
        const resAnimal = await axios.get(`${baseURL}/animais?ativo=true`);

        this.pesagens = resPesagem.data;
        this.animais = resAnimal.data;
        } catch (e) {
        console.error(e);
        }
    },
    methods: {
        checkFormValidity() {
            const valid = this.$refs.form.checkValidity()
            this.nomeAnimalState = valid
            this.pesoState = valid
            this.dataPesagemState = valid
            return valid
        },
        resetModal() {
            this.nomeAnimal = ''
            this.peso = ''
            this.dataPesagem = ''
            this.nomeAnimalState = null
            this.pesoState = null
            this.dataPesagemState = null
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
                const res = await axios.post(`${baseURL}/pesagens`, { 
                    nomeAnimal: this.nomeAnimal, 
                    peso: this.peso, 
                    dataPesagem: this.dataPesagem});

                    this.pesagens = [...this.pesagens, res.data];

            } catch (e) {
                console.error(e);
            }

            // Esconder o modal manualmente
            this.$nextTick(() => {
                this.$bvModal.hide('modal-cadastrar-peso')
            })
        },
        async editar() {
            if (!this.checkFormValidity()) {
                return
            }
            try {
                const id = this.pesagem.id
                const res = await axios.put(`${baseURL}/pesagens/${id}`, { 
                    nomeAnimal: this.pesagem.nomeAnimal, 
                    peso: this.pesagem.peso, 
                    dataPesagem: this.pesagem.dataPesagem});

                    this.pesagens = [...this.pesagens, res.data];

            } catch (e) {
                console.error(e);
            }

            // Esconder o modal manualmente
            this.$nextTick(() => {
                //this.$bvModal.hide('modal-cadastrar-animal')
                location.reload();
            })
        },
        async remove() {
            try {
                const id = this.pesagem.id
                await axios.delete(`${baseURL}/pesagens/${id}`)
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
        loadPesagem(pesagem) {
            this.pesagem = { ...pesagem }
        }
    }
}
</script>

<style>

</style>