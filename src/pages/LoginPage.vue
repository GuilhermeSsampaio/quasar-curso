<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleLogin">
      <p class="col-12 text-h5 text-center">Login</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          label="Email"
          v-model="form.email"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Email is required']"
          type="email"
        />

        <q-input
          label="Password"
          v-model="form.password"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Password is required']"
        />
      </div>
      <div class="full-width q-pt-md">
        <q-btn label="Login" color="primary" class="full-width" outline rounded type="submit" />
      </div>
      <div class="full-width">
        <q-btn label="Register" color="primary" class="full-width" flat to="/register" />
        <q-btn
          label="Forgot Password?"
          color="primary"
          class="full-width"
          flat
          to="/forgot-password"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import useAuthUser from 'src/composables/useAuthUser'
import useNotify from 'src/composables/UseNotify'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'PageLogin',

  setup() {
    const router = useRouter()

    const { login, isLoggedIn } = useAuthUser()

    const { notifyError, notifySucces } = useNotify()

    const form = ref({
      email: '',
      password: '',
    })

    onMounted(() => {
      if (isLoggedIn) {
        router.push({ name: 'me' })
      }
    })

    const handleLogin = async () => {
      try {
        await login(form.value)
        notifySucces()
        router.push({ name: 'me' })
      } catch (error) {
        notifyError(error.message)
      }
    }

    return { form, handleLogin }
  },
})
</script>
