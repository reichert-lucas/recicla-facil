<template>
  <v-app theme="light">
    <v-layout>
      <v-main>
        <header>
            <v-icon 
              style="font-size:120px;"
              icon="mdi-recycle"
            />

            <h1>Recicla Fácil</h1>
            <p>Conectando Coletores e Fornecedores de Resíduos</p>
        </header>

        <slot />
      </v-main>
    </v-layout>
  </v-app>
</template>

<script>
import ChangeTheme from '@/mixins/ChangeTheme.vue'

export default {
  mixins: [ChangeTheme],
} 
</script>

<style lang="scss" scoped>
    header {
        background: #81b622;
        color: #2d2d2d;
        padding: 80px 48px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        color: white;
        margin-bottom: 24px;

        h1 {
            font-size: 56px;
        }

        p {
            font-size: 24px;
        }
    }
</style>