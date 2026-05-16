<script setup lang="ts">
    import { ref } from 'vue'

    const searchQuery = ref('')
    const perPage = ref(10)
</script>

<template>
    <div class="px-6 py-4 border-b border-gray-100 flex flex-wrap items-center gap-4 justify-between bg-gray-50/50">
        <div class="flex flex-wrap items-center gap-3 flex-1 min-w-[280px]">
            <!-- Search Input -->
            <UInput
                v-model="searchQuery"
                icon="i-heroicons-magnifying-glass"
                placeholder="ค้นหาด้วยชื่อ HN เบอร์ หรือเลขบัตร"
                class="w-full max-w-md"
                size="md"
                :ui="{ rounded: 'rounded-xl', icon: { color: 'text-gray-400' } }"
            >
                <template #trailing>
                    <div class="flex items-center gap-1">
                        <UKbd>⌘</UKbd>
                        <UKbd>K</UKbd>
                    </div>
                </template>
            </UInput>

            <!-- Filters -->
            <UBadge color="purple" variant="subtle" class="rounded-lg px-2.5 py-1 text-xs font-semibold">
                VIP
                <button class="ml-1 hover:text-purple-700">
                    <UIcon name="i-heroicons-x-mark" class="w-3 h-3" />
                </button>
            </UBadge>
            
            <UBadge color="emerald" variant="subtle" class="rounded-lg px-2.5 py-1 text-xs font-semibold">
                ลูกค้าใหม่
                <button class="ml-1 hover:text-emerald-700">
                    <UIcon name="i-heroicons-x-mark" class="w-3 h-3" />
                </button>
            </UBadge>

            <button class="px-3 py-1 rounded-full border border-dashed border-gray-300 text-xs font-medium text-gray-500 hover:bg-gray-50 transition-colors flex items-center gap-1">
                <UIcon name="i-heroicons-plus" class="w-3 h-3" />
                เพิ่ม Tag
            </button>
        </div>

        <div class="flex items-center gap-2 text-sm text-gray-600">
            <span>แสดง</span>
            <USelect
                v-model="perPage"
                :options="[10, 20, 50, 100]"
                size="sm"
                class="w-20"
            />
            <span>รายการ</span>
        </div>
    </div>
</template>
