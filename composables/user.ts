import { useLoginStore } from '../stores/login'

export const user: Object = () => {
    return useLoginStore().user
}