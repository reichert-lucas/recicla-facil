<template>
    <v-container class="containter w-100 pb-10">        
        <div class="collectors__header">
            <div class="collectors__header__content">
                <h1>{{ TRASH_TYPE_LABELS[type] }}</h1>
                <p>{{ TRASH_TYPE_DESCRIPTIONS[type] }}</p>
            </div>

            <img class="collectors__header__img" :src="`/imgs/${type}.jpg`"/>
        </div>

        <div class="collectors__list">
            <div v-for="company in companies" class="collectors__list__item">
                <div class="collectors__list__item__title">{{ company.name }}</div>

                <span class="collectors__list__item__rating">✪ {{ company.rating }}</span>
            </div>
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
            companies: []
        }
    },

    methods: {
        loadCompanies() {
            this.loading = true;

            api().get('/Company/GetCollectors', {
                params: {
                    type: this.type
                }
            })
            .then(({ data }) => {
                this.companies = data.data
                console.log(this.companies)
            })
            .finally(() => this.loading = false)
        },
    },

    created() {
        this.loadCompanies()
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
        position: relative;
        height: 300px;

        h1 {
            font-size: 48px;
            color: white;
        }

        p {
            font-size: 18px;
            font-weight: 600;
            color: white;
        }

        &__content {
            background: rgba(0, 0, 0, 0.575);
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 12px;
            flex-direction: column;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            padding: 8px;
            border-radius: 8px;
        }

        &__img {
            width: 100%;
            height: 100%;
            border-radius: 8px;
            object-fit: cover;
        }
    }

    .collectors__list {
        margin-top: 32px;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 12px;
        
        &__item {
            position: relative;
            border-radius: 8px;
            width: 400px;
            height: 280px;
            background: #2d2d2d;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            text-transform: capitalize;
            font-weight: bold;
            font-size: 24px;
            padding: 8px;
            word-break: break-all;

            @media (max-width: 600px) {
                width: 100%;
            }

            &__rating {
                position: absolute;
                bottom: 16px;
                right: 16px;
                font-size: 18px;
                color: #81b622;
            }
        }
 
    }
</style>