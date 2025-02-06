<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleForgotPasswordReset">
      <p class="col-12 text-h5 text-center">Reset Password</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          label="New Password"
          v-model="password"
          lazy-rules
          :rules="[(val) => (val && val.length >= 6) || 'Password is required and 6 characters']"
        />
      </div>
      <div class="full-width q-pt-md q-gutter-y-sm">
        <q-btn
          label="Send reset Email"
          color="primary"
          class="full-width"
          outline
          rounded
          type="submit"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import useAuthUser from 'src/composables/useAuthUser'
import { useRouter, useRoute } from 'vue-router'
import useNotify from 'src/composables/UseNotify'

export default defineComponent({
  name: 'PageResetPassword',

  setup() {
    const { resetPassword } = useAuthUser()
    const route = useRoute()
    const router = useRouter()
    const token = route.query.token
    const password = ref('')
    const { notifyError, notifySucces } = useNotify()

    const handleForgotPasswordReset = async () => {
      try {
        await resetPassword(token, password.value)
        notifySucces('New passowrd sent')
        router.push({ name: 'login' })
      } catch (error) {
        notifyError(error.message)
      }
    }
    return {
      password,
      handleForgotPasswordReset,
    }
  },
})
</script>
