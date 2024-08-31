<template>
    <div>
        <main>
            <h1>Baixe o nosso aplicativo, e comece a mudar mundo!</h1>
            <h2>Basta ler o QR Code, ou clicar no celular</h2>

            <img src="/imgs/aplicativo.jpg"/>
        </main>
    </div>
</template>

<script>
import { TRASH_TYPE, TRASH_TYPE_LABELS, TRASH_TYPE_DESCRIPTIONS } from '@/constants/trash-type.js';

definePageMeta({
    layout: 'blank'
})
</script>

<style lang="scss" scoped>
    main {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    h1 {
        text-align: center;
        margin-bottom: 0;
        padding: 0 8px;
    }

    h2 {
        text-align: center;
        margin-bottom: 24px;
        color: gray;
        padding: 0 8px;
    }

    img {
        width: 600px;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 32px;

        @media (max-width: 800px) {
            width: 100%;
        }
    }
</style>