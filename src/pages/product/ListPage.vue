<template>
  <q-page padding>
    <div class="row">
      <q-table :rows="products" :columns="columns" row-key="id" :loading="loading">
        <template v-slot:top>
          <div class="row items-center justify-between" style="width: 100%">
            <span class="text-h6"> Product </span>
            <q-btn
              label="My store"
              dense
              size="sm"
              outline
              class="q-ml-sm"
              icon="mdi-store"
              color="primary"
              @click="handleGoToStore"
            />
            <q-btn
              label="Copy Link"
              dense
              size="sm"
              outline
              class="q-ml-sm"
              icon="mdi-content-copy"
              color="primary"
              @click="handleCopyPublicUrl"
            />
            <q-space />
            <q-btn
              v-if="$q.platform.is.desktop"
              label="Add new"
              color="primary"
              icon="mdi-plus"
              dense
              style="width: auto"
              :to="{ name: 'form-product' }"
            />
          </div>
        </template>
        <template v-slot:body-cell-img_url="props">
          <q-td :props="props" class="q-gutter-x-sm">
            <q-avatar v-if="props.row.img_url">
              <img :src="props.row.img_url" alt="" />
            </q-avatar>
            <q-avatar v-else color="gray" text-color="gray" icon="mdi-image-off" />
          </q-td>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="q-gutter-x-sm">
            <q-btn
              icon="mdi-pencil-outline"
              color="info"
              dense
              size="sm"
              @click="handleEdit(props.row)"
            >
              <q-tooltip> Edit </q-tooltip>
            </q-btn>
            <q-btn
              icon="mdi-delete-outline"
              color="negative"
              dense
              size="sm"
              @click="handleRemoveProduct(props.row)"
            >
              <q-tooltip> Delete </q-tooltip>
            </q-btn>

            <div class="my-table-details">
              {{ props.row.details }}
            </div>
          </q-td>
        </template>
      </q-table>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        v-if="$q.platform.is.mobile"
        fab
        icon="mdi-plus"
        color="primary"
        :to="{ name: 'form-product' }"
      />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { copyToClipboard, openURL, useQuasar } from 'quasar'
import useApi from 'src/composables/useApi'
import useNotify from 'src/composables/UseNotify'
import { defineComponent, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { columnsProduct } from './table'
import useAuthUser from 'src/composables/useAuthUser'

export default defineComponent({
  name: 'PageProductList',
  setup() {
    const products = ref([])
    const loading = ref(true)
    const router = useRouter()
    const table = 'product'
    const { listPublic, remove } = useApi()
    const { user } = useAuthUser()
    const { notifyError, notifySucces } = useNotify()
    const $q = useQuasar()

    const handleListProducts = async () => {
      try {
        loading.value = true
        products.value = await listPublic(table, user.value.id)
        loading.value = false
      } catch (error) {
        notifyError(error.message)
      }
    }

    const handleEdit = (product) => {
      router.push({ name: 'form-product', params: { id: product.id } })
    }

    const handleRemoveProduct = async (product) => {
      try {
        $q.dialog({
          title: 'Confirm',
          message: `Do you really want to delete ${product.name} ?`,
          cancel: true,
          persistent: true,
        }).onOk(async () => {
          await remove(table, product.id)
          notifySucces('Removed')
          handleListProducts()
        })
      } catch (error) {
        notifyError(error.message)
      }
    }

    const handleGoToStore = () => {
      const idUser = user.value.id
      const link = router.resolve({ name: 'product-public', params: { id: idUser } })
      openURL(window.origin + link.href)
    }

    const handleCopyPublicUrl = () => {
      const idUser = user.value.id
      const link = router.resolve({ name: 'product-public', params: { id: idUser } })

      const externalLink = window.origin + link.href
      copyToClipboard(externalLink)
        .then(() => {
          notifySucces('Copied')
        })
        .catch(() => {
          notifyError('Error in copy')
        })
    }

    onMounted(() => {
      handleListProducts()
    })

    return {
      columns: columnsProduct,
      products,
      loading,
      handleEdit,
      handleRemoveProduct,
      handleGoToStore,
      handleCopyPublicUrl,
    }
  },
})
</script>
