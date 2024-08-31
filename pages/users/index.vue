<template>
    <v-container class="containter w-100 h-100 pt-10">        
        <div class="d-flex align-center justify-space-between mb-4">
            <h2>Usuários</h2>

            <v-btn
                class="text-white"
                color="orange"
                rounded
                large
                @click="openForm()"
            >
                <v-icon class="mr-2">
                    mdi-account-plus
                </v-icon>
                Adicionar novo
            </v-btn>
        </div>

        <div class="d-flex align-center justify-space-between mb-4">
            <v-text-field
                variant="underlined"
                :color="dark ? 'yellow' : 'orange'"
                label="Buscar usuário..."
                append-icon="mdi-magnify"
                @keydown.enter="search(true)"
                v-model="query"
            >
                <template v-slot:loader>
                    <v-progress-linear
                        :color="dark ? 'yellow' : 'dark'"
                        height="7"
                        indeterminate
                        :active="loading"
                    />
                </template> 
            </v-text-field>
        </div>

        <div v-if="users.length">
            <v-table fixed-header class="w-full" hover>
                <thead>
                <tr>
                    <th class="text-left font-weight-black">Nome</th>
                    <th class="text-left font-weight-black">E-mail</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr
                    v-for="user in users"
                    :key="user.id"
                >
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td class="d-flex justify-end align-center">
                        <v-btn
                            @click="selectUser(user)"
                            class="mr-2"
                            icon="mdi-pencil"
                            size="x-small"
                            color="blue"
                        />
                        <v-btn
                            @click="remove(user.id)"
                            icon="mdi-trash-can"
                            size="x-small"
                            color="red"
                        />
                    </td>
                </tr>
                </tbody>
            </v-table>
    
            <v-pagination
                class="mt-4"
                :color="dark ? 'yellow' : 'orange'"
                :length="this.last_page"
                v-model="page"
            />
        </div>

        <div v-else class="d-flex justify-center align-center flex-column mt-14">
            <v-icon style="font-size:64px;" class="mb-4">mdi-cylinder-off</v-icon>
            <span class="mb-4">Ops! Nenhum usuário encontrado.</span>
            <v-btn
                class="text-white"
                color="orange"
                rounded
                large
                @click="openForm()"
            >
                <v-icon class="mr-2">
                    mdi-account-plus
                </v-icon>
                Adicionar novo
            </v-btn>
        </div>

        <modals-user-modal
            :show="showForm"
            :user="selectedUser"
            @close="closeForm"
            @refreshUsers="search(true)"
        />
    </v-container>
</template>

<script>
import ChangeTheme from '@/mixins/ChangeTheme.vue'

export default {
    mixins: [ ChangeTheme ],

    data () {
        return {
            loading: false,
            users: [],
            page: 1,
            query: null,
            selectedUser: null,
            showForm: false
        }
    },

    created () {            
        this.search()
    },

    methods: {
        search(resetPagination = false){
            this.loading = true

            if (resetPagination) this.page = 1 

            api().get('users', {
                params: { 
                    page: this.page,
                    search: this.query
                }
            })
                .then(res => {
                    this.users = res.data.data
                    this.page = res.data.meta.current_page
                    this.last_page = res.data.meta.last_page
                    this.total_items = res.data.meta.total
                })
                .catch(() => {
                    toast().error('Erro ao buscar usuários')
                })
                .finally(() => this.loading = false)
        },

        remove(user){
            api().delete(`users/${user}`)
                .then(() => {
                    this.search()
                    toast().success('Usuário removido com sucesso')
                }).catch(() => {
                    toast().error('Erro ao remover usuário')
                })
        },

        openForm(user = null)
        {
            this.selectedUser = user
            this.showForm = true
        },

        closeForm()
        {
            this.selectedUser = null
            this.showForm = false
        },

        selectUser(user) {
            this.selectedUser = user
            this.showForm = true
        }
    },

    watch: {
        page() {
            this.search()
        }
    }
}
</script>