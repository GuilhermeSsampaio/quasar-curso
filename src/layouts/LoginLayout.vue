<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> Quasar estoque </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import useApi from 'src/composables/useApi'
import { defineComponent, onMounted } from 'vue'

export default defineComponent({
  name: 'LoginLayout',

  setup() {
    const { getBrand } = useApi()

    onMounted(() => {
      getBrand()
    })
    return {}
  },
})
</script>
