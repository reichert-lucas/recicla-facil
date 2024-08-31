<template>
  <v-app :theme="dark ? 'dark' : 'light'">
    <v-layout class="rounded rounded-md">
      <v-app-bar>
        <v-app-bar-nav-icon 
          :color="dark ? 'orange' : 'dark'"
          @click.stop="showMenu = !showMenu"
        />

        <v-toolbar-title>
          <div class="d-flex align-center font-weight-bold" :class="{ 'text-yellow': dark }">
            <v-icon 
              class="mr-2"
              style="font-size:32px;"
              icon="mdi-recycle"
            /> Recicla Fácil
          </div>
        </v-toolbar-title>

        <v-btn class="px-1" min-width="0px" icon :color="dark ? 'orange' : 'dark'" @click="switchTheme()">
          <v-icon>mdi-theme-light-dark</v-icon>
        </v-btn>

        <v-btn class="px-1" min-width="0px" icon :color="dark ? 'orange' : 'dark'" @click="logout()">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </v-app-bar>

      <v-navigation-drawer v-model="showMenu">
        <v-list>
          <div
            v-for="(item, i) in menuItems"
            :key="i"
          >
            <v-list-item
              v-if="!item.submenus"
              :value="item.route"
              :active="item.route == useRoute().name || item.path == useRoute().path"
              @click="item.route ? changeRoute(item.route) : changeRoute(null, item.path)"
              color="orange"
              rounded="shaped"
            >
              <template v-slot:prepend>
                <v-avatar color="orange">
                  <v-icon color="white">{{item.icon}}</v-icon>
                </v-avatar>
              </template>
      
              <v-list-item-title class="font-weight-medium" v-text="item.name"></v-list-item-title>
            </v-list-item>

            <v-list-group v-else>
              <template v-slot:activator="{ props }">
                <v-list-item
                  v-bind="props"
                  color="orange"
                  rounded="shaped"
                >
                  <template v-slot:prepend>
                    <v-avatar color="orange">
                      <v-icon color="white">{{item.icon}}</v-icon>
                    </v-avatar>
                  </template>
          
                  <v-list-item-title class="font-weight-medium" v-text="item.name"></v-list-item-title>
                </v-list-item>
              </template>
    
              <v-list-item
                v-for="(submenu, j) in item.submenus"
                :key="`submenu-${j}`"
                :value="submenu.route"
                :active="submenu.route == useRoute().name || submenu.path == useRoute().path"
                @click="submenu.route ? changeRoute(submenu.route) : changeRoute(null, submenu.path)"
                color="orange"
                rounded="shaped"
              >
                <v-list-item-title class="font-weight-medium" v-text="submenu.name"></v-list-item-title>
              </v-list-item>
            </v-list-group>
          </div>

        </v-list>

        <template v-slot:append>
          Bem-vindo
        </template>
      </v-navigation-drawer>

      <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
        <slot />
      </v-main>
    </v-layout>
  </v-app>
</template>

<script>
import ChangeTheme from '@/mixins/ChangeTheme.vue'
import { useLoginStore } from '@/stores/login';
import Logout from '@/mixins/Logout.vue'

export default {
  middleware: ['auth'],
  
  mixins: [ChangeTheme, Logout],

  data() {
    return {
      loading: false,
      showMenu: true,
      user: user(),
    }
  },

  methods: {
    changeRoute(name = null, path = null) {
      const router = useRouter()

      if (name) {
        router.push({ name })
        
        return;
      }

      if (path) {
        router.push({ path })
        
        return;
      }
    },
  },

  created() {
    const loginStore = useLoginStore();
    loginStore.refreshProfile();
  },

  computed: {
    menuItems() {
      return [
        {
          name: 'Usuários',
          icon: 'mdi-account-multiple',
          route: 'users',
        },
      ]
    }
  },
} 
</script>