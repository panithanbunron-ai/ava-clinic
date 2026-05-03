<script setup lang="ts">
    import type { TableColumn } from '@nuxt/ui'
    import { getAppointments, type Appointment } from '~/client/dashboard/appointments'
    import { useAuthStore } from '~/stores/auth'

    const authStore = useAuthStore()

    const columns: TableColumn<Appointment>[] = [
        { accessorKey: 'time', header: 'เวลา' },
        { accessorKey: 'customer', header: 'ชื่อลูกค้า' },
        { accessorKey: 'service', header: 'บริการ' },
        { accessorKey: 'status', header: 'สถานะ' }
    ]

    const getToken = () => {
        return authStore.token || ''
    }

    const { data: appointments, status } = await useAsyncData(
        'dashboard-appointments',
        async () => {
            const resp = await getAppointments(getToken())
            if (resp.status === 'success') {
                return resp.data
            }
            return []
        },
        { default: () => [] as Appointment[] }
    )
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

        <UTable :data="appointments" :columns="columns" :loading="status === 'pending'">
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
