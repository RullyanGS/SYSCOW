<template>
    <div class="eventoList">
        <ul>
            <b-table hover striped :items="eventos" :fields="fields">          
                <template #cell(actions)="data">
                    <b-button variant="warning" v-b-modal.modal-editar-evento @click="loadEvento(data.item)" class="mr-2">
                        <i class="fa fa-pencil"></i>
                    </b-button>
                    <b-button variant="danger" v-b-modal.modal-excluir-evento @click="loadEvento(data.item)">
                        <i class="fa fa-trash"></i>
                    </b-button>
                </template>
            </b-table>
        </ul>

        <b-button v-b-modal.modal-cadastrar-evento>Cadastrar</b-button>

        <!-- Cadastro Evento -->
        <b-row>
            <b-modal
            id="modal-cadastrar-evento"
            ref="modal"
            title="Cadastro do Evento"
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
                                label="Evento*"
                                invalid-feedback="O evento é obrigatório">

                                <b-form-select
                                    v-model="nomeEvento"
                                    :state="nomeEventoState"
                                    :options="opcaoEvento"
                                    required >
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
                                label="Data da evento*" 
                                invalid-feedback="A data do evento é obrigatorio">
                                <b-form-input
                                    type = "date"
                                    v-model="dataEvento"  
                                    :state="dataEventoState"
                                    required />
                            </b-form-group>
                        </b-col>
                        <b-col>    
                            <b-form-group
                                label="Data do próximo evento*" 
                                invalid-feedback="A data do próximo evento é obrigatorio">
                                <b-form-input
                                    type = "date"
                                    v-model="dataProximoEvento"  
                                    :state="dataProximoEventoState"
                                    required />
                            </b-form-group>
                        </b-col>
                    </b-row>
                </b-container>

                <b-container>
                    <b-row>
                        <b-col>
                            <b-form-group
                                label="Descrição do evento">

                                <b-form-input
                                    v-model="descricaoEvento" />

                            </b-form-group>
                        </b-col>
                    </b-row>
                </b-container>

            </form>
            </b-modal>
        </b-row>

        
        <!-- Editar Evento -->
        <b-row>
            <b-modal
            id="modal-editar-evento"
            ref="modal"
            title="Editar Evento"
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

                                <b-form-select
                                    v-model="evento.nomeAnimal"
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
                                label="Evento*"
                                invalid-feedback="O evento é obrigatório">

                                <b-form-select
                                    v-model="evento.nomeEvento"
                                    :state="nomeEventoState"
                                    :options="opcaoEvento"
                                    required >
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
                                label="Data da evento*" 
                                invalid-feedback="A data do evento é obrigatorio">
                                <b-form-input
                                    type = "date"
                                    v-model="evento.dataEvento"  
                                    :state="dataEventoState"
                                    required />
                            </b-form-group>
                        </b-col>
                        <b-col>    
                            <b-form-group
                                label="Data do próximo evento*" 
                                invalid-feedback="A data do próximo evento é obrigatorio">
                                <b-form-input
                                    type = "date"
                                    v-model="evento.dataProximoEvento"  
                                    :state="dataProximoEventoState"
                                    required />
                            </b-form-group>
                        </b-col>
                    </b-row>
                </b-container>

                <b-container>
                    <b-row>
                        <b-col>
                            <b-form-group
                                label="Descrição do evento">

                                <b-form-input
                                    v-model="evento.descricaoEvento" />

                            </b-form-group>
                        </b-col>
                    </b-row>
                </b-container>

            </form>
            </b-modal>
        </b-row>

        <!-- Excluir Evento -->
        <b-row>
            <b-modal
                id="modal-excluir-evento"
                title="Excluir Evento" 
                size="lg"
                @ok="remove">
                    <br>
                    Deseja realmente excluir o evento do animal <strong>{{evento.nomeAnimal}}</strong> ?
            </b-modal>
        </b-row>
        

    </div>
</template>

