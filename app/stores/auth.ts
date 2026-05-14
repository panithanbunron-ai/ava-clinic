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
    // Both token and user persisted in cookies — survives page refresh
    const token = useCookie<string | null>('auth_token', { default: () => null })
    const userCookie = useCookie<User | null>('auth_user', {
        default: () => null
        // serialize/parse JSON automatically via useCookie
    })

    const user = ref<User | null>(userCookie.value)

    // Derived state
    const role = computed(() => user.value?.role || null)
    const isAuthenticated = computed(() => !!token.value)

    function setAuth(newToken: string, userData: User) {
        token.value = newToken
        user.value = userData
        userCookie.value = userData // persist to cookie
    }

    function logout() {
        token.value = null
        user.value = null
        userCookie.value = null
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
