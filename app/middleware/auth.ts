import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware(to => {
    const authStore = useAuthStore()

    const protectedPrefixes = ['/dashboard', '/customerNew', '/customerInfo', '/appointment', '/reports', '/teleconsult']
    const isProtected = protectedPrefixes.some(prefix => to.path.startsWith(prefix))

    if (!authStore.isAuthenticated && isProtected) {
        return navigateTo('/')
    }
})
