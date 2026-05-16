<script setup lang="ts">
    useHead({
        meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
        link: [{ rel: 'icon', href: '/favicon.ico' }],
        htmlAttrs: {
            lang: 'en'
        }
    })

    const title = 'Nuxt Starter Template'
    const description =
        'A production-ready starter template powered by Nuxt UI. Build beautiful, accessible, and performant applications in minutes, not hours.'

    useSeoMeta({
        title,
        description,
        ogTitle: title,
        ogDescription: description,
        ogImage: 'https://ui.nuxt.com/assets/templates/nuxt/starter-light.png',
        twitterCard: 'summary_large_image'
    })

    // Auto-fetch user profile if token exists (SSR or initial load)
    import { useAuthStore } from '~/stores/auth'
    import { meApi } from '~/client/auth'

    const authStore = useAuthStore()

    if (authStore.token && !authStore.user) {
        const { data } = await useAsyncData('auth-me', () => meApi(authStore.token!))
        if (data.value && data.value.status === 'success') {
            authStore.user = data.value.data
        } else {
            authStore.logout() // Invalid token, clean it up
        }
    }
</script>

<template>
    <UApp>
        <AppLoadingScreen />
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </UApp>
</template>
