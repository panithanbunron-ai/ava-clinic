<template>
    <div class="flex flex-wrap gap-4 justify-between items-center mb-2">
        <div>
            <div class="flex items-center gap-3 mb-1">
                <h1 class="text-2xl font-bold text-gray-900 tracking-tight">
                    Teleconsult
                </h1>
                <UBadge variant="subtle" size="xs" class="font-bold tracking-wide">BETA</UBadge>
                <div class="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full ring-1 ring-emerald-100">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    ระบบพร้อมใช้งาน
                </div>
            </div>
            <p class="text-sm text-gray-500 font-medium">
                จัดการตารางตรวจออนไลน์ของวันที่ <span class="text-gray-900 font-bold">วันเสาร์, 16 พ.ค. 2026</span>
            </p>
        </div>

        <div class="flex flex-wrap items-center gap-3">
            <UButton
                variant="solid"
                icon="i-heroicons-calendar"
                class="rounded-xl shadow-sm ring-1 ring-gray-200 hover:bg-gray-50 font-bold px-4 text-gray-700"
            >
                ดูปฏิทิน
            </UButton>
            <UButton
                variant="solid"
                icon="i-heroicons-cog-8-tooth"
                class="rounded-xl shadow-sm ring-1 ring-gray-200 hover:bg-gray-50 font-bold px-4 text-gray-700"
            >
                ตั้งค่า
            </UButton>
            <UButton
                icon="i-heroicons-video-camera"
                class="rounded-xl shadow-md shadow-indigo-500/20 font-bold px-5 hover:scale-105 transition-transform"
            >
                เริ่มเซสชันใหม่
            </UButton>
        </div>
    </div>
</template>
