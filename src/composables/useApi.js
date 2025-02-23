import useSupabase from 'src/boot/supabase'
import useAuthUser from 'src/composables/useAuthUser'
import { v4 as uuidv4 } from 'uuid'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import useBrand from 'src/composables/useBrand'
import { useQuasar } from 'quasar'

const brand = ref({
  primary: '',
  secondary: '',
  name: '',
  phone: '',
  paralax_url: '',
})

export default function useApi() {
  const { supabase } = useSupabase()
  const { user } = useAuthUser()
  const route = useRoute()
  const setBrand = useBrand()
  const $q = useQuasar()

  const list = async (table) => {
    console.log(table)
    const { data, error } = await supabase.from(table).select('*')
    if (error) throw error
    return data
  }

  const listPublic = async (table, userId, columnFilter = '', filter = '') => {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('user_id', userId)
      .eq(columnFilter, filter)
    if (error) throw error
    return data
  }

  const getById = async (table, id) => {
    const { data, error } = await supabase.from(table).select('*').eq('id', id)
    if (error) throw error
    return data[0]
  }

  const post = async (table, form) => {
    const { data, error } = await supabase.from(table).insert([
      {
        ...form,
        user_id: user.value.id,
      },
    ])
    if (error) throw error
    return data
  }
  const update = async (table, form) => {
    const { data, error } = await supabase
      .from(table)
      .update({ ...form })
      .match({ id: form.id })
    if (error) throw error
    return data
  }
  const remove = async (table, id) => {
    const { data, error } = await supabase.from(table).delete().match({ id })
    if (error) throw error
    return data
  }

  const uploadImg = async (file, storage) => {
    const fileName = uuidv4()
    const { error } = supabase.storage
      .from(storage)
      .upload(fileName, file, { cacheControl: 3600, upsert: false })

    const publicUrl = await getUrlPublic(fileName, storage)

    if (error) throw error
    return publicUrl
  }

  const getUrlPublic = async (fileName, storage) => {
    const { data, error } = supabase.storage.from(storage).getPublicUrl(fileName)
    if (error) throw error
    return data.publicUrl
  }

  const getBrand = async () => {
    const id = route.params.id || user?.value?.id
    if (id) {
      $q.loading.show({
        backgroundColor: 'gray-10',
      })
      const { data, error } = await supabase.from('config').select('*').eq('user_id', id)
      if (error) throw error
      if (data.length > 0) {
        brand.value = data[0]
        setBrand(brand.value.primary, brand.value.secondary)
      }
      $q.loading.hide()
      console.log('brand ', brand.value)
      return brand.value
    }
  }

  return {
    list,
    listPublic,
    getById,
    post,
    update,
    remove,
    uploadImg,
    getBrand,
    brand,
  }
}
