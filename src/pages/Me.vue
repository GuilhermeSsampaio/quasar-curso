<template>
  <q-page class="flex flex-center">
    <div v-if="user">
      <p>Hello {{ user.user_metadata.name }}</p>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import useAuthUser from 'src/composables/useAuthUser'

export default defineComponent({
  name: 'PageMe',

  setup() {
    const { user } = useAuthUser()
    console.log(user)
    return { user }
  },
})
</script>
