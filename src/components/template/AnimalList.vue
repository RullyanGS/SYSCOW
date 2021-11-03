<template>
    <div class="animalList">
        <ul>
            <b-table hover striped :items="animais" :fields="fields"></b-table>
        </ul>

        <b-button v-b-modal.modal-prevent-closing>Cadastrar</b-button>

        <b-modal
        id="modal-prevent-closing"
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
                            :state="nomeState">
                            <b-form-input
                                v-model="nomeAnimal"
                                :state="nomeState"
                                required />
                        </b-form-group>
                    </b-col>
                    <b-col>
                        <b-form-group
                            label="Brinco*"
                            invalid-feedback="O brinco é obrigatório"
                            :state="brincoState">
                            <b-form-input
                                v-model="brinco"
                                :state="brincoState"
                                required />
                        </b-form-group>
                    </b-col>
                    <b-col>    
                        <b-form-group
                            label="Data de nascimento*"
                            invalid-feedback="A data de nascimento é obrigatório"
                            :state="brincoState">
                            <b-form-input
                                type = "date"
                                v-model="dataNascimento"
                                required />
                        </b-form-group>
                    </b-col>
                </b-row>
            </b-container>

            <b-container class="bv-example-row">
                <b-row>
                    <b-col>
                        <b-form-group
                            label="Sexo*"
                            invalid-feedback="O sexo é obrigatório"
                            :state="sexoState">
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
                                v-model="peso" />
                        </b-form-group>
                    </b-col>
                        <b-form-group
                            label="Origem*"
                            invalid-feedback="A origem é obrigatório"
                            :state="origemState">
                            <b-form-select 
                                v-model="origem" 
                                :options="opcaoOrigem">
                                <template #first>
                                    <b-form-select-option :value="null" disabled>-- Por favor selecione uma opção --</b-form-select-option>
                                </template>
                            </b-form-select>
                        </b-form-group>
                    <b-col>
                        <b-form-group
                            label="Raça*"
                            invalid-feedback="A raça é obrigatório"
                            :state="racaState">
                            <b-form-select 
                                v-model="raca" 
                                :options="opcaoRaca">
                                <template #first>
                                    <b-form-select-option :value="null" disabled>-- Por favor selecione uma opção --</b-form-select-option>
                                </template>
                            </b-form-select>
                        </b-form-group>
                    </b-col>
                </b-row>
            </b-container>

            <b-container class="bv-example-row">
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
    </div>
</template>

<script>
import axios from "axios";
const baseURL = "http://localhost:3001/animais";

export default {
    name: "AnimalList",
    data() {
        return {
            peso: '',
            nomeAnimal: '',
            nomeState: null,
            brinco: '',
            brincoState: null,
            dataNascimento: '',
            sexo: null,
            sexoState: null,
            origem: null,
            origemState: null,
            raca: null,
            racaState: null,
            nomeMae: '',
            nomePai: '',
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
            this.nomeState = valid
            this.brincoState = valid
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
            this.nomeState = null
            this.brincoState = null
            this.sexoState = null
            this.origemState = null
            this.racaState = null
        },
        handleOk(bvModalEvt) {
            bvModalEvt.preventDefault()
            this.handleSubmit()
        },
        async handleSubmit() {
            if (!this.checkFormValidity()) {
                return
            }
            try {
                const res = axios.post(baseURL, { 
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
                this.nomeAnimal = "";
                this.brinco = "";
                this.dataNascimento = "";
                this.sexo = "";
                this.peso = ""
                this.origem = "";
                this.raca = "";
                this.nomeMae = "";
                this.nomePai = "";
            } catch (e) {
                console.error(e);
            }

            // Esconder o modal manualmente
            this.$nextTick(() => {
                this.$bvModal.hide('modal-prevent-closing')
            })
        }
    }
};
</script>

<style>

</style>