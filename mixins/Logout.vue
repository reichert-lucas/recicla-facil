<script>
import { useLoginStore } from '@/stores/login';

export default {
    methods: {
        logout() {
            const loginStore = useLoginStore()

            loginStore.logout()
                .then(() => {
                    const router = useRouter()

                    toast().success('Logout efetuado com sucesso')
                    router.push('/login')
                })
                .catch(() => toast().error('Ocorreu um erro ao efetuar o logout'))
        },
    }
}
</script>
