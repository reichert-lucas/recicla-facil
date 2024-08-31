<template>
    <v-app :theme="dark ? 'dark' : 'light'" class="px-2">        
        <slot />
    </v-app>
</template>

<script>
import ChangeTheme from '@/mixins/ChangeTheme.vue'

export default {
    mixins: [ ChangeTheme ]
}
</script>