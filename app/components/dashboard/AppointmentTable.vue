<script setup lang="ts">
    const appointments = [
        {
            id: 1,
            time: '09:00',
            customer: 'คุณนลินี แสงทอง',
            service: 'Botox Aestox 50u',
            status: 'สำเร็จ',
            badgeColor: 'success' as const
        },
        {
            id: 2,
            time: '10:30',
            customer: 'คุณวิไลพร มั่นคง',
            service: 'Meso Fat Face',
            status: 'กำลังรอ',
            badgeColor: 'info' as const
        },
        {
            id: 3,
            time: '14:00',
            customer: 'คุณธนภูมิ ยิ่งใหญ่',
            service: 'Pico Laser Full Face',
            status: 'นัดหมาย',
            badgeColor: 'neutral' as const
        }
    ]
</script>

<template>
    <div
        class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
        data-testid="appointment-table"
    >
        <div class="p-5 border-b border-gray-100 flex justify-between items-center">
            <h3 class="font-medium text-gray-800">ตารางนัดหมายวันนี้</h3>
            <button class="text-sm font-semibold text-blue-600 hover:text-blue-700">
                ดูทั้งหมด
            </button>
        </div>

        <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
                <thead>
                    <tr class="bg-gray-50/50">
                        <th class="px-5 py-3 text-sm font-medium text-gray-500 w-24">เวลา</th>
                        <th class="px-5 py-3 text-sm font-medium text-gray-500">ชื่อลูกค้า</th>
                        <th class="px-5 py-3 text-sm font-medium text-gray-500">บริการ</th>
                        <th class="px-5 py-3 text-sm font-medium text-gray-500 w-28">สถานะ</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                    <tr
                        v-for="row in appointments"
                        :key="row.id"
                        class="hover:bg-gray-50/50 transition-colors"
                    >
                        <td class="px-5 py-4 text-sm font-semibold text-blue-900">
                            {{ row.time }}
                        </td>
                        <td class="px-5 py-4 text-sm text-gray-800">{{ row.customer }}</td>
                        <td class="px-5 py-4 text-sm text-gray-800">{{ row.service }}</td>
                        <td class="px-5 py-4 text-sm">
                            <UBadge
                                :color="row.badgeColor"
                                variant="subtle"
                                size="xs"
                                class="rounded-full px-2 py-0.5"
                            >
                                {{ row.status }}
                            </UBadge>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
