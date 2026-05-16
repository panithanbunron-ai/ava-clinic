<script setup lang="ts">
    defineProps<{
        metrics: any
    }>()

    const formatNumber = (num: number) => {
        return new Intl.NumberFormat('th-TH').format(num)
    }
</script>

<template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Main Revenue Card -->
        <div
            class="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg shadow-indigo-500/20 relative overflow-hidden flex flex-col justify-between"
        >
            <div class="absolute right-0 bottom-0 opacity-10">
                <svg
                    width="150"
                    height="100"
                    viewBox="0 0 150 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M0 100C30 80 50 90 80 60C110 30 130 50 150 20V100H0Z" fill="white" />
                </svg>
            </div>
            <div class="relative z-10 flex items-center gap-2 mb-2">
                <span class="text-sm font-semibold text-white/90">รายได้สุทธิรวม 14 วัน</span>
                <UBadge size="xs" variant="subtle" class="bg-white/20 text-white border-0"
                    >PRIMARY</UBadge
                >
            </div>
            <div class="relative z-10 text-4xl font-extrabold tracking-tight mb-4">
                ฿{{ formatNumber(metrics?.revenue?.value || 0) }}
            </div>
            <div class="relative z-10 text-sm font-medium flex items-center gap-3">
                <span class="flex items-center gap-1">
                    <UIcon name="i-heroicons-arrow-trending-up" class="w-4 h-4" />
                    {{ metrics?.revenue?.trend }} vs ช่วงก่อน
                </span>
                <span class="text-white/40">|</span>
                <span class="text-white/90"
                    >เฉลี่ย ฿{{ formatNumber(metrics?.revenue?.avg || 0) }} / วัน</span
                >
            </div>
        </div>

        <!-- Metric 2: Bills -->
        <div
            class="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-gray-100 flex flex-col justify-between"
        >
            <div class="flex justify-between items-start mb-2">
                <span class="text-sm font-bold text-gray-500">จำนวนบิล</span>
                <div
                    class="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500"
                >
                    <UIcon name="i-heroicons-document-text" class="w-4 h-4" />
                </div>
            </div>
            <div class="text-3xl font-extrabold text-gray-900 mb-2">
                {{ formatNumber(metrics?.bills?.value || 0) }}
            </div>
            <div class="text-sm font-bold text-emerald-500 flex items-center gap-1">
                <UIcon name="i-heroicons-arrow-up-right" class="w-4 h-4" />
                {{ metrics?.bills?.trend }}
                <span class="text-gray-400 font-medium ml-1">({{ metrics?.bills?.diff }})</span>
            </div>
        </div>

        <!-- Metric 3: Avg per bill -->
        <div
            class="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-gray-100 flex flex-col justify-between"
        >
            <div class="flex justify-between items-start mb-2">
                <span class="text-sm font-bold text-gray-500">ยอดเฉลี่ย/บิล</span>
                <div
                    class="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500"
                >
                    <UIcon name="i-heroicons-currency-dollar" class="w-4 h-4" />
                </div>
            </div>
            <div class="text-3xl font-extrabold text-gray-900 mb-2">
                ฿{{ formatNumber(metrics?.avgPerBill?.value || 0) }}
            </div>
            <div class="text-sm font-bold text-emerald-500 flex items-center gap-1">
                <UIcon name="i-heroicons-arrow-up-right" class="w-4 h-4" />
                {{ metrics?.avgPerBill?.trend }}
            </div>
        </div>

        <!-- Metric 4: New customers -->
        <div
            class="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-gray-100 flex flex-col justify-between"
        >
            <div class="flex justify-between items-start mb-2">
                <span class="text-sm font-bold text-gray-500">ลูกค้าใหม่</span>
                <div
                    class="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center text-rose-500"
                >
                    <UIcon name="i-heroicons-user" class="w-4 h-4" />
                </div>
            </div>
            <div class="text-3xl font-extrabold text-gray-900 mb-2">
                {{ formatNumber(metrics?.newCustomers?.value || 0) }}
            </div>
            <div class="text-sm font-bold text-rose-500 flex items-center gap-1">
                <UIcon name="i-heroicons-arrow-down-right" class="w-4 h-4" />
                {{ metrics?.newCustomers?.trend }}
            </div>
        </div>
    </div>
</template>
