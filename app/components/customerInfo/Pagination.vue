<script setup lang="ts">
    import { ref } from 'vue'

    const currentPage = ref(1)
</script>

<template>
    <div class="px-6 py-4 flex items-center justify-between border-t border-gray-100 bg-gray-50/30 rounded-b-3xl">
        <div class="text-sm text-gray-500 font-medium">
            แสดง <span class="text-gray-900 font-bold">1-8</span> จากทั้งหมด <span class="text-gray-900 font-bold">3,250</span> รายการ
        </div>

        <div class="flex items-center gap-1">
            <UButton
                variant="ghost"
                class="rounded-lg shadow-sm ring-1 ring-gray-200 bg-white hover:bg-gray-50 text-xs px-3"
                icon="i-heroicons-chevron-left"
            >
                ก่อนหน้า
            </UButton>

            <div class="flex gap-1 mx-2">
                <UButton variant="solid" class="rounded-lg w-8 h-8 flex justify-center p-0">1</UButton>
                <UButton variant="ghost" class="rounded-lg w-8 h-8 flex justify-center p-0 ring-1 ring-gray-200 bg-white">2</UButton>
                <UButton variant="ghost" class="rounded-lg w-8 h-8 flex justify-center p-0 ring-1 ring-gray-200 bg-white">3</UButton>
                <UButton variant="ghost" class="rounded-lg w-8 h-8 flex justify-center p-0 ring-1 ring-gray-200 bg-white">4</UButton>
                <span class="flex items-center justify-center w-6 text-gray-400">...</span>
                <UButton variant="ghost" class="rounded-lg px-2 h-8 flex justify-center ring-1 ring-gray-200 bg-white">325</UButton>
            </div>

            <UButton
                variant="ghost"
                class="rounded-lg shadow-sm ring-1 ring-gray-200 bg-white hover:bg-gray-50 text-xs px-3"
                trailing-icon="i-heroicons-chevron-right"
            >
                ถัดไป
            </UButton>
        </div>
    </div>
</template>
