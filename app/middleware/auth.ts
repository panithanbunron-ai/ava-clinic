import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware((to) => {
    const authStore = useAuthStore()

    // Protected route prefixes
    const protectedPrefixes = ['/dashboard', '/customerNew', '/customerInfo']
    const isProtected = protectedPrefixes.some(prefix => to.path.startsWith(prefix))

    if (!authStore.isAuthenticated && isProtected) {
        return navigateTo('/')
    }
})
