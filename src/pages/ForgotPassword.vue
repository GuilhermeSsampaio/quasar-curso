<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handlePasswordReset">
      <p class="col-12 text-h5 text-center">Reset Password</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          label="Email"
          v-model="email"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Email is required']"
          type="email"
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
        <q-btn
          label="Back"
          color="dark"
          class="full-width"
          outline
          rounded
          flat
          :to="{ name: 'login' }"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import useAuthUser from 'src/composables/useAuthUser'
import useNotify from 'src/composables/UseNotify'

export default defineComponent({
  name: 'ForgotPassword',

  setup() {
    const { sendPasswordRestEmail } = useAuthUser()
    const email = ref('')
    const { notifyError, notifySucces } = useNotify()

    const handlePasswordReset = async () => {
      try {
        await sendPasswordRestEmail(email.value)
        notifySucces('Password reset email sent to: ', email.value)
      } catch (error) {
        notifyError(error.message)
      }
    }

    return {
      email,
      handlePasswordReset,
    }
  },
})
</script>
