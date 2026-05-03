<script setup lang="ts">
    import type { TableColumn } from '@nuxt/ui'

    type Appointment = {
        id: number
        time: string
        customer: string
        service: string
        status: string
        badgeColor: 'success' | 'info' | 'warning' | 'error' | 'neutral'
    }

    const columns: TableColumn<Appointment>[] = [
        { accessorKey: 'time', header: 'เวลา' },
        { accessorKey: 'customer', header: 'ชื่อลูกค้า' },
        { accessorKey: 'service', header: 'บริการ' },
        { accessorKey: 'status', header: 'สถานะ' }
    ]

    const appointments: Appointment[] = [
        {
            id: 1,
            time: '09:00',
            customer: 'คุณนลินี แสงทอง',
            service: 'Botox Aestox 50u',
            status: 'สำเร็จ',
            badgeColor: 'success'
        },
        {
            id: 2,
            time: '10:30',
            customer: 'คุณวิไลพร มั่นคง',
            service: 'Meso Fat Face',
            status: 'กำลังรอ',
            badgeColor: 'info'
        },
        {
            id: 3,
            time: '14:00',
            customer: 'คุณธนภูมิ ยิ่งใหญ่',
            service: 'Pico Laser Full Face',
            status: 'นัดหมาย',
            badgeColor: 'neutral'
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

        <UTable :data="appointments" :columns="columns">
            <template #time-cell="{ row }">
                <span class="font-semibold text-blue-900">{{ row.original.time }}</span>
            </template>
            <template #status-cell="{ row }">
                <UBadge
                    :color="row.original.badgeColor"
                    variant="subtle"
                    size="xs"
                    class="rounded-full px-2 py-0.5"
                >
                    {{ row.original.status }}
                </UBadge>
            </template>
        </UTable>
    </div>
</template>
