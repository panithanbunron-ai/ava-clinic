<script setup lang="ts">
    definePageMeta({
        layout: 'main',
        middleware: ['auth']
    })

    const { data, pending } = await useFetch('/api/reports')
    const reportsData = computed(() => data.value?.data || null)
</script>

<template>
    <div class="p-4 md:p-8 max-w-6xl mx-auto min-h-screen bg-slate-50/50">
        <div
            class="bg-white rounded-3xl shadow-xl shadow-blue-900/5 ring-1 ring-gray-100 flex flex-col min-h-[80vh] overflow-hidden relative"
        >
            <div
                v-if="pending"
                class="absolute inset-0 bg-white/50 backdrop-blur-sm z-50 flex items-center justify-center"
            >
                <UIcon
                    name="i-heroicons-arrow-path"
                    class="w-10 h-10 text-indigo-600 animate-spin"
                />
            </div>

            <div v-if="reportsData" class="flex flex-col flex-1">
                <ReportsHeader />

                <div class="p-8 bg-[#fcfcfd] flex flex-col gap-6 flex-1">
                    <ReportsFilter />
                    <ReportsMetrics :metrics="reportsData.metrics" />
                    <ReportsCharts />

                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <ReportsLeaderboard
                            title="บริการขายดี"
                            subtitle="เรียงตามยอดขาย 14 วัน"
                            :items="reportsData.topServices"
                            type="service"
                        />
                        <ReportsLeaderboard
                            title="รายได้ตามเจ้าหน้าที่"
                            subtitle="ยอดที่ออกใบเสร็จ"
                            :items="reportsData.staffRevenue"
                            type="staff"
                        />
                    </div>

                    <ReportsRecentBills :bills="reportsData.recentBills" />
                </div>
            </div>
        </div>
    </div>
</template>
