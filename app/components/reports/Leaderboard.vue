<script setup lang="ts">
    defineProps<{
        title: string
        subtitle: string
        items: any[]
        type: 'service' | 'staff'
    }>()

    const formatNumber = (num: number) => {
        return new Intl.NumberFormat('th-TH').format(num)
    }
</script>

<template>
    <div
        class="bg-white rounded-2xl shadow-sm ring-1 ring-gray-100 p-6 flex flex-col h-full relative overflow-hidden"
    >
        <div class="flex justify-between items-start mb-6 relative z-10">
            <div>
                <h3 class="font-bold text-gray-900">{{ title }}</h3>
                <p class="text-xs text-gray-500 mt-1">{{ subtitle }}</p>
            </div>
            <UButton
                variant="ghost"
                class="text-xs font-bold hover:bg-indigo-50"
                trailing-icon="i-heroicons-chevron-right"
            >
                ดูทั้งหมด
            </UButton>
        </div>

        <div class="flex-1 flex flex-col gap-5 relative z-10">
            <div v-for="(item, idx) in items" :key="item.id" class="flex gap-4 items-center">
                <!-- Rank or Avatar -->
                <div
                    v-if="type === 'service'"
                    class="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500 shrink-0"
                >
                    {{ idx + 1 }}
                </div>
                <div
                    v-else
                    class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                    :class="item.color"
                >
                    {{ item.initial }}
                </div>

                <div class="flex-1 min-w-0">
                    <div class="flex justify-between items-end mb-1">
                        <div class="font-bold text-gray-900 text-sm truncate">{{ item.name }}</div>
                        <div class="font-bold text-gray-900 text-sm shrink-0">
                            ฿{{ formatNumber(item.revenue) }}
                        </div>
                    </div>

                    <div class="w-full bg-gray-100 rounded-full h-1.5 mb-1.5">
                        <div
                            class="h-1.5 rounded-full transition-all"
                            :class="item.barColor || 'bg-indigo-500'"
                            :style="{ width: item.progress + '%' }"
                        ></div>
                    </div>

                    <div class="text-[10px] text-gray-400 font-medium flex justify-between">
                        <span
                            >{{ item.bills }} บิล
                            <template v-if="item.avg"
                                >· เฉลี่ย ฿{{ formatNumber(item.avg) }}</template
                            ></span
                        >
                    </div>
                </div>
            </div>
        </div>

        <div
            v-if="type === 'staff'"
            class="mt-6 pt-4 border-t border-indigo-50 flex items-center gap-2 text-xs font-semibold text-indigo-600 bg-indigo-50/50 -mx-6 -mb-6 px-6 pb-6 relative z-10"
        >
            <UIcon name="i-heroicons-clock" class="w-4 h-4" />
            พิมลภา ทำยอดสูงสุด 4 สัปดาห์ติด — ส่งโบนัสได้เลย
        </div>
    </div>
</template>
