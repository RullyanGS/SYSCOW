<template>
    <div class="descarteList">

        <b-row>
            <b-col cols="1" />
            <b-col cols="6">
                <b-input v-model="filter" placeholder="Buscar..."></b-input>
            </b-col>
            <b-col cols="1" />
            <b-col cols="4">
                <b-button v-b-modal.modal-cadastrar-descarte variant="primary">Cadastrar</b-button>
            </b-col>
        </b-row>
        
        <hr />

        <ul>
            <b-table hover striped :items="descartes" :fields="fields" :current-page="currentPage" :per-page="5" :filter="filter">          
                <template #cell(actions)="data">
                    <b-button variant="warning" v-b-modal.modal-editar-descarte @click="loadDescarte(data.item)" class="mr-2">
                        <i class="fa fa-pencil"></i>
                    </b-button>
                    <b-button variant="danger" v-b-modal.modal-excluir-descarte @click="loadDescarte(data.item)">
                        <i class="fa fa-trash"></i>
                    </b-button>
                </template>
            </b-table>
        </ul>

        <ul class="justify-content-center row my-1">
            <b-pagination size="md" :total-rows="this.descartes.length" :per-page="5" v-model="currentPage" />
        </ul>

        <!-- Cadastro Descarte -->
        <b-row>
            <b-modal
            id="modal-cadastrar-descarte"
            ref="modal"
            title="Cadastro de descarte"
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
                                label="Motivo*"
                                invalid-feedback="O Motivo é obrigatório">

                                <b-form-select
                                    v-model="motivo"
                                    :state="motivoState"
                                    :options="opcaoMotivo"
                                    required >
                                    <template #first>
                                        <b-form-select-option :value="null" disabled>-- Por favor selecione uma opção --</b-form-select-option>
                                    </template>
                                </b-form-select>
                            </b-form-group>
                        </b-col>
                        <b-col>    
                            <b-form-group
                                label="Data de Descarte*"
                                invalid-feedback="A data do Descarte é obrigatório">
                                <b-form-input
                                    type = "date"
                                    v-model="dataDescarte"
                                    :state="dataDescarteState"
                                    :max="max"
                                    required />
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col>
                            <b-form-group
                                label="Causa">

                                <b-form-input
                                    v-model="causa"/>

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

        <!-- Editar Descarte -->
        <b-row>
            <b-modal
            id="modal-editar-descarte"
            ref="modal"
            title="Editar Descarte do animal"
            size="lg"
            @show="resetModal"
            @hidden="resetModal"
            @ok="editarOk">

            Deseja realmente editar o descarte do animal <strong>{{descarte.nomeAnimal}}</strong> ?
            <br><br>

            <form ref="form" @submit.stop.prevent="cadastrar">
                
                <b-container>
                    <b-row>
                        <b-col>
                            <b-form-group
                                label="Nome*">
                                
                                <b-form-input
                                    v-model="descarte.nomeAnimal"
                                    disabled />
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col>
                            <b-form-group
                                label="Motivo*"
                                invalid-feedback="O Motivo é obrigatório">

                                <b-form-select
                                    v-model="descarte.motivo"
                                    :state="motivoState"
                                    :options="opcaoMotivo"
                                    required >
                                    <template #first>
                                        <b-form-select-option :value="null" disabled>-- Por favor selecione uma opção --</b-form-select-option>
                                    </template>
                                </b-form-select>
                            </b-form-group>
                        </b-col>
                        <b-col>    
                            <b-form-group
                                label="Data de Descarte*"
                                invalid-feedback="A data do Descarte é obrigatório">
                                <b-form-input
                                    type = "date"
                                    v-model="descarte.dataDescarte"
                                    :state="dataDescarteState"
                                    :max="max"
                                    required />
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col>
                            <b-form-group
                                label="Causa">

                                <b-form-input
                                    v-model="descarte.causa"/>

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

        <!-- Excluir Descarte -->
        <b-row>
            <b-modal
                id="modal-excluir-descarte"
                title="Excluir Descarte" 
                size="lg"
                @ok="remove">
                    <br>
                    Deseja realmente excluir o descarte do animal <strong>{{descarte.nomeAnimal}}</strong> ?

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
    name: "DescarteList",
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
            nomeAnimal: null,
            nomeAnimalState: null,
            brinco: null,
            motivo: null,
            motivoState: null,
            causa: null,
            dataDescarte: new Date().toISOString().substr(0, 10),
            dataDescarteState: null,

            backupAnimal: [],

            animal: {},
            animais: [],

            descarte: {},
            descartes: [],

            opcaoMotivo: [
                {value: 'morte', text: 'Morte'},
                {value: 'roubo', text: 'Roubo'},
                {value: 'venda', text: 'Venda'},
                {value: 'desaparecido', text: 'Desaparecido'}
            ],
            fields: [
                { key: 'nomeAnimal', label: 'Nome', sortable: true},
                { key: 'brinco', label: 'Brinco', sortable: true},
                { key: 'dataDescarte', label: 'Data Descarte', sortable: true,
                formatter: value => {
                    return moment(String(value)).format('DD/MM/YYYY')
                }},
                { key: 'motivo', label: 'Motivo', sortable: true},
                { key: 'causa', label: 'Causa', sortable: true},
                { key: 'actions', label: 'Ações' }
            ]
        }      
    },
    async created() {
        try {
        const resDescarte = await axios.get(`${baseApiUrl}/descartes`);
        const resAnimal = await axios.get(`${baseApiUrl}/animais?ativo=true`);

        this.descartes = resDescarte.data;
        this.animais = resAnimal.data;
        
        } catch (e) {
            console.error(e);
        }
    },
    methods: {
        checkFormValidity() {
            const valid = this.$refs.form.checkValidity()
            this.nomeAnimalState = valid
            this.motivoState = valid
            this.dataDescarteState = valid
            return valid
        },
        resetModal() {
            this.nomeAnimal = ''
            this.motivo = ''
            this.causa = ''
            //this.dataDescarte = ''
            this.nomeAnimalState = null
            this.motivoState = null
            this.dataDescarteState = null
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

                const res = await axios.get(`${baseApiUrl}/animais/${id}`);
                this.backupAnimal = res.data;

                const resCadastro = await axios.post(`${baseApiUrl}/descartes`, { 
                    nomeAnimal: this.backupAnimal.nomeAnimal, 
                    brinco: this.backupAnimal.brinco, 
                    motivo: this.motivo, 
                    causa: this.causa, 
                    dataDescarte: this.dataDescarte});

                    this.descartes = [...this.descartes, resCadastro.data];

                await axios.patch(`${baseApiUrl}/animais/${id}`, {ativo: false});

            } catch (e) {
                console.error(e);
            }

            // Esconder o modal manualmente
            this.$nextTick(() => {
                //this.$bvModal.hide('modal-cadastrar-descarte')
                location.reload();
            })
        },
        async editar() {
            if (!this.checkFormValidity()) {
                return
            }

            try {
                const id = this.descarte.id
                const res = await axios.patch(`${baseApiUrl}/descartes/${id}`, { 
                    motivo: this.descarte.motivo, 
                    causa: this.descarte.causa, 
                    dataDescarte: this.descarte.dataDescarte});

                    this.descartes = [...this.descartes, res.data];
            } catch (e) {
                console.error(e);
            }

            // Esconder o modal manualmente
            this.$nextTick(() => {
                //this.$bvModal.hide('modal-editar-descarte')
                location.reload();
            })
        },
        async remove() {
            try {
                const res = await axios.get(`${baseApiUrl}/animais/?nomeAnimal=${this.descarte.nomeAnimal}`);
                this.backupAnimal = res.data[0];

                const id = this.descarte.id
                await axios.delete(`${baseApiUrl}/descartes/${id}`)

                await axios.patch(`${baseApiUrl}/animais/${this.backupAnimal.id}`, {ativo: true})
            } catch (e) {
                console.error(e);
            }

            this.$nextTick(() => {
                //this.$bvModal.hide('modal-excluir-descarte')
                location.reload();
            })
        },
        loadDescarte(descarte) {
            this.descarte = { ...descarte }
        }
    }
}
</script>

<style>

</style>