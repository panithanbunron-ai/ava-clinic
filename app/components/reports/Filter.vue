<template>
    <div
        class="bg-white rounded-2xl shadow-sm ring-1 ring-gray-100 p-2 flex flex-wrap gap-4 justify-between items-center"
    >
        <!-- Tabs -->
        <div class="flex items-center gap-1 bg-slate-50/50 p-1 rounded-xl">
            <!-- <button
                class="px-4 py-1.5 rounded-lg text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-white transition-all"
            >
                วันนี้
            </button> -->
            <button
                class="px-4 py-1.5 rounded-lg text-sm font-bold text-indigo-600 bg-white shadow-sm ring-1 ring-gray-200/50 transition-all"
            >
                รายวัน
            </button>
            <button
                class="px-4 py-1.5 rounded-lg text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-white transition-all"
            >
                รายสัปดาห์
            </button>
            <button
                class="px-4 py-1.5 rounded-lg text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-white transition-all"
            >
                รายเดือน
            </button>
            <button
                class="px-4 py-1.5 rounded-lg text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-white transition-all"
            >
                รายปี
            </button>
            <button
                class="px-4 py-1.5 rounded-lg text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-white transition-all"
            >
                กำหนดเอง
            </button>
        </div>

        <!-- Date Pickers -->
        <div class="flex items-center gap-2">
            <UButton
                variant="ghost"
                icon="i-heroicons-chevron-left"
                class="rounded-lg shadow-sm ring-1 ring-gray-200 hover:bg-gray-50 bg-white"
            />

            <UButton
                variant="ghost"
                icon="i-heroicons-calendar"
                class="rounded-lg shadow-sm ring-1 ring-gray-200 hover:bg-gray-50 bg-white px-4 font-bold text-gray-800"
            >
                1 พ.ค. - 14 พ.ค. 2026
                <span class="text-gray-400 font-normal ml-1">(14 วัน)</span>
            </UButton>

            <UButton
                variant="ghost"
                icon="i-heroicons-chevron-right"
                class="rounded-lg shadow-sm ring-1 ring-gray-200 hover:bg-gray-50 bg-white"
            />

            <div class="flex items-center gap-2 ml-2">
                <span class="text-sm font-medium text-gray-500">เทียบกับ</span>
                <USelect
                    :options="['ช่วงก่อนหน้า', 'ปีที่แล้ว']"
                    model-value="ช่วงก่อนหน้า"
                    class="w-32"
                    :ui="{}"
                />
            </div>
        </div>
    </div>
</template>
