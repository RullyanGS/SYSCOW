<template>
    <div class="animalList">

        <ul>
            <b-table hover striped :items="animais" :fields="fields">          
                <template #cell(actions)="data">
                    <b-button variant="warning" v-b-modal.modal-editar-animal @click="loadUser(data.item)" class="mr-2">
                        <i class="fa fa-pencil"></i>
                    </b-button>
                    <b-button variant="danger" v-b-modal.modal-excluir-animal @click="loadUser(data.item)">
                        <i class="fa fa-trash"></i>
                    </b-button>
                </template>
            </b-table>
        </ul>

        <b-button v-b-modal.modal-cadastrar-animal>Cadastrar</b-button>
        
            <b-modal
            id="modal-excluir-animal"
            title="Excluir Animal" 
            size="lg"
            hide-footer>
                <br>
                Deseja realmente excluir o animal: <strong>{{animal.nomeAnimal}}</strong>
                <br>
                <br>
                <b-button variant="danger" @click="remove">Sim</b-button>
            </b-modal>
        

        <b-row>
            <b-modal
            id="modal-cadastrar-animal"
            ref="modal"
            title="Cadastro de um novo animal"
            size="lg"
            @show="resetModal"
            @hidden="resetModal"
            @ok="handleOk">

            <form ref="form" @submit.stop.prevent="handleSubmit">
                
                <b-container>
                    <b-row>
                        <b-col>
                            <b-form-group
                                label="Nome*"
                                invalid-feedback="O nome é obrigatório"
                                :state="nomeAnimalState">
                                <b-form-input
                                    v-model="nomeAnimal"
                                    :state="nomeAnimalState"
                                    required />
                            </b-form-group>
                        </b-col>
                        <b-col>
                            <b-form-group
                                label="Brinco*"
                                invalid-feedback="O brinco é obrigatório">
                                <b-form-input
                                    v-model="brinco"
                                    type="number"
                                    :state="brincoState"
                                    required />
                            </b-form-group>
                        </b-col>
                        <b-col>    
                            <b-form-group
                                label="Data de nascimento*"
                                invalid-feedback="A data de nascimento é obrigatório">
                                <b-form-input
                                    type = "date"
                                    v-model="dataNascimento"
                                    :state="dataNascimentoState"
                                    required />
                            </b-form-group>
                        </b-col>
                    </b-row>
                </b-container>

                <b-container>
                    <b-row>
                        <b-col>
                            <b-form-group
                                label="Sexo*"
                                invalid-feedback="O sexo é obrigatório">
                                <b-form-select 
                                    v-model="sexo" 
                                    :options="opcaoSexo"
                                    :state="sexoState"
                                    required>
                                    <template #first>
                                        <b-form-select-option :value="null" disabled>-- Por favor selecione uma opção --</b-form-select-option>
                                    </template>
                                </b-form-select>
                            </b-form-group>
                        </b-col>
                        <b-col>
                            <b-form-group
                                label="Peso (Kg)">
                                <b-form-input
                                    type="number"
                                    v-model="peso" />
                            </b-form-group>
                        </b-col>
                            <b-form-group
                                label="Origem*"
                                invalid-feedback="A origem é obrigatório">
                                <b-form-select 
                                    v-model="origem" 
                                    :options="opcaoOrigem"
                                    :state="origemState">
                                    <template #first>
                                        <b-form-select-option :value="null" disabled>-- Por favor selecione uma opção --</b-form-select-option>
                                    </template>
                                </b-form-select>
                            </b-form-group>
                        <b-col>
                            <b-form-group
                                label="Raça*"
                                invalid-feedback="A raça é obrigatório">
                                <b-form-select 
                                    v-model="raca" 
                                    :options="opcaoRaca"
                                    :state="racaState">
                                    <template #first>
                                        <b-form-select-option :value="null" disabled>-- Por favor selecione uma opção --</b-form-select-option>
                                    </template>
                                </b-form-select>
                            </b-form-group>
                        </b-col>
                    </b-row>
                </b-container>

                <b-container>
                    <b-row>
                        <b-col>
                            <b-form-group
                                label="Nome da mãe">
                                <b-form-input
                                    v-model="nomeMae" />
                            </b-form-group>
                        </b-col>
                        <b-col>
                            <b-form-group
                                label="Nome do pai">
                                <b-form-input
                                    v-model="nomePai" />
                            </b-form-group>
                        </b-col>
                    </b-row>
                </b-container>

            </form>
            </b-modal>
        </b-row>

        <b-row>
            <b-modal
            id="modal-editar-animal"
            ref="modal"
            title="Editar informações do animal"
            size="lg"
            @show="resetModal"
            @hidden="resetModal"
            @ok="handleOk"
            hide-footer>

            Deseja realmente editar o animal: <strong>{{animal.nomeAnimal}}</strong>
            <br><br>

            <form ref="form" @submit.stop.prevent="cadastrar">
                
                <b-container>
                    <b-row>
                        <b-col>
                            <b-form-group
                                label="Nome*"
                                invalid-feedback="O nome é obrigatório">
                                <b-form-input
                                    v-model="animal.nomeAnimal"
                                    required />
                            </b-form-group>
                        </b-col>
                        <b-col>
                            <b-form-group
                                label="Brinco*"
                                invalid-feedback="O brinco é obrigatório">
                                <b-form-input
                                    v-model="animal.brinco"
                                    type="number"
                                    required />
                            </b-form-group>
                        </b-col>
                        <b-col>    
                            <b-form-group
                                label="Data de nascimento*"
                                invalid-feedback="A data de nascimento é obrigatório">
                                <b-form-input
                                    type = "date"
                                    v-model="animal.dataNascimento"
                                    required />
                            </b-form-group>
                        </b-col>
                    </b-row>
                </b-container>

                <b-container>
                    <b-row>
                        <b-col>
                            <b-form-group
                                label="Sexo*"
                                invalid-feedback="O sexo é obrigatório">
                                <b-form-select 
                                    v-model="animal.sexo" 
                                    :options="opcaoSexo"
                                    required>
                                    <template #first>
                                        <b-form-select-option :value="null" disabled>-- Por favor selecione uma opção --</b-form-select-option>
                                    </template>
                                </b-form-select>
                            </b-form-group>
                        </b-col>
                        <b-col>
                            <b-form-group
                                label="Peso (Kg)">
                                <b-form-input
                                    type="number"
                                    v-model="animal.peso" />
                            </b-form-group>
                        </b-col>
                            <b-form-group
                                label="Origem*"
                                invalid-feedback="A origem é obrigatório">
                                <b-form-select 
                                    v-model="animal.origem" 
                                    :options="opcaoOrigem">
                                    <template #first>
                                        <b-form-select-option :value="null" disabled>-- Por favor selecione uma opção --</b-form-select-option>
                                    </template>
                                </b-form-select>
                            </b-form-group>
                        <b-col>
                            <b-form-group
                                label="Raça*"
                                invalid-feedback="A raça é obrigatório">
                                <b-form-select 
                                    v-model="animal.raca" 
                                    :options="opcaoRaca">
                                    <template #first>
                                        <b-form-select-option :value="null" disabled>-- Por favor selecione uma opção --</b-form-select-option>
                                    </template>
                                </b-form-select>
                            </b-form-group>
                        </b-col>
                    </b-row>
                </b-container>

                <b-container>
                    <b-row>
                        <b-col>
                            <b-form-group
                                label="Nome da mãe">
                                <b-form-input
                                    v-model="animal.nomeMae" />
                            </b-form-group>
                        </b-col>
                        <b-col>
                            <b-form-group
                                label="Nome do pai">
                                <b-form-input
                                    v-model="animal.nomePai" />
                            </b-form-group>
                        </b-col>
                    </b-row>
                </b-container>

            </form>

            <b-button variant="danger" @click="editar">Sim</b-button>

            </b-modal>
        </b-row>
    </div>
