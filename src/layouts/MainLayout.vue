<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> Estoque </q-toolbar-title>
        <q-btn-dropdown flat color="white" icon="person">
          <q-list>
            <q-item clickable v-close-popup @click="handleLogout">
              <q-item-section>
                <q-item-label>Logout</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Menu </q-item-label>

        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import useAuthUser from 'src/composables/useAuthUser'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import useApi from 'src/composables/useApi'

const linksList = [
  {
    title: 'Home',
    caption: '',
    icon: 'mdi-home',
    routeName: 'me',
  },
  {
    title: 'Category',
    caption: '',
    icon: 'mdi-shape-outline',
    routeName: 'category',
  },
  {
    title: 'Product',
    caption: '',
    icon: 'mdi-archive',
    routeName: 'product',
  },
  {
    title: 'Config',
    caption: '',
    icon: 'mdi-cog',
    routeName: 'form-config',
  },
]

const leftDrawerOpen = ref(false)

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink,
  },

  setup() {
    const router = useRouter()
    const $q = useQuasar()
    const { getBrand } = useApi()

    const { logout } = useAuthUser()

    onMounted(() => {
      getBrand()
    })

    const handleLogout = async () => {
      $q.dialog({
        title: 'Logout',
        message: 'Do you really want to leave?',
        cancel: true,
        persistent: true,
      }).onOk(async () => {
        await logout()
        router.replace({ name: 'login' })
      })

      await logout()
    }

    return {
      linksList,
      leftDrawerOpen,
      toggleLeftDrawer,
      handleLogout,
    }
  },
})
</script>
