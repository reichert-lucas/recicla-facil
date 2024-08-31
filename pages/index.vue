<template>
    <div>
        <main>
            <section>
                <h2>Sobre o Recicla Fácil</h2>
                <p><b>Recicla Fácil</b> é a plataforma que facilita a conexão entre coletores e fornecedores de resíduos. Se você é um coletor em busca de materiais recicláveis, orgânicos, eletrônicos, ou outros tipos de resíduos, ou um fornecedor com resíduos que precisam de um destino adequado, o Recicla Fácil é o lugar certo para você!</p>
            </section>

            <section>
                <h2>Categorias de Resíduos</h2>
                <div class="category__list">
                    <div v-for="type in TRASH_TYPE" @click="goCollectors(type)" class="category__list__item">
                        <div class="category__list__item__content">
                            <h3>{{ TRASH_TYPE_LABELS[type] }}</h3>
                            <p>{{ TRASH_TYPE_DESCRIPTIONS[type] }}</p>
                        </div>

                        <img class="category__list__item__img" :src="`/imgs/${type}.jpg`"/>
                    </div>
                </div>
            </section>

            <section>
                <h2>Como Funciona</h2>
                <h3>O processo é simples e eficiente:</h3>
                
                <p>O fornecedor cadastra uma proposta detalhando os resíduos disponíveis. As empresas especializadas em coleta podem, então, enviar seus orçamentos, oferecendo diferentes condições de serviço. O fornecedor pode comparar as ofertas recebidas e escolher a que melhor atende às suas necessidades, garantindo um processo seguro e transparente para ambas as partes.O fornecedor cadastra uma proposta detalhando os resíduos disponíveis. As empresas especializadas em coleta podem, então, enviar seus orçamentos, oferecendo diferentes condições de serviço. O fornecedor pode comparar as ofertas recebidas e escolher a que melhor atende às suas necessidades, garantindo um processo seguro e transparente para ambas as partes.</p>
            </section>

            <section>
                <h2>Cadastre-se Agora</h2>
                <p><b>Junte-se ao Recicla Fácil</b> e faça parte da solução para um mundo mais sustentável.</p>

                <div class="buttons">
                    <button @click="goRegister(1)">Seja um Fornecedor, e descarte seus resíduos da forma correta</button>
                    <button @click="goRegister(2)">Seja um Coletor e ajude a criar um mundo mais limpo</button>
                </div>
            </section>
        </main>
    </div>
</template>

<script>
import { TRASH_TYPE, TRASH_TYPE_LABELS, TRASH_TYPE_DESCRIPTIONS } from '@/constants/trash-type.js';

definePageMeta({
    layout: 'blank'
})

export default {
    data() {
        return {
            TRASH_TYPE,
            TRASH_TYPE_LABELS,
            TRASH_TYPE_DESCRIPTIONS,
        }
    },

    methods: {
        goRegister(type) {
            const router = useRouter();

            router.push(`/registrar/${type}`);
        },

        goCollectors(type) {
            const router = useRouter();

            router.push(`/coletores/${type}`);
        }
    },
}
</script>

<style lang="scss" scoped>
    main {
        padding: 24px 48px;
        display: flex;
        flex-direction: column;
        gap: 24px;
        color: #2d2d2d;

        h2 {
            font-size: 32px;
            margin-bottom: 12px;
        }

        p {
            font-size: 18px;
            text-align: justify;
        }
    }

    .category__list {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        overflow-x: auto;
        gap: 12px;
        flex-wrap: wrap;
        
        &__item {
            text-align: left;
            min-width: 500px;
            height: 350px;
            gap: 12px;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.5s;
            position: relative;

            @media (max-width: 3000px) {
                width: 33%;
            }

            @media (max-width: 2900px) {
                width: 32%;
            }

            @media (max-width: 1700px) {
                width: 48%;
            }

            @media (max-width: 1200px) {
                width: 100%;
            }

            @media (max-width: 700px) {
                width: 100%;
                min-width: 100%;
                text-align: center;
            }

            &:hover {
                background: #5c8314;
            }
            
            h3 {
                color: white;
                font-size: 32px;
            }

            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            background: #81b622;

            p {
                text-align: center;
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
    }

    .buttons {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-top: 12px;

        button {
            background: #E66E21;
            color: white;
            border-radius: 8px;
            padding: 8px;
            font-weight: 600;
        }
    }

</style>