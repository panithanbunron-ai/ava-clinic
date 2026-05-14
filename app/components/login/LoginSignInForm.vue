<script setup lang="ts">
    import { ref } from 'vue'
    import { loginApi } from '~/client/auth'
    import { useAuthStore } from '~/stores/auth'

    const authStore = useAuthStore()

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
    <div class="signin-form">
        <form @submit.prevent="handleLogin" class="form-fields">
            <div class="field-group">
                <label class="field-label">อีเมล</label>
                <input
                    id="login-email"
                    v-model="email"
                    type="email"
                    placeholder="admin@avaclinic.com"
                    class="field-input"
                    autocomplete="email"
                    required
                />
            </div>

            <div class="field-group">
                <label class="field-label">รหัสผ่าน</label>
                <input
                    id="login-password"
                    v-model="password"
                    type="password"
                    placeholder="••••••••"
                    class="field-input"
                    autocomplete="current-password"
                    required
                />
            </div>

            <!-- Error message -->
            <div v-if="errorMessage" class="error-alert">
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle cx="12" cy="12" r="10" stroke="#ef4444" stroke-width="2" />
                    <path
                        d="M12 8v4M12 16h.01"
                        stroke="#ef4444"
                        stroke-width="2"
                        stroke-linecap="round"
                    />
                </svg>
                <span>{{ errorMessage }}</span>
            </div>

            <button id="login-submit-btn" type="submit" class="submit-btn" :disabled="isLoading">
                <span v-if="isLoading" class="btn-spinner" />
                <span>{{ isLoading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ' }}</span>
            </button>

            <!-- Demo hint -->
            <div class="demo-hint">
                <p>Admin: <code>admin@avaclinic.com</code> / <code>password</code></p>
                <p>Superadmin: <code>super@avaclinic.com</code> / <code>password</code></p>
            </div>
        </form>
    </div>
</template>

<style scoped>
    .signin-form {
        width: 100%;
    }
    .form-fields {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    /* Field */
    .field-group {
        display: flex;
        flex-direction: column;
        gap: 6px;
    }
    .field-label {
        font-size: 13px;
        font-weight: 600;
        color: #4a90d9;
    }
    .field-input {
        background: transparent;
        border: none;
        border-bottom: 1.5px solid #d1d9e6;
        outline: none;
        padding: 8px 2px;
        font-size: 14px;
        color: #374151;
        transition: border-color 0.2s;
        width: 100%;
    }
    .field-input::placeholder {
        color: #b0bec5;
    }
    .field-input:focus {
        border-bottom-color: #4a90d9;
    }

    /* Error alert */
    .error-alert {
        display: flex;
        align-items: center;
        gap: 8px;
        background: #fef2f2;
        border: 1px solid #fee2e2;
        border-radius: 8px;
        padding: 10px 14px;
        font-size: 13px;
        color: #ef4444;
    }

    /* Submit button */
    .submit-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        background: linear-gradient(135deg, #4a90d9, #6c63ff);
        color: white;
        border: none;
        border-radius: 10px;
        padding: 13px 24px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        width: 100%;
        transition:
            opacity 0.2s,
            transform 0.15s;
        letter-spacing: 0.3px;
    }
    .submit-btn:hover:not(:disabled) {
        opacity: 0.9;
        transform: translateY(-1px);
    }
    .submit-btn:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
    .btn-spinner {
        width: 16px;
        height: 16px;
        border: 2px solid rgba(255, 255, 255, 0.4);
        border-top-color: white;
        border-radius: 50%;
        animation: spin 0.7s linear infinite;
    }
    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }

    /* Demo hint */
    .demo-hint {
        font-size: 11px;
        color: #9ca3af;
        text-align: center;
        line-height: 1.8;
    }
    .demo-hint code {
        background: #f3f4f6;
        border-radius: 4px;
        padding: 1px 5px;
        font-family: monospace;
        color: #6b7280;
    }
</style>
