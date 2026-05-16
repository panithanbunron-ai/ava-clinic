<template>
    <div
        class="px-8 py-8 border-b border-gray-100 flex flex-wrap gap-4 justify-between items-end bg-white rounded-t-3xl"
    >
        <div>
            <!-- Breadcrumb -->
            <!-- <div class="text-xs text-gray-400 font-medium flex items-center gap-2 mb-2">
                <span>รายงาน</span>
                <UIcon name="i-heroicons-chevron-right" class="w-3 h-3" />
                <span class="text-gray-900 font-bold">รายงานรายได้</span>
            </div> -->

            <h1 class="text-2xl font-bold text-gray-900 tracking-tight">รายงานรายได้</h1>
            <p class="text-sm text-gray-500 mt-1.5 font-medium flex items-center gap-2">
                <span class="text-emerald-500 flex items-center gap-1">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    อัปเดตล่าสุด 14:30 น.
                </span>
                <span class="text-gray-300">•</span> ข้อมูลสดจากระบบ
            </p>
        </div>

        <div class="flex flex-wrap items-center gap-2">
            <UButton
                variant="ghost"
                icon="i-heroicons-arrow-down-tray"
                class="rounded-xl shadow-sm ring-1 ring-gray-200 hover:bg-gray-50 font-medium px-4"
            >
                Export
            </UButton>
            <UButton
                variant="ghost"
                icon="i-heroicons-printer"
                class="rounded-xl shadow-sm ring-1 ring-gray-200 hover:bg-gray-50 font-medium px-4"
            >
                พิมพ์
            </UButton>
            <UButton
                variant="solid"
                class="rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-sm font-bold ml-1 px-5"
                icon="i-heroicons-document-plus"
            >
                สร้างรายงาน
            </UButton>
        </div>
    </div>
</template>
