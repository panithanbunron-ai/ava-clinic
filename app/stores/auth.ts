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
    // TODO (production): switch auth_token to httpOnly + server-side session so JS cannot read it.
    // Currently readable by JS to include in Authorization headers — keep secure + sameSite in the meantime.
    const token = useCookie<string | null>('auth_token', {
        default: () => null,
        secure: true,
        sameSite: 'strict'
    })
    // TODO (production): sign/encrypt auth_user cookie to prevent client-side role tampering.
    const userCookie = useCookie<User | null>('auth_user', {
        default: () => null,
        secure: true,
        sameSite: 'strict'
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
