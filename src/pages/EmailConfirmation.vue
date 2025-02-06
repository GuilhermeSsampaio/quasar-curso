<template>
  <q-page padding>
    <p class="text-body1">Thanks for registering</p>
    <p class="text-body1">
      Please confirm your email to finishing registering: <strong>{{ $route.query.email }}</strong>
    </p>
    <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
      <q-btn
        label="Back to login"
        color="blue"
        class="full-width"
        outline
        rounded
        :to="{ name: 'login' }"
      />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PageEmailConfirmation',
})
</script>
