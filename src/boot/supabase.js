import { createClient } from '@supabase/supabase-js'
import useAuthUser from 'src/composables/useAuthUser'

const supabaseUrl = 'https://yexyazfzlotvbkiocfwt.supabase.co'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlleHlhemZ6bG90dmJraW9jZnd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc2NjExNTEsImV4cCI6MjA1MzIzNzE1MX0.rQ1tKwWaV0EAQw_NU51z6S85_9kXojVkZnGCBU7Z3dQ'
const supabase = createClient(supabaseUrl, supabaseKey)

supabase.auth.onAuthStateChange((event, session) => {
  const { user } = useAuthUser()

  user.value = session?.user || null
})

export default function useSupabase() {
  return { supabase }
}
