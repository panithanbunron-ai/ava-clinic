<template>
    <div class="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-white rounded-t-3xl">
        <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <UIcon name="i-heroicons-users" class="w-6 h-6" />
            </div>
            <div>
                <h1 class="text-xl font-bold text-gray-900 flex items-center gap-2 tracking-tight">
                    ข้อมูลลูกค้า
                </h1>
                <p class="text-sm text-gray-500 mt-1 font-medium flex items-center gap-2">
                    เอวาคลินิกเวชกรรม • สาขาเลย •
                    <span class="text-emerald-500 flex items-center gap-1">
                        <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        อัปเดต 13:43
                    </span>
                </p>
            </div>
        </div>

        <div class="flex items-center gap-3">
            <UButton
                variant="ghost"
                icon="i-heroicons-arrow-path"
                class="rounded-xl shadow-sm ring-1 ring-gray-200 hover:bg-gray-50 font-medium"
            >
                โหลดใหม่
            </UButton>
            <UButton
                variant="ghost"
                icon="i-heroicons-arrow-down-tray"
                class="rounded-xl shadow-sm ring-1 ring-gray-200 hover:bg-gray-50 font-medium"
            >
                Export
            </UButton>
            <UButton
                variant="ghost"
                icon="i-heroicons-arrow-up-tray"
                class="rounded-xl shadow-sm ring-1 ring-gray-200 hover:bg-gray-50 font-medium"
            >
                Import
            </UButton>
            <UButton
                variant="solid"
                class="rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-sm font-semibold ml-2 px-5"
                icon="i-heroicons-plus"
                to="/customerNew"
            >
                เพิ่มลูกค้าใหม่
            </UButton>
        </div>
    </div>
</template>
