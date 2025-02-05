import { ref, watch } from 'vue'
import useSupabase from 'src/boot/supabase'

const user = ref(null)

export default function useAuthUser() {
  const { supabase } = useSupabase()

  const login = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    user.value = data.user
    return data.user
  }

  const loginWithSocialProvider = async (provider) => {
    const { data, error } = await supabase.auth.signInWithOAuth({ provider })
    if (error) throw error
    user.value = data.user
    return data.user
  }

  const register = async ({ email, password, name }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    })
    if (error) throw error
    return data.user
  }

  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    user.value = null
  }

  const isLoggedIn = () => {
    return !!user.value
  }

  const update = async (data) => {
    const { data: updatedUser, error } = await supabase.auth.update(data)
    if (error) throw error
    user.value = updatedUser
    return updatedUser
  }

  watch(user, (newUser) => {
    console.log('User updated:', newUser)
  })

  return {
    user,
    login,
    loginWithSocialProvider,
    register,
    logout,
    isLoggedIn,
    update,
  }
}
