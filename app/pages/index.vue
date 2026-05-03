<script setup lang="ts">
    import { ref } from 'vue'
    import { useAuthStore } from '~/stores/auth'
    import { loginApi } from '~/client/auth'

    definePageMeta({
        layout: 'auth'
    })

    const authStore = useAuthStore()

    // If already logged in, redirect to dashboard automatically
    if (authStore.isAuthenticated) {
        navigateTo('/dashboard')
    }

    const email = ref('admin@avaclinic.com')
    const password = ref('password')
    const isLoading = ref(false)
    const errorMessage = ref('')

    const handleLogin = async () => {
        isLoading.value = true
        errorMessage.value = ''
        
        const resp = await loginApi(email.value, password.value)
        
        if (resp.status === 'success') {
            authStore.setAuth(resp.data.token, resp.data.user)
            navigateTo('/dashboard')
        } else {
            errorMessage.value = resp.message
        }
        
        isLoading.value = false
    }
</script>

<template>
    <UCard class="w-full max-w-sm">
        <template #header>
            <div class="text-center">
                <h2 class="text-2xl font-bold text-blue-600">AVA CLINIC</h2>
                <p class="text-sm text-gray-500 mt-1">
                    เข้าสู่ระบบเพื่อจัดการคลินิก
                </p>
            </div>
        </template>

        <form @submit.prevent="handleLogin" class="space-y-4">
            <UFormGroup label="อีเมล">
                <UInput v-model="email" type="email" placeholder="admin@avaclinic.com" icon="i-lucide-mail" />
            </UFormGroup>

            <UFormGroup label="รหัสผ่าน">
                <UInput v-model="password" type="password" placeholder="••••••••" icon="i-lucide-lock" />
            </UFormGroup>

            <UAlert v-if="errorMessage" color="error" variant="subtle" :title="errorMessage" />

            <UButton
                type="submit"
                block
                color="primary"
                variant="solid"
                size="md"
                :loading="isLoading"
            >
                เข้าสู่ระบบ
            </UButton>
            
            <div class="text-xs text-gray-500 text-center mt-4">
                <p>Admin: admin@avaclinic.com / password</p>
                <p>Superadmin: super@avaclinic.com / password</p>
            </div>
        </form>
    </UCard>
</template>