</template>

<script>
import axios from "axios";
const baseURL = "http://localhost:3001/animais";

export default {
    name: "AnimalList",
    data() {
        return {
            nomeAnimal: null,
            nomeAnimalState: null,
            brinco: null,
            brincoState: null,
            dataNascimento: null,
            dataNascimentoState: null,
            sexo: null,
            sexoState: null,
            peso: null,
            origem: null,
            origemState: null,
            raca: null,
            racaState: null,
            nomeMae: null,
            nomePai: null,
            opcaoSexo: [
                { value: 'F', text: 'Fêmea' }, 
                { value: 'M', text: 'Macho'}],
            opcaoOrigem: [
                { value: 'compra', text: 'Compra' },
                { value: 'nasceu', text: 'Nasceu na fazenda' }],
            opcaoRaca: [
                { value: 'Angus', text: 'Angus' },
                { value: 'Nelore', text: 'Nelore' },
                { value: 'Brahman', text: 'Brahman' },
                { value: 'Brangus', text: 'Brangus' },
                { value: 'Senepol', text: 'Senepol' },
                { value: 'Hereford', text: 'Hereford' },
                { value: 'Caracu', text: 'Caracu' },
                { value: 'Charolês', text: 'Charolês' },
                { value: 'Guzerá', text: 'Guzerá' },
                { value: 'Tabapuã', text: 'Tabapuã' }],
            animal: {},
            animais: [],
            fields: [
                { key: 'brinco', label: 'Brinco', sortable: true},
                { key: 'nomeAnimal', label: 'Nome', sortable: true},
                { key: 'raca', label: 'Raça', sortable: true},
                { key: 'sexo', label: 'Sexo', sortable: true},
                { key: 'dataNascimento', label: 'Data Nascimento', sortable: true},
                { key: 'actions', label: 'Ações' }
            ]
        };
    },
    async created() {
        try {
        const res = await axios.get(baseURL);

        this.animais = res.data;
        } catch (e) {
        console.error(e);
        }
    },
    methods: {
        checkFormValidity() {
            const valid = this.$refs.form.checkValidity()
            this.nomeAnimalState = valid
            this.brincoState = valid
            this.dataNascimentoState = valid
            this.sexoState = valid
            this.origemState = valid
            this.racaState = valid
            return valid
        },
        resetModal() {
            this.nomeAnimal = ''
            this.brinco = ''
            this.dataNascimento = ''
            this.peso = ''
            this.nomeMae =  ''
            this.nomePai = ''
            this.nomeAnimalState = null
            this.brincoState = null
            this.dataNascimentoState = null
            this.sexoState = null
            this.origemState = null
            this.racaState = null
        },
        handleOk(bvModalEvt) {
            bvModalEvt.preventDefault()
            this.cadastrar()
        },
        async cadastrar() {
            if (!this.checkFormValidity()) {
                return
            }
            try {
                const res = await axios.post(baseURL, { 
                    nomeAnimal: this.nomeAnimal, 
                    brinco: this.brinco, 
                    dataNascimento: this.dataNascimento,
                    sexo: this.sexo, 
                    peso: this.peso,
                    origem: this.origem,
                    raca: this.raca,
                    nomeMae: this.nomeMae,
                    nomePai: this.nomePai});

                    this.animais = [...this.animais, res.data];

            } catch (e) {
                console.error(e);
            }

            // Esconder o modal manualmente
            this.$nextTick(() => {
                this.$bvModal.hide('modal-cadastrar-animal')
            })
        },
        async editar() {
            try {
                const id = this.animal.id
                const res = await axios.put(`${baseURL}/${id}`, { 
                    nomeAnimal: this.animal.nomeAnimal, 
                    brinco: this.animal.brinco, 
                    dataNascimento: this.animal.dataNascimento,
                    sexo: this.animal.sexo, 
                    peso: this.animal.peso,
                    origem: this.animal.origem,
                    raca: this.animal.raca,
                    nomeMae: this.animal.nomeMae,
                    nomePai: this.animal.nomePai});

                    this.animais = [...this.animais, res.data];

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
                const id = this.animal.id
                await axios.delete(`${baseURL}/${id}`)
                    .then(() => {
                        location.reload();
                    });
            } catch (e) {
                console.error(e);
            }

            this.$nextTick(() => {
                this.$bvModal.hide('modal-excluir-animal')
            })
        },
        loadUser(animal) {
            this.animal = { ...animal }
        }
    }
};
</script>

<style>

</style>