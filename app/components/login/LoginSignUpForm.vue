<script setup lang="ts">
import { ref } from 'vue'

const fullName = ref('')
const email = ref('')
const password = ref('')
const isLoading = ref(false)

const handleSignUp = async () => {
    isLoading.value = true
    // TODO: Implement sign up API
    await new Promise(resolve => setTimeout(resolve, 1000))
    isLoading.value = false
}
</script>

<template>
    <div class="signup-form">
        <form @submit.prevent="handleSignUp" class="form-fields">
            <div class="field-group">
                <label class="field-label">ชื่อ-นามสกุล</label>
                <input
                    id="signup-fullname"
                    v-model="fullName"
                    type="text"
                    placeholder="กรอกชื่อ-นามสกุล"
                    class="field-input"
                    autocomplete="name"
                    required
                >
            </div>

            <div class="field-group">
                <label class="field-label">อีเมล</label>
                <input
                    id="signup-email"
                    v-model="email"
                    type="email"
                    placeholder="example@avaclinic.com"
                    class="field-input"
                    autocomplete="email"
                    required
                >
            </div>

            <div class="field-group">
                <label class="field-label">รหัสผ่าน</label>
                <input
                    id="signup-password"
                    v-model="password"
                    type="password"
                    placeholder="••••••••"
                    class="field-input"
                    autocomplete="new-password"
                    required
                >
            </div>

            <button
                id="signup-submit-btn"
                type="submit"
                class="submit-btn"
                :disabled="isLoading"
            >
                <span v-if="isLoading" class="btn-spinner" />
                <span>{{ isLoading ? 'กำลังสมัคร...' : 'สมัครสมาชิก' }}</span>
            </button>
        </form>
    </div>
</template>

<style scoped>
.signup-form {
    width: 100%;
}
.form-fields {
    display: flex;
    flex-direction: column;
    gap: 18px;
}

.field-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
}
.field-label {
    font-size: 13px;
    font-weight: 600;
    color: #4A90D9;
}
.field-input {
    background: transparent;
    border: none;
    border-bottom: 1.5px solid #D1D9E6;
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
    border-bottom-color: #4A90D9;
}

.submit-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background: linear-gradient(135deg, #4A90D9, #6c63ff);
    color: white;
    border: none;
    border-radius: 10px;
    padding: 13px 24px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    width: 100%;
    transition: opacity 0.2s, transform 0.15s;
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
    border: 2px solid rgba(255,255,255,0.4);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
}
@keyframes spin {
    to { transform: rotate(360deg); }
}
</style>
