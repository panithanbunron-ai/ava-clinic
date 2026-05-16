<script setup lang="ts">
    defineProps<{
        waitingRoom: any[]
    }>()
</script>

<template>
    <div class="bg-white rounded-2xl ring-1 ring-gray-100 shadow-sm p-5">
        <div class="flex justify-between items-start mb-5">
            <div>
                <h2 class="font-bold text-gray-900 text-lg">ห้องรอ</h2>
                <p class="text-xs text-gray-500 font-medium">3 คนกำลังออนไลน์</p>
            </div>
            <div class="flex items-center gap-1.5 text-[10px] font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">
                <span class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                รอ
            </div>
        </div>

        <div class="space-y-4">
            <div v-for="item in waitingRoom" :key="item.id" class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <div class="relative">
                        <div class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm" :class="item.color">
                            {{ item.initial }}
                        </div>
                        <span class="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-white rounded-full"></span>
                    </div>
                    <div>
                        <div class="font-bold text-gray-900 text-sm mb-0.5">{{ item.patient }}</div>
                        <div class="text-[10px] text-gray-500 font-medium">{{ item.status }}</div>
                    </div>
                </div>

                <UButton v-if="item.action" 
                         :variant="item.action === 'รับ' ? 'solid' : 'ghost'"
                         size="sm"
                         class="rounded-lg font-bold px-4"
                         :class="item.action === 'รับ' ? 'shadow-sm' : 'ring-1 ring-gray-200 text-gray-700'"
                >
                    {{ item.action }}
                </UButton>
            </div>
        </div>
    </div>
</template>
