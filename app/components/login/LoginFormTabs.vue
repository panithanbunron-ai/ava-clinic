<script setup lang="ts">
    import { ref } from 'vue'

    type Tab = 'signup' | 'signin'
    const activeTab = ref<Tab>('signin')

    const setTab = (tab: Tab) => {
        activeTab.value = tab
    }
</script>

<template>
    <div class="form-panel">
        <!-- Tab header -->
        <div class="tab-header">
            <button
                id="tab-signup-btn"
                class="tab-btn"
                :class="{ active: activeTab === 'signup' }"
                type="button"
                @click="setTab('signup')"
            >
                สมัครสมาชิก
            </button>
            <button
                id="tab-signin-btn"
                class="tab-btn"
                :class="{ active: activeTab === 'signin' }"
                type="button"
                @click="setTab('signin')"
            >
                เข้าสู่ระบบ
            </button>
        </div>

        <!-- Form card -->
        <div class="form-card">
            <Transition name="fade-slide" mode="out-in">
                <LoginSignUpForm v-if="activeTab === 'signup'" key="signup" />
                <LoginSignInForm v-else key="signin" />
            </Transition>

            <!-- Switch tab link -->
            <div class="switch-link">
                <template v-if="activeTab === 'signup'">
                    มีบัญชีอยู่แล้ว?
                    <button type="button" class="link-btn" @click="setTab('signin')">
                        เข้าสู่ระบบ
                    </button>
                </template>
                <template v-else>
                    ยังไม่มีบัญชี?
                    <button type="button" class="link-btn" @click="setTab('signup')">
                        สมัครสมาชิก
                    </button>
                </template>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .form-panel {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        width: 100%;
        max-width: 380px;
    }

    /* Tabs */
    .tab-header {
        display: flex;
        gap: 28px;
    }
    .tab-btn {
        background: none;
        border: none;
        font-size: 15px;
        font-weight: 600;
        color: #9ca3af;
        cursor: pointer;
        padding: 4px 0;
        position: relative;
        transition: color 0.2s;
    }
    .tab-btn::after {
        content: '';
        position: absolute;
        bottom: -4px;
        left: 0;
        right: 0;
        height: 2.5px;
        background: #4a90d9;
        border-radius: 2px;
        transform: scaleX(0);
        transition: transform 0.25s ease;
    }
    .tab-btn.active {
        color: #1e293b;
    }
    .tab-btn.active::after {
        transform: scaleX(1);
    }

    /* Form card */
    .form-card {
        background: white;
        border-radius: 20px;
        padding: 32px 28px 24px;
        width: 100%;
        box-shadow:
            0 8px 40px rgba(106, 99, 255, 0.1),
            0 2px 12px rgba(0, 0, 0, 0.06);
        display: flex;
        flex-direction: column;
        gap: 24px;
    }

    /* Switch link */
    .switch-link {
        text-align: center;
        font-size: 13px;
        color: #6b7280;
    }
    .link-btn {
        background: none;
        border: none;
        color: #ef4444;
        font-weight: 600;
        font-size: 13px;
        cursor: pointer;
        padding: 0 4px;
        transition: color 0.2s;
    }
    .link-btn:hover {
        color: #dc2626;
        text-decoration: underline;
    }

    /* Transition */
    .fade-slide-enter-active,
    .fade-slide-leave-active {
        transition: all 0.25s ease;
    }
    .fade-slide-enter-from {
        opacity: 0;
        transform: translateY(8px);
    }
    .fade-slide-leave-to {
        opacity: 0;
        transform: translateY(-8px);
    }
</style>
