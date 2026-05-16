<script setup lang="ts">
    import { ref, onMounted, onUnmounted } from 'vue'

    const isLoading = ref(false)
    const progress = ref(0)
    let progressInterval: any

    const startLoading = () => {
        isLoading.value = true
        progress.value = 0
        clearInterval(progressInterval)
        progressInterval = setInterval(() => {
            if (progress.value < 90) {
                progress.value += Math.random() * 15
            }
        }, 200)
    }

    const finishLoading = () => {
        progress.value = 100
        setTimeout(() => {
            isLoading.value = false
            clearInterval(progressInterval)
            setTimeout(() => {
                progress.value = 0
            }, 300)
        }, 500) // Keep 100% visible for a moment before fading out
    }

    if (import.meta.client) {
        const nuxtApp = useNuxtApp()
        nuxtApp.hook('page:start', startLoading)
        nuxtApp.hook('page:finish', finishLoading)
    }
</script>

<template>
    <Transition name="fade">
        <div v-if="isLoading" class="loading-overlay">
            <div class="grid-bg"></div>

            <!-- Floating Blobs/Shapes matching the image -->
            <div class="shape shape-top-left"></div>
            <div class="shape shape-right"></div>
            <div class="shape shape-bottom-right"></div>

            <div class="content">
                <!-- Icon with spinner ring -->
                <div class="icon-container">
                    <svg class="spinner-ring" viewBox="0 0 100 100">
                        <circle class="track" cx="50" cy="50" r="48" />
                        <circle class="fill" cx="50" cy="50" r="48" />
                    </svg>
                    <div class="icon-box">
                        <UIcon name="i-heroicons-plus" class="w-12 h-12 text-indigo-600" />
                    </div>
                </div>

                <!-- Text Group -->
                <h1 class="title">ClinicOS</h1>
                <p class="subtitle">MEDICAL ADMINISTRATION</p>

                <!-- Status & Progress -->
                <div class="status-text">กำลังโหลดข้อมูลคลินิกของคุณ</div>

                <div class="progress-track">
                    <div class="progress-fill" :style="{ width: progress + '%' }"></div>
                </div>

                <div class="version-text">v2.4.0 · ดึงข้อมูลผู้ป่วยและนัดหมาย</div>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
    .loading-overlay {
        position: fixed;
        inset: 0;
        z-index: 99999;
        background: #6d4aff; /* Vivid purple matching the image */
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }

    /* Faint grid background */
    .grid-bg {
        position: absolute;
        inset: 0;
        background-image:
            linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
        background-size: 32px 32px;
        z-index: 1;
    }

    /* Semi-transparent decorative shapes */
    .shape {
        position: absolute;
        background: rgba(255, 255, 255, 0.06);
        z-index: 2;
    }

    .shape-top-left {
        width: 180px;
        height: 180px;
        border-radius: 40px;
        top: 15%;
        left: 15%;
        transform: rotate(10deg);
    }

    .shape-right {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        top: 25%;
        right: 15%;
    }

    .shape-bottom-right {
        width: 140px;
        height: 140px;
        border-radius: 30px;
        bottom: 20%;
        right: 25%;
        transform: rotate(-5deg);
    }

    .content {
        position: relative;
        z-index: 10;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        color: white;
    }

    /* Spinning halo container */
    .icon-container {
        position: relative;
        width: 160px;
        height: 160px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 20px;
    }

    .spinner-ring {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        animation: spin 1.5s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        transform-origin: center;
    }

    .track {
        fill: none;
        stroke: rgba(255, 255, 255, 0.2);
        stroke-width: 2;
    }

    .fill {
        fill: none;
        stroke: white;
        stroke-width: 3;
        stroke-linecap: round;
        stroke-dasharray: 80 200; /* Create a partial circle */
        stroke-dashoffset: 0;
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    .icon-box {
        width: 86px;
        height: 86px;
        background: white;
        border-radius: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    }

    .title {
        font-size: 26px;
        font-weight: 700;
        letter-spacing: 0px;
        margin-bottom: 6px;
    }

    .subtitle {
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 1.5px;
        color: rgba(255, 255, 255, 0.8);
        margin-bottom: 45px;
    }

    .status-text {
        font-size: 14px;
        font-weight: 500;
        margin-bottom: 14px;
        color: rgba(255, 255, 255, 0.95);
    }

    .progress-track {
        width: 340px;
        height: 4px;
        background: rgba(255, 255, 255, 0.15);
        border-radius: 4px;
        overflow: hidden;
        margin-bottom: 24px;
    }

    .progress-fill {
        height: 100%;
        background: white;
        border-radius: 4px;
        transition: width 0.3s ease-out;
        box-shadow: 0 0 8px rgba(255, 255, 255, 0.6);
    }

    .version-text {
        font-size: 11px;
        color: rgba(255, 255, 255, 0.6);
        font-weight: 400;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition:
            opacity 0.5s ease,
            backdrop-filter 0.5s ease;
    }
    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
        backdrop-filter: blur(0px);
    }
</style>
