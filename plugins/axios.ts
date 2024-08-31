import axios from "axios";
import { useLoginStore } from '../stores/login'

export default defineNuxtPlugin(() => {
  let api = axios.create({
    baseURL: useRuntimeConfig().public.API_BASE_URL,
    headers: {
      common: {},
    },
  });

  api.interceptors.request.use(function (config) {
    const token = localStorage.getItem('user-token');
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
    return config;
  });

  api.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      if (error.response.status !== 401) {
        return Promise.reject(error);
      }
  
      const loginStore = useLoginStore();
      loginStore.reset()

      toast().error('Não autorizado', { id: 'login-toast' })
      
      const router = useRouter()
      router.push('/login')
    }
  );

  return {
    provide: {
      api: api,
    },
  };
});