<template>
    <v-container class="containter w-100 h-100 py-10">        
        <forms-company-form :type="type" />
    </v-container>
</template>

<script>
definePageMeta({
    layout: 'blank'
});

export default {
    computed: {
        type() {
            return useRoute().params.type;
        }
    }
}
</script>