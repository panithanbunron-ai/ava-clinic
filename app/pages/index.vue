<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

definePageMeta({
    layout: 'auth'
})

const authStore = useAuthStore()

// If already logged in, redirect to dashboard automatically
if (authStore.isAuthenticated) {
    navigateTo('/dashboard')
}
</script>

<template>
    <div class="login-page">
        <!-- Left: Hero (50%) -->
        <LoginHero class="login-left" />

        <!-- Right: Form (50%) -->
        <div class="login-right">
            <div class="form-wrapper">
                <LoginFormTabs />
                <LoginFooter />
            </div>
        </div>
    </div>
</template>

<style scoped>
.login-page {
    display: grid;
    grid-template-columns: 1fr 1fr;
    min-height: 100vh;
    width: 100%;
}

/* Left panel — hero handles its own bg */
/* .login-left {
    /* height is driven by grid row height
} */

/* Right panel */
.login-right {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f8f9ff;
    padding: 40px 32px;
}

.form-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
    width: 100%;
    max-width: 420px;
}

/* Responsive: stack on mobile */
@media (max-width: 768px) {
    .login-page {
        grid-template-columns: 1fr;
    }
    .login-left {
        display: none;
    }
    .login-right {
        padding: 32px 20px;
    }
}
</style>
