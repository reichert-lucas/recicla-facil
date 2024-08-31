import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    dark: false,
  }),

  actions: {
    changeTheme(dark)
    {
      this.dark = dark
      localStorage.setItem('dark', this.dark)
    },
  },

  getters: {
    isDarkTheme() {
      return this.dark
    }
  }
})
