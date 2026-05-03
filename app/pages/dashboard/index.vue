<script setup lang="ts">
    import { useAuthStore } from '~/stores/auth'

    definePageMeta({
        layout: 'main',
        middleware: ['auth']
    })

    const authStore = useAuthStore()
    const searchQuery = ref('')

    const quickActions = [
        {
            title: 'เพิ่มลูกค้าใหม่',
            icon: 'i-lucide-user-plus',
            bgColor: 'bg-blue-50/50',
            textColor: 'text-blue-600'
        },
        {
            title: 'ลงทะเบียน',
            icon: 'i-lucide-user-check',
            bgColor: 'bg-emerald-50/50',
            textColor: 'text-emerald-600'
        },
        {
            title: 'คิวรับบริการ',
            icon: 'i-lucide-clipboard-list',
            bgColor: 'bg-orange-50/50',
            textColor: 'text-orange-600'
        },
        {
            title: 'ปฏิทินนัดหมาย',
            icon: 'i-lucide-calendar',
            bgColor: 'bg-purple-50/50',
            textColor: 'text-purple-600'
        },
        {
            title: 'รับเข้าสินค้า',
            icon: 'i-lucide-package-plus',
            bgColor: 'bg-gray-50/50',
            textColor: 'text-gray-600'
        }
    ]

    const recentActivities = [
        {
            id: 1,
            title: 'เช็คอินลูกค้าใหม่',
            time: 'เมื่อ 10 นาทีที่แล้ว',
            border: 'border-emerald-500'
        },
        {
            id: 2,
            title: 'ออกใบเสร็จรับเงิน',
            time: 'เมื่อ 45 นาทีที่แล้ว',
            border: 'border-blue-500'
        }
    ]
</script>

<template>
    <div class="max-w-7xl mx-auto space-y-8">
        <!-- Clinic Header & Search -->
        <div class="flex flex-col items-center justify-center space-y-6 pt-4 pb-2">
            <div class="text-center">
                <h1 class="text-blue-600 font-medium text-lg">AVA CLINIC</h1>
                <p class="text-gray-500 text-sm mt-1">สาขาพระราม 9 | ศูนย์ความงามครบวงจร</p>
            </div>

            <div class="w-full max-w-2xl relative">
                <UIcon
                    name="i-lucide-search"
                    class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                />
                <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="ค้นหาลูกค้า ชื่อ, เบอร์โทร, HN..."
                    class="w-full pl-12 pr-4 py-3.5 rounded-full border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-700 bg-white"
                    data-testid="global-search"
                />
            </div>
        </div>

        <!-- Quick Actions -->
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <DashboardQuickActionCard
                v-for="(action, idx) in quickActions"
                :key="idx"
                :title="action.title"
                :icon="action.icon"
                :bg-color-class="action.bgColor"
                :text-color-class="action.textColor"
            />
        </div>

        <!-- Summaries -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <DashboardSummaryCard
                title="สินค้าหมดอายุ"
                value="12"
                description=""
                icon="i-lucide-alert-triangle"
                theme-color="red"
            >
                <template #description>
                    <UIcon name="i-lucide-trending-up" class="w-3 h-3" />
                    <span>+2 จากเมื่อวาน</span>
                </template>
            </DashboardSummaryCard>

            <DashboardSummaryCard
                title="ต้องสั่งซื้อเพิ่ม"
                value="5"
                description="รอการอนุมัติ"
                icon="i-lucide-shopping-cart"
                theme-color="yellow"
            />

            <DashboardSummaryCard
                title="นัดหมายวันนี้"
                value="8"
                description=""
                icon="i-lucide-calendar-days"
                theme-color="blue"
            >
                <template #description>
                    <UIcon name="i-lucide-clock" class="w-3 h-3" />
                    <span>นัดถัดไป 14:00 น.</span>
                </template>
            </DashboardSummaryCard>

            <DashboardSummaryCard
                title="LINE / เลื่อนนัด"
                value="3"
                description="รอการตอบกลับ"
                icon="i-lucide-message-square"
                theme-color="green"
            />
        </div>

        <!-- Main Content & Right Panel -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Left side (Table) -->
            <div class="lg:col-span-2 space-y-6">
                <DashboardAppointmentTable />
            </div>

            <!-- Right side (Announcements & Activities) -->
            <div class="space-y-6">
                <!-- Announcement Card -->
                <div
                    class="bg-blue-900 rounded-xl p-6 text-white relative overflow-hidden shadow-sm"
                    data-testid="announcement-card"
                >
                    <UIcon
                        name="i-lucide-megaphone"
                        class="absolute -right-4 -bottom-4 w-32 h-32 text-blue-800/50"
                    />
                    <div class="relative z-10">
                        <h3 class="text-blue-100 font-medium text-sm mb-3">ข่าวสารพนักงาน</h3>
                        <p class="text-white font-medium leading-relaxed mb-4">
                            ประกาศปรับปรุงระบบ Teleconsult ประจำเดือนพฤษภาคม 2567
                        </p>
                        <UButton
                            color="neutral"
                            variant="solid"
                            size="sm"
                            class="bg-white text-blue-900 font-semibold px-4 hover:bg-gray-50"
                        >
                            อ่านรายละเอียด
                        </UButton>
                    </div>
                </div>

                <!-- Recent Activities -->
                <div
                    class="bg-white rounded-xl shadow-sm border border-gray-100 p-5"
                    data-testid="recent-activities"
                >
                    <div class="flex justify-between items-center mb-5">
                        <h3 class="font-medium text-gray-800 text-sm">กิจกรรมล่าสุด</h3>
                        <UIcon name="i-lucide-history" class="w-4 h-4 text-gray-400" />
                    </div>

                    <div class="space-y-4">
                        <div
                            v-for="activity in recentActivities"
                            :key="activity.id"
                            class="pl-4 border-l-2"
                            :class="activity.border"
                        >
                            <p class="font-medium text-gray-900 text-sm">{{ activity.title }}</p>
                            <p class="text-xs text-gray-400 mt-0.5">{{ activity.time }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
