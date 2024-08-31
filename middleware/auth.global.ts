import { useLoginStore } from '../stores/login'

export default defineNuxtRouteMiddleware((to, from) => {
    console.log('route', to.name)
    
    if (typeof localStorage === 'undefined') return;

    const store = useLoginStore();
    store.checkToken();

    if (to.name === 'index') return;

    if (to.name !== 'login' && !store.hasToken) {
        toast().error('Não autorizado!', { id: 'login-toast' })

        return navigateTo('/login');
    }


    if (to.name === 'login' && store.hasToken) {
        return navigateTo('/');
    }
})