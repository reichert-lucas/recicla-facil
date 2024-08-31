import { defineStore } from 'pinia'

export const useLoginStore = defineStore('login', {
  state: () => ({
    user: {},
    token: null
  }),

  actions: {
    login(payload) {
      return api().post("Authentication/GenerateToken", payload)
        .then(res => {
          const user = res.data.user
          const token = res.data.token

          localStorage.setItem('user-token', token)
          localStorage.setItem('user', JSON.stringify(user))

          this.user = user
          this.token = token

          return res
        })
        .catch(() => {
          return Promise.reject(new Error("Não foi possível validar suas credenciais. Verifique os dados informados e tente novamente"))
        })
    },

    checkToken() {
      const token = localStorage.getItem('user-token')
      const user = localStorage.getItem('user')

      if (!token || !user) return false;

      this.token = token
      this.user = JSON.parse(user)

      return true;
    },

    logout() {
      return api().post("auth/logout")
        .then(() => {
          localStorage.setItem('user-token', '')
          localStorage.setItem('user', '')

          this.user = {},
          this.token = null
        })
        .catch(() => {
          return Promise.reject(new Error("Erro ao sair"))
        })
    },

    reset() {
      localStorage.setItem('user-token', '')
      localStorage.setItem('user', '')

      this.user = {}
      this.token = null
    },

    refreshProfile() {
      api().get("me")
        .then(res => {
          localStorage.setItem('user', JSON.stringify(res.data))

          this.user = res.data
        })
        .catch(() => {
          toast().error('Não foi possível carregar suas informações');
        })
    },
  },

  getters: {
    hasToken() {
      return !!this.token
    },
  }
})
