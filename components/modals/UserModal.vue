<template>
    <v-dialog
        :model-value="show"
        @input="$emit('update:modelValue', $event.target.value)"
        persistent
        width="800"
    >
        <v-card elevation="5" shaped>
            <v-form @submit.prevent="save()" ref="form">
                <v-container>
                    <v-card-title class="mb-6">{{ user ? 'Editar usuário' : 'Cadastrar usuário' }}</v-card-title>
        
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
                            <v-col cols="12">
                                <v-switch
                                    label="Administrador"
                                    color="orange"
                                    inset
                                    v-model="is_admin.value.value"
                                />
                            </v-col>
                        </v-row>
                    </v-card-text>
                
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            class="text-none font-weight-black"
                            variant="flat"
                            @click="() => {
                                close()
                                $emit('close')
                            }"
                        >
                            cancelar
                        </v-btn>
                        <v-btn
                            class="text-none font-weight-black"
                            color="orange"
                            variant="tonal"
                            size="large"
                            type="submit"
                        >
                            Salvar
                        </v-btn>
                    </v-card-actions>
                </v-container>
            </v-form>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { useField, useForm } from 'vee-validate'
import { ref, watch } from 'vue';

const props = defineProps({
    user: {
        type: Object,
        default: null
    },
    show: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['close', 'refreshUsers'])

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
const is_admin = useField('is_admin')

const save = handleSubmit(values => {
    if (props.user) {
        api().put(`users/${props.user.id}`, values)
            .then(() => {
                emit('close');
                emit('refreshUsers');
                toast().success('Usuário atualizado com sucesso!')
                handleReset()
            })
            .catch(error => {
                toast().error(getMessageError(error))
            })

        return;
    }

    api().post('users', values)
        .then(() => {
            emit('close');
            emit('refreshUsers');
            toast().success('Usuário salvo com sucesso!')
            handleReset()
        })
        .catch(error => {
            toast().error(getMessageError(error))
        })
})

function close() {
    handleReset()
}

watch(() => props.user, (newValue) => {
    if (newValue) {
        name.value.value = newValue?.name
        email.value.value = newValue?.email
        is_admin.value.value = newValue?.is_admin
    }
});
</script>