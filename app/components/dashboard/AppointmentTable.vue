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

    const statusStyle: Record<string, { bg: string; color: string }> = {
        สำเร็จ: { bg: '#dcfce7', color: '#16a34a' },
        กำลังรับ: { bg: '#fef9c3', color: '#ca8a04' },
        รอดำเนินการ: { bg: '#eff6ff', color: '#3b82f6' },
        ยกเลิก: { bg: '#fee2e2', color: '#ef4444' }
    }

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
    <div class="appt-table" data-testid="appointment-table">
        <!-- Header -->
        <div class="table-header">
            <div class="table-title-wrap">
                <div class="title-bar" />
                <h3 class="table-title">ตารางนัดหมายวันนี้</h3>
            </div>
            <button class="see-all-btn" type="button">ดูทั้งหมด</button>
        </div>

        <!-- Loading -->
        <div v-if="status === 'pending'" class="table-loading">
            <div class="loading-spinner" />
        </div>

        <!-- Table -->
        <table v-else class="appt-tbl">
            <thead>
                <tr>
                    <th v-for="col in columns" :key="col.header as string">
                        {{ col.header }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="row in appointments" :key="row.time + row.customer">
                    <td class="td-time">{{ row.time }}</td>
                    <td>{{ row.customer }}</td>
                    <td>{{ row.service }}</td>
                    <td>
                        <span
                            class="status-badge"
                            :style="{
                                background: statusStyle[row.status]?.bg ?? '#f1f5f9',
                                color: statusStyle[row.status]?.color ?? '#64748b'
                            }"
                        >
                            {{ row.status }}
                        </span>
                    </td>
                </tr>
                <tr v-if="!appointments?.length">
                    <td colspan="4" class="td-empty">ไม่มีข้อมูลนัดหมาย</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
    .appt-table {
        background: white;
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
        border: 1px solid #f1f5f9;
    }

    /* Header */
    .table-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 18px 22px 14px;
        border-bottom: 1px solid #f1f5f9;
    }
    .table-title-wrap {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    .title-bar {
        width: 4px;
        height: 20px;
        background: linear-gradient(180deg, #4f46e5, #7c3aed);
        border-radius: 4px;
    }
    .table-title {
        font-size: 15px;
        font-weight: 700;
        color: #1e293b;
        margin: 0;
    }
    .see-all-btn {
        font-size: 13px;
        font-weight: 600;
        color: #4f46e5;
        background: none;
        border: none;
        cursor: pointer;
        padding: 4px 8px;
        border-radius: 6px;
        transition: background 0.15s;
    }
    .see-all-btn:hover {
        background: #ede9fe;
    }

    /* Loading */
    .table-loading {
        display: flex;
        justify-content: center;
        padding: 40px;
    }
    .loading-spinner {
        width: 28px;
        height: 28px;
        border: 3px solid #e2e8f0;
        border-top-color: #4f46e5;
        border-radius: 50%;
        animation: spin 0.7s linear infinite;
    }
    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }

    /* Table */
    .appt-tbl {
        width: 100%;
        border-collapse: collapse;
    }
    .appt-tbl thead tr {
        background: #f8fafc;
    }
    .appt-tbl th {
        padding: 11px 22px;
        text-align: left;
        font-size: 12px;
        font-weight: 600;
        color: #94a3b8;
        letter-spacing: 0.3px;
        text-transform: uppercase;
    }
    .appt-tbl tbody tr {
        border-top: 1px solid #f8fafc;
        transition: background 0.12s;
    }
    .appt-tbl tbody tr:hover {
        background: #fafafe;
    }
    .appt-tbl td {
        padding: 13px 22px;
        font-size: 13.5px;
        color: #374151;
    }
    .td-time {
        font-weight: 700;
        color: #1e293b;
        white-space: nowrap;
    }
    .td-empty {
        text-align: center;
        color: #94a3b8;
        padding: 32px;
    }

    /* Status badge */
    .status-badge {
        display: inline-block;
        padding: 3px 10px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 600;
    }
</style>
