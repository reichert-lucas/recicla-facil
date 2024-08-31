<template>
    <v-container class="containter w-100 h-100 pt-10">        
        <div class="collectors__header">
            <h1>{{ TRASH_TYPE_LABELS[type] }}</h1>
            <p>{{ TRASH_TYPE_DESCRIPTIONS[type] }}</p>
        </div>
    </v-container>
</template>

<script>
import { TRASH_TYPE, TRASH_TYPE_LABELS, TRASH_TYPE_DESCRIPTIONS } from '@/constants/trash-type.js';

definePageMeta({
    layout: 'blank'
});

export default {
    data () {
        return {
            loading: false,
            TRASH_TYPE,
            TRASH_TYPE_LABELS,
            TRASH_TYPE_DESCRIPTIONS,
        }
    },

    computed: {
        type() {
            return useRoute().params.type;
        }
    }
}
</script>

<style lang="scss" scoped>
    .collectors__header {
        text-align: center;

        h1 {
            font-size: 48px;
        }

        p {
            font-size: 18px;
            font-weight: 600;
        }
    }
</style>