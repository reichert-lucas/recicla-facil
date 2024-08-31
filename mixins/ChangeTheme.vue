<script>
import { useThemeStore } from '@/stores/theme'

export default {
    data() {
        return {
            store: useThemeStore()
        }
    },

    methods: {
        switchTheme() {
            this.store.changeTheme(!this.store.isDarkTheme)
        }
    },

    computed: {
        dark() {
            return this.store.isDarkTheme;
        }
    },

    mounted() {
        this.store.changeTheme(localStorage.getItem('dark') === 'true')
    },
}
</script>
