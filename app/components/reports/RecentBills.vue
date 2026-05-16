<script setup lang="ts">
    defineProps<{
        bills: any[]
    }>()

    const formatNumber = (num: number) => {
        return new Intl.NumberFormat('th-TH').format(num)
    }
</script>

<template>
    <div
        class="bg-white rounded-2xl shadow-sm ring-1 ring-gray-100 p-6 flex flex-col relative overflow-hidden"
    >
        <div class="flex justify-between items-start mb-4">
            <div>
                <h3 class="font-bold text-gray-900">รายการบิลล่าสุด</h3>
                <p class="text-xs text-gray-500 mt-1">5 รายการล่าสุดจาก 412</p>
            </div>
            <UButton
                variant="ghost"
                class="text-xs font-bold hover:bg-indigo-50"
                trailing-icon="i-heroicons-chevron-right"
            >
                ดูทั้งหมด
            </UButton>
        </div>

        <div class="overflow-x-auto">
            <table class="w-full text-left text-sm border-collapse">
                <thead>
                    <tr class="border-b border-gray-100 text-xs font-semibold text-gray-400">
                        <th class="pb-3 px-2">เลขที่</th>
                        <th class="pb-3 px-2">ลูกค้า</th>
                        <th class="pb-3 px-2">บริการ</th>
                        <th class="pb-3 px-2 text-right">ยอด</th>
                        <th class="pb-3 px-2 text-center">วิธีชำระ</th>
                        <th class="pb-3 px-2 text-right">เวลา</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-50">
                    <tr
                        v-for="bill in bills"
                        :key="bill.id"
                        class="hover:bg-slate-50/50 transition-colors"
                    >
                        <td class="py-3 px-2 font-semibold text-indigo-600">{{ bill.id }}</td>
                        <td class="py-3 px-2">
                            <div class="flex items-center gap-2">
                                <div
                                    class="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
                                    :class="bill.color"
                                >
                                    {{ bill.initial }}
                                </div>
                                <span class="font-medium text-gray-800">{{ bill.customer }}</span>
                            </div>
                        </td>
                        <td class="py-3 px-2 text-gray-600">{{ bill.service }}</td>
                        <td class="py-3 px-2 text-right font-bold text-gray-900">
                            ฿{{ formatNumber(bill.amount) }}
                        </td>
                        <td class="py-3 px-2 text-center">
                            <UBadge :class="bill.paymentColor" variant="subtle" size="xs">{{
                                bill.payment
                            }}</UBadge>
                        </td>
                        <td class="py-3 px-2 text-right text-gray-500 text-xs font-medium">
                            {{ bill.time }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
