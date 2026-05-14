<template>
    <div class="login-hero">
        <!-- Logo -->
        <div class="hero-logo">
            <div class="logo-icon">
                <svg
                    width="26"
                    height="26"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M14 2L4 8V20L14 26L24 20V8L14 2Z" fill="white" fill-opacity="0.85" />
                    <path
                        d="M14 9V19M9 14H19"
                        stroke="#4A90D9"
                        stroke-width="2.5"
                        stroke-linecap="round"
                    />
                </svg>
            </div>
            <span class="logo-text">AVA Clinic</span>
        </div>

        <!-- Center content -->
        <div class="hero-center">
            <!-- Big decorative icon -->
            <div class="hero-icon-ring">
                <div class="ring ring-3" />
                <div class="ring ring-2" />
                <div class="ring ring-1" />
                <div class="hero-icon-core">
                    <svg
                        width="52"
                        height="52"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 3a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm3 13H9v-1.5h2.25V12H9v-1.5h3.75V16.5H15V18z"
                            fill="white"
                            fill-opacity="0.9"
                        />
                    </svg>
                </div>
            </div>

            <h1 class="hero-title">
                ยินดีต้อนรับสู่<br /><span class="hero-brand">AVA Clinic</span>
            </h1>
            <p class="hero-subtitle">ระบบจัดการคลินิกครบวงจร<br />ปลอดภัย รวดเร็ว และใช้งานง่าย</p>

            <!-- Stat chips -->
            <div class="hero-stats">
                <div class="stat-chip">
                    <span class="stat-number">2,400+</span>
                    <span class="stat-label">ผู้ป่วย</span>
                </div>
                <div class="stat-divider" />
                <div class="stat-chip">
                    <span class="stat-number">98%</span>
                    <span class="stat-label">ความพึงพอใจ</span>
                </div>
                <div class="stat-divider" />
                <div class="stat-chip">
                    <span class="stat-number">24/7</span>
                    <span class="stat-label">พร้อมบริการ</span>
                </div>
            </div>
        </div>

        <!-- Bottom tagline -->
        <p class="hero-tagline">Copyright © 2025, AVA Clinic. All rights reserved.</p>
    </div>
</template>

<style scoped>
    .login-hero {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        padding: 40px 48px;
        height: 100%;
        background: linear-gradient(160deg, #3a7bd5 0%, #5b4fcf 55%, #7c3aed 100%);
        position: relative;
        overflow: hidden;
    }

    /* Background blobs */
    .login-hero::before {
        content: '';
        position: absolute;
        width: 420px;
        height: 420px;
        background: rgba(255, 255, 255, 0.06);
        border-radius: 50%;
        top: -120px;
        right: -100px;
    }
    .login-hero::after {
        content: '';
        position: absolute;
        width: 320px;
        height: 320px;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 50%;
        bottom: -80px;
        left: -80px;
    }

    /* Logo */
    .hero-logo {
        display: flex;
        align-items: center;
        gap: 12px;
        z-index: 10;
        align-self: flex-start;
    }
    .logo-icon {
        width: 44px;
        height: 44px;
        background: rgba(255, 255, 255, 0.18);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(8px);
        border: 1px solid rgba(255, 255, 255, 0.25);
    }
    .logo-text {
        font-size: 20px;
        font-weight: 700;
        color: white;
        letter-spacing: 0.4px;
    }

    /* Center content */
    .hero-center {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 28px;
        z-index: 10;
        text-align: center;
    }

    /* Rings */
    .hero-icon-ring {
        position: relative;
        width: 160px;
        height: 160px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .ring {
        position: absolute;
        border-radius: 50%;
        border: 1px solid rgba(255, 255, 255, 0.2);
    }
    .ring-1 {
        width: 100px;
        height: 100px;
    }
    .ring-2 {
        width: 130px;
        height: 130px;
    }
    .ring-3 {
        width: 160px;
        height: 160px;
    }
    .hero-icon-core {
        width: 80px;
        height: 80px;
        background: rgba(255, 255, 255, 0.18);
        border-radius: 50%;
        border: 2px solid rgba(255, 255, 255, 0.35);
        display: flex;
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(12px);
        z-index: 2;
    }

    /* Text */
    .hero-title {
        font-size: 32px;
        font-weight: 800;
        color: white;
        line-height: 1.3;
        margin: 0;
    }
    .hero-brand {
        color: rgba(255, 255, 255, 0.85);
        font-style: italic;
    }
    .hero-subtitle {
        font-size: 15px;
        color: rgba(255, 255, 255, 0.72);
        line-height: 1.7;
        margin: 0;
    }

    /* Stats */
    .hero-stats {
        display: flex;
        align-items: center;
        gap: 20px;
        background: rgba(255, 255, 255, 0.12);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 16px;
        padding: 16px 28px;
        backdrop-filter: blur(10px);
    }
    .stat-chip {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2px;
    }
    .stat-number {
        font-size: 22px;
        font-weight: 800;
        color: white;
    }
    .stat-label {
        font-size: 11px;
        color: rgba(255, 255, 255, 0.65);
        font-weight: 500;
    }
    .stat-divider {
        width: 1px;
        height: 36px;
        background: rgba(255, 255, 255, 0.25);
    }

    /* Tagline */
    .hero-tagline {
        font-size: 11.5px;
        color: rgba(255, 255, 255, 0.45);
        z-index: 10;
        margin: 0;
    }
</style>
