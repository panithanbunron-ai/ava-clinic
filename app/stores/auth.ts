import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export type UserRole = 'admin' | 'superadmin' | 'doctor' | 'nurse' | null

export type User = {
    id: number
    name: string
    role: UserRole
    email: string
}

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null)
    const token = useCookie<string | null>('auth_token')
    
    // Derived state
    const role = computed(() => user.value?.role || null)
    const isAuthenticated = computed(() => !!token.value)

    function setAuth(newToken: string, userData: User) {
        token.value = newToken
        user.value = userData
    }

    function logout() {
        user.value = null
        token.value = null
    }

    return {
        user,
        role,
        token,
        isAuthenticated,
        setAuth,
        logout
    }
})
