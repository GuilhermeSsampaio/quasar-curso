import { ref } from 'vue'
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

  const sendPasswordRestEmail = async (email) => {
    const { user, error } = await supabase.auth.resetPasswordForEmail(email)
    if (error) throw error
    return user
  }

  const resetPassword = async (accessToken, newPassword) => {
    const { user, error } = await supabase.auth.updateUser({ password: newPassword })
    if (error) throw error
    return user
  }

  return {
    user,
    login,
    loginWithSocialProvider,
    logout,
    isLoggedIn,
    register,
    update,
    sendPasswordRestEmail,
    resetPassword,
  }
}
