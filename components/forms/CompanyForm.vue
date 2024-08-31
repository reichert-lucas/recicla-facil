<template>
    <v-card elevation="5" shaped>
        <v-form @submit.prevent="save()" ref="form">
            <v-container>
                <v-card-title class="mb-6">Você está muito perto de ser um {{ type === 1 ? 'fornecedor' : 'coletor' }} parceiro</v-card-title>
    
                <v-card-text>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field
                                label="Nome"
                                v-model="name.value.value"
                                :error-messages="name.errorMessage.value"
                            />
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                                label="E-mail"
                                v-model="email.value.value"
                                :error-messages="email.errorMessage.value"
                            />
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                                label="Senha"
                                type="password"
                                v-model="password.value.value"
                                :error-messages="password.errorMessage.value"
                            />
                        </v-col>

                        <v-col v-if="type == 2" cols="12">
                            <v-select
                                label="Selecione um tipo de resíduo"
                                item-title="label"
                                item-value="value"
                                :items="trashTypes"
                                v-model="category"
                            />
                        </v-col>
                    </v-row>
                </v-card-text>
            
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        class="text-none font-weight-black"
                        color="green"
                        variant="tonal"
                        size="large"
                        type="submit"
                        block
                    >
                        Salvar
                    </v-btn>
                </v-card-actions>
            </v-container>
        </v-form>
    </v-card>
</template>

<script setup>
import { useField, useForm } from 'vee-validate'
import { ref } from 'vue';
import { TRASH_TYPE, TRASH_TYPE_LABELS } from '@/constants/trash-type'

const props = defineProps({
    type: {
        type: Number,
        default: 1
    },
})

const type = ref(props.type);
const trashTypes = ref([
    {
        value: TRASH_TYPE.RECYCLABLE,
        label: TRASH_TYPE_LABELS[TRASH_TYPE.RECYCLABLE],
    },
    {
        value: TRASH_TYPE.ORGANIC,
        label: TRASH_TYPE_LABELS[TRASH_TYPE.ORGANIC],
    },
    {
        value: TRASH_TYPE.ELECTRONIC,
        label: TRASH_TYPE_LABELS[TRASH_TYPE.ELECTRONIC],
    },
    {
        value: TRASH_TYPE.CHEMICAL,
        label: TRASH_TYPE_LABELS[TRASH_TYPE.CHEMICAL],
    },
    {
        value: TRASH_TYPE.CONSTRUCTION,
        label: TRASH_TYPE_LABELS[TRASH_TYPE.CONSTRUCTION],
    },
    {
        value: TRASH_TYPE.HOSPITAL,
        label: TRASH_TYPE_LABELS[TRASH_TYPE.HOSPITAL],
    },
]);

const { handleSubmit, handleReset } = useForm({
    validationSchema: {
        name (value) {
            if (!value) return 'O campo nome é obrigatório';

            return true
        },

        email (value) {
            if (!value) return 'O campo e-mail é obrigatório';
            if (!(/^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value))) return 'O campo e-mail é obrigatório';

            return true
        },

        password (value) {
            if (!props.user && !value) return 'O campo senha é obrigatório';
            if ((!props.user && value.length < 8) || (value && value.length < 8)) return 'O campo senha deve ter no mínimo 8 caracteres';

            return true;
        },
    },
})

const name = useField('name')
const email = useField('email')
const password = useField('password')
const category = ref(1)

const save = handleSubmit(values => {
    const payload = {
        ...{
            category: type.value === 2 ? Number(category.value) : null,
            type: Number(type.value),
        },
        ...values
    };

    api().post('company', payload)
        .then(() => {
            toast().success('Conta criada com sucesso!')
            handleReset()
        })
        .catch(error => {
            toast().error(getMessageError(error))
        })
})
</script>