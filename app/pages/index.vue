<script setup lang="ts">
    import { useAuthStore, type UserRole } from '~/stores/auth'

    definePageMeta({
        layout: 'auth'
    })

    const authStore = useAuthStore()

    // If already logged in, redirect to dashboard automatically
    if (authStore.isAuthenticated) {
        navigateTo('/dashboard')
    }

    const handleLogin = (role: UserRole) => {
        if (role) {
            authStore.login(role)
            navigateTo('/dashboard')
        }
    }
</script>

<template>
    <UCard class="w-full max-w-sm">
        <template #header>
            <div class="text-center">
                <h2 class="text-2xl font-bold">Ava Clinic</h2>
                <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Please select your role to login
                </p>
            </div>
        </template>

        <div class="space-y-4">
            <UButton
                block
                color="primary"
                variant="solid"
                size="lg"
                icon="i-lucide-shield"
                @click="handleLogin('admin')"
            >
                Login as Admin
            </UButton>

            <UButton
                block
                color="error"
                variant="solid"
                size="lg"
                icon="i-lucide-shield-alert"
                @click="handleLogin('superadmin')"
            >
                Login as Super Admin
            </UButton>
        </div>
    </UCard>
</template>
