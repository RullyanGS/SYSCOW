<template>
    <div class="animalList">

        <!-- Tabela Animais -->
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
        
        <!-- Cadastro Animal -->
        <b-row>
            <b-modal
            id="modal-cadastrar-animal"
            ref="modal"
            title="Cadastro de um novo animal"
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
                        <!-- 
                        <b-col>
                            <b-form-group
                                label="Peso (Kg)">
                                <b-form-input
                                    type="number"
                                    v-model="peso" />
                            </b-form-group>
                        </b-col>
                        -->
                            <b-form-group
                                label="Origem*"
                                invalid-feedback="A origem é obrigatório">
                                <b-form-select 
                                    v-model="origem" 
                                    :options="opcaoOrigem"
                                    :state="origemState"
                                    required>
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
                                    :state="racaState"
                                    required>
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

                                <b-form-select
                                    v-model="nomeMae" >
                                    <template #first>
                                        <b-form-select-option :value="null" >Não Cadastrado</b-form-select-option>
                                    </template>
                                    <b-form-select-option v-for="animal of animais" :key="animal.id" :value="animal.nomeAnimal">
                                        {{animal.nomeAnimal}}
                                    </b-form-select-option>
                                </b-form-select>

                            </b-form-group>
                        </b-col>
                        <b-col>
                            <b-form-group
                                label="Nome do pai">

                                <b-form-select
                                    v-model="nomePai" >
                                    <template #first>
                                        <b-form-select-option :value="null" >Não Cadastrado</b-form-select-option>
                                    </template>
                                    <b-form-select-option v-for="animal of animais" :key="animal.id" :value="animal.nomeAnimal">
                                        {{animal.nomeAnimal}}
                                    </b-form-select-option>
                                </b-form-select>
                                    
                            </b-form-group>
                        </b-col>
                    </b-row>
                </b-container>

            </form>
            </b-modal>
        </b-row>

        <!-- Editar Animal -->
        <b-row>
            <b-modal
            id="modal-editar-animal"
            ref="modal"
            title="Editar informações do animal"
            size="lg"
            @show="resetModal"
            @hidden="resetModal"
            @ok="editarOk">

            Deseja realmente editar o animal <strong>{{animal.nomeAnimal}}</strong> ?
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
                                    :state="nomeAnimalState"
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
                                    v-model="animal.dataNascimento"
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
                                    v-model="animal.sexo" 
                                    :options="opcaoSexo"
                                    :state="sexoState"
                                    required>
                                    <template #first>
                                        <b-form-select-option :value="null" disabled>-- Por favor selecione uma opção --</b-form-select-option>
                                    </template>
                                </b-form-select>
                            </b-form-group>
                        </b-col>
                        <!-- 
                        <b-col>
                            <b-form-group
                                label="Peso (Kg)">
                                <b-form-input
                                    type="number"
                                    v-model="animal.peso" />
                            </b-form-group>
                        </b-col>
                        -->
                            <b-form-group
                                label="Origem*"
                                invalid-feedback="A origem é obrigatório">
                                <b-form-select 
                                    v-model="animal.origem" 
                                    :options="opcaoOrigem"
                                    :state="origemState"
                                    required>
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
                                    :options="opcaoRaca"
                                    :state="racaState"
                                    required>
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

                                <b-form-select
                                    v-model="animal.nomeMae" >
                                    <template #first>
                                        <b-form-select-option :value="null" >Não Cadastrado</b-form-select-option>
                                    </template>
                                    <b-form-select-option v-for="animal of animais" :key="animal.id" :value="animal.nomeAnimal">
                                        {{animal.nomeAnimal}}
                                    </b-form-select-option>
                                </b-form-select>

                            </b-form-group>
                        </b-col>
                        <b-col>
                            <b-form-group
                                label="Nome do pai">

                                <b-form-select
                                    v-model="animal.nomePai" >
                                    <template #first>
                                        <b-form-select-option :value="null" >Não Cadastrado</b-form-select-option>
                                    </template>
                                    <b-form-select-option v-for="animal of animais" :key="animal.id" :value="animal.nomeAnimal">
                                        {{animal.nomeAnimal}}
                                    </b-form-select-option>
                                </b-form-select>

                            </b-form-group>
                        </b-col>
                    </b-row>
                </b-container>

            </form>

            </b-modal>
        </b-row>

        <!-- Excluir Animal -->
        <b-row>
            <b-modal
                id="modal-excluir-animal"
                title="Excluir Animal" 
                size="lg"
                @ok="remove">
                    <br>
                    Deseja realmente excluir o animal <strong>{{animal.nomeAnimal}}</strong> ?
            </b-modal>
        </b-row>


    </div>
</template>

