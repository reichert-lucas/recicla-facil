<template>
    <div class="d-flex justify-center align-center h-screen w-screen">
        <v-card class="pa-12 pb-8" elevation="8" width="600" rounded="lg">
            <form @submit.prevent="login">
                <div class="d-flex justify-center my-2 mb-6">
                    <v-icon @click="switchTheme" :class="{ 'text-yellow': dark }" style="font-size:64px;"
                        icon="mdi-recycle" />
                </div>
    
                <div class="text-subtitle-1 text-medium-emphasis font-weight-bold">E-mail</div>
                <v-text-field placeholder="exemplo@gmail.com" prepend-inner-icon="mdi-email-outline" variant="outlined"
                    v-model="credentials.email" />
    
                <div class="text-subtitle-1 text-medium-emphasis font-weight-bold">Senha</div>
                <v-text-field :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" :type="visible ? 'text' : 'password'"
                    placeholder="•••••••••••••••••••" prepend-inner-icon="mdi-lock-outline" variant="outlined"
                    @click:append-inner="visible = !visible" v-model="credentials.password" />
    
                <v-btn type="submit" block class="mb-8
                    font-weight-bold" :color="dark ? 'yellow' : 'dark'" size="large" variant="tonal" :disabled="loading" :loading="loading">
                    Entrar
                </v-btn>
            </form>
        </v-card>
    </div>
</template>

<script>
import { useLoginStore } from '../stores/login'
import ChangeTheme from '@/mixins/ChangeTheme.vue'

definePageMeta({
    layout: 'auth'
})

export default defineComponent({
    mixins: [ChangeTheme],

    data() {
        return {
            loading: false,
            visible: false,
            credentials: {
                email: null,
                password: null
            },
        }
    },

    methods: {
        login() {
            this.loading = true;
            const loginStore = useLoginStore()

            loginStore.login(this.credentials)
                .then(() => {
                    const router = useRouter()

                    toast().success('Login efetuado com sucesso', { id: 'login-toast' })
                    router.push('/')
                })
                .catch(() => {
                    toast().error('Ocorreu um erro ao efetuar o login', { id: 'login-toast' })
                })
                .finally(() => this.loading = false)
        },
    },
})
</script>
