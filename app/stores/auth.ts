import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export type UserRole = 'admin' | 'superadmin' | null

export const useAuthStore = defineStore('auth', () => {
    const user = ref<{ name: string } | null>(null)
    const role = ref<UserRole>(null)

    const isAuthenticated = computed(() => !!user.value)

    function login(selectedRole: NonNullable<UserRole>) {
        // Mock authentication
        role.value = selectedRole
        user.value = { name: selectedRole === 'superadmin' ? 'Super Admin User' : 'Admin User' }
    }

    function logout() {
        user.value = null
        role.value = null
    }

    return {
        user,
        role,
        isAuthenticated,
        login,
        logout
    }
})