<script>
import axios from "axios";
const baseURL = "http://localhost:3001";

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
            //peso: null,
            origem: null,
            origemState: null,
            raca: null,
            racaState: null,
            nomeMae: null,
            nomePai: null,
            ativo: true,
            opcaoSexo: [
                { value: 'F', text: 'Fêmea' }, 
                { value: 'M', text: 'Macho'}],
            opcaoOrigem: [
                { value: 'Compra', text: 'Compra' },
                { value: 'Nascimento', text: 'Nascimento' }],
            opcaoRaca: [
                { value: 'Aberdeen Angus', text: 'Aberdeen Angus' },
                { value: 'Angus', text: 'Angus' },
                { value: 'Ayrshire', text: 'Ayrshire' },
                { value: 'Black Dorper', text: 'Black Dorper' },
                { value: 'Braford', text: 'Braford' },
                { value: 'Brahman', text: 'Brahman' },
                { value: 'Brangus', text: 'Brangus' },
                { value: 'Canchim', text: 'Canchim' },
                { value: 'Caracu', text: 'Caracu' },
                { value: 'Charolês', text: 'Charolês' },
                { value: 'Composto', text: 'Composto' },
                { value: 'Cruzamento Industrial', text: 'Cruzamento Industrial' },
                { value: 'Desconhecida', text: 'Desconhecida' },
                { value: 'F1', text: 'F1' },
                { value: 'Friesian', text: 'Friesian' },
                { value: 'Gir', text: 'Gir' },
                { value: 'Gir Leiteiro', text: 'Gir Leiteiro' },
                { value: 'Girolando', text: 'Girolando' },
                { value: 'Guernsey', text: 'Guernsey' },
                { value: 'Guzerá', text: 'Guzerá' },
                { value: 'Guzerá Leiteiro', text: 'Guzerá Leiteiro' },
                { value: 'Guzolando', text: 'Guzolando' },
                { value: 'Hereford', text: 'Hereford' },
                { value: 'Holandês Preto e Branco', text: 'Holandês Preto e Branco' },
                { value: 'Holandês Vermelho', text: 'Holandês Vermelho' },
                { value: 'Jafarabadi', text: 'Jafarabadi' },
                { value: 'Jersey', text: 'Jersey' },
                { value: 'Jersolando', text: 'Jersolando' },
                { value: 'Kiwi', text: 'Kiwi' },
                { value: 'Mestiça', text: 'Mestiça' },
                { value: 'Montbeliard', text: 'Montbeliard' },
                { value: 'Murrah', text: 'Murrah' },
                { value: 'Nelorando', text: 'Nelorando' },
                { value: 'Nelore', text: 'Nelore' },
                { value: 'Nelore pintado', text: 'Nelore pintado' },
                { value: 'Normando', text: 'Normando' },
                { value: 'Norueguês Vermelho', text: 'Norueguês Vermelho' },
                { value: 'Pardo Alpina', text: 'Pardo Alpina' },
                { value: 'Pardo Suíça (Schwyz)', text: 'Pardo Suíça (Schwyz)' },
                { value: 'Poll Dorset', text: 'Poll Dorset' },
                { value: 'Purunã', text: 'Purunã' },
                { value: 'Red Angus', text: 'Red Angus' },
                { value: 'S1', text: 'S1' },
                { value: 'Saanen', text: 'Saanen' },
                { value: 'Santa Inês', text: 'Santa Inês' },
                { value: 'Senepol', text: 'Senepol' },
                { value: 'Simental', text: 'Simental' },
                { value: 'Sindi', text: 'Sindi' },
                { value: 'Sindolando', text: 'Sindolando' },
                { value: 'Sinjer', text: 'Sinjer' },
                { value: 'Tabapuã', text: 'Tabapuã' },
                { value: 'Tabolanda', text: 'Tabolanda' },
                { value: 'Tricross', text: 'Tricross' },
                { value: 'WAGUYU', text: 'WAGUYU' },
                { value: 'White Dorper', text: 'White Dorper' },
                { value: 'Zebuíno', text: 'Zebuíno' },
                { value: 'Outra', text: 'Outra' },
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
        const res = await axios.get(`${baseURL}/animais?ativo=true`);

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
            //this.peso = ''
            this.nomeAnimalState = null
            this.brincoState = null
            this.dataNascimentoState = null
            this.sexoState = null
            this.origemState = null
            this.racaState = null
            this.ativo = true
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
                const res = await axios.post(`${baseURL}/animais`, { 
                    nomeAnimal: this.nomeAnimal, 
                    brinco: this.brinco, 
                    dataNascimento: this.dataNascimento,
                    sexo: this.sexo, 
                    //peso: this.peso,
                    origem: this.origem,
                    raca: this.raca,
                    nomeMae: this.nomeMae,
                    nomePai: this.nomePai,
                    ativo: this.ativo});

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
            if (!this.checkFormValidity()) {
                return
            }
            try {
                const id = this.animal.id
                const res = await axios.put(`${baseURL}/animais/${id}`, { 
                    nomeAnimal: this.animal.nomeAnimal, 
                    brinco: this.animal.brinco, 
                    dataNascimento: this.animal.dataNascimento,
                    sexo: this.animal.sexo, 
                    //peso: this.animal.peso,
                    origem: this.animal.origem,
                    raca: this.animal.raca,
                    nomeMae: this.animal.nomeMae,
                    nomePai: this.animal.nomePai,
                    ativo: this.animal.ativo});

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
                await axios.patch(`${baseURL}/animais/${this.nomeAnimal}`, {ativo: true})

                const id = this.animal.id
                await axios.delete(`${baseURL}/animais/${id}`)
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