<script>
import axios from "axios";
const baseURL = "http://localhost:3001";

export default {
    name: "EventoList",
    data() {
        return {
            nomeAnimal: null,
            nomeAnimalState: null,
            nomeEvento: null,
            nomeEventoState: null,
            dataEvento: null,
            dataEventoState: null,
            dataProximoEvento: null,
            dataProximoEventoState: null,
            descricaoEvento: null,
            opcaoEvento: [
                { value: 'cio', text: 'Cio'},
                { value: 'cobertura', text: 'Cobertura'},
                { value: 'secagem', text: 'Secagem'}
            ],

            animal: {},
            animais: [],

            evento: {},
            eventos: [],

            fields: [
                { key: 'nomeAnimal', label: 'Nome do Animal', sortable: true},
                { key: 'nomeEvento', label: 'Evento', sortable: true},
                { key: 'dataEvento', label: 'Data do Evento', sortable: true},
                { key: 'dataProximoEvento', label: 'Data do Próximo Evento', sortable: true},
                { key: 'descricaoEvento', label: 'Descrição do Evento', sortable: true},
                { key: 'actions', label: 'Ações' }
            ]
        }
    },
    async created() {
        try {
        const resEvento = await axios.get(`${baseURL}/eventos`);
        const resAnimal = await axios.get(`${baseURL}/animais?ativo=true`);

        this.eventos = resEvento.data;
        this.animais = resAnimal.data;

        } catch (e) {
        console.error(e);
        }
    },
    methods: {
        checkFormValidity() {
            const valid = this.$refs.form.checkValidity()
            this.nomeAnimalState = valid
            this.nomeEventoState = valid
            this.dataEventoState = valid
            this.dataProximoEventoState = valid
            return valid
        },
        resetModal() {
            this.nomeAnimal = ''
            this.nomeEvento = ''
            this.dataEvento = ''
            this.dataProximoEvento = ''
            this.descricaoEvento = ''
            this.nomeAnimalState = null
            this.nomeEventoState = null
            this.dataEventoState = null
            this.dataProximoEventoState = null
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
                const res = await axios.post(`${baseURL}/eventos`, { 
                    nomeAnimal: this.nomeAnimal, 
                    nomeEvento: this.nomeEvento,
                    dataEvento: this.dataEvento,
                    dataProximoEvento: this.dataProximoEvento, 
                    descricaoEvento: this.descricaoEvento});

                    this.eventos = [...this.eventos, res.data];

            } catch (e) {
                console.error(e);
            }

            // Esconder o modal manualmente
            this.$nextTick(() => {
                this.$bvModal.hide('modal-cadastrar-evento')
            })
        },
        async editar() {
            if (!this.checkFormValidity()) {
                return
            }
            try {
                const id = this.evento.id
                const res = await axios.put(`${baseURL}/eventos/${id}`, { 
                    nomeAnimal: this.evento.nomeAnimal, 
                    nomeEvento: this.evento.nomeEvento, 
                    dataEvento: this.evento.dataEvento, 
                    dataProximoEvento: this.evento.dataProximoEvento, 
                    dataProximoEventoState: this.evento.dataProximoEventoState, 
                    descricaoEvento: this.evento.descricaoEvento});

                    this.eventos = [...this.eventos, res.data];

            } catch (e) {
                console.error(e);
            }

            // Esconder o modal manualmente
            this.$nextTick(() => {
                //this.$bvModal.hide('modal-cadastrar-evento')
                location.reload();
            })
        },
        async remove() {
            try {
                const id = this.evento.id
                await axios.delete(`${baseURL}/eventos/${id}`)
                    .then(() => {
                        location.reload();
                    });
            } catch (e) {
                console.error(e);
            }

            this.$nextTick(() => {
                this.$bvModal.hide('modal-excluir-evento')
            })
        },
        loadEvento(evento) {
            this.evento = { ...evento }
        }
    }
}
</script>

<style>

</style>