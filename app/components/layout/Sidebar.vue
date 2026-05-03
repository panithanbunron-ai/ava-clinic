<script setup lang="ts">
    import { useAuthStore } from '~/stores/auth'

    const authStore = useAuthStore()

    const menuItems = [
        { name: 'หน้าแรก', icon: 'i-lucide-home', to: '/dashboard', active: true },
        { name: 'ข้อมูลลูกค้า', icon: 'i-lucide-users', to: '#' },
        { name: 'คลังสินค้า', icon: 'i-lucide-package', to: '#' },
        { name: 'รายงาน', icon: 'i-lucide-bar-chart-2', to: '#' },
        { name: 'จุดบริการ', icon: 'i-lucide-activity', to: '#' },
        { name: 'Teleconsult', icon: 'i-lucide-video', to: '#', badge: 'BETA' },
    ]

    const systemItems = [{ name: 'ตั้งค่า', icon: 'i-lucide-settings', to: '#' }]

    const handleLogout = () => {
        authStore.logout()
        navigateTo('/')
    }
</script>

<template>
    <aside
        class="w-64 flex-shrink-0 border-r border-gray-200 bg-white flex flex-col h-screen fixed left-0 top-0"
    >
        <!-- Logo Area -->
        <div class="h-16 flex items-center px-6 pt-4">
            <div class="font-bold text-blue-600 text-xl tracking-wider">MCS CLOUD</div>
        </div>
        <div class="px-6 text-xs text-gray-400 font-medium tracking-widest mb-6">
            CLINIC MANAGEMENT
        </div>

        <!-- Main Menu -->
        <div class="flex-1 overflow-y-auto px-4">
            <div class="text-xs font-semibold text-gray-400 mb-2 px-2">เมนูหลัก</div>
            <nav class="space-y-1 mb-6">
                <NuxtLink
                    v-for="item in menuItems"
                    :key="item.name"
                    :to="item.to"
                    class="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors"
                    :class="
                        item.active
                            ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    "
                    data-testid="sidebar-link"
                >
                    <UIcon :name="item.icon" class="w-5 h-5" />
                    <span>{{ item.name }}</span>
                    <UBadge
                        v-if="item.badge"
                        color="warning"
                        variant="soft"
                        size="xs"
                        class="ml-auto text-[10px]"
                        >{{ item.badge }}</UBadge
                    >
                </NuxtLink>
            </nav>

            <div class="text-xs font-semibold text-gray-400 mb-2 px-2">ระบบ</div>
            <nav class="space-y-1">
                <NuxtLink
                    v-for="item in systemItems"
                    :key="item.name"
                    :to="item.to"
                    class="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                    data-testid="sidebar-system-link"
                >
                    <UIcon :name="item.icon" class="w-5 h-5" />
                    <span>{{ item.name }}</span>
                </NuxtLink>
            </nav>
        </div>

        <!-- User Profile Area -->
        <div class="p-4 border-t border-gray-200 mt-auto">
            <div
                class="flex items-center gap-3 cursor-pointer group"
                @click="handleLogout"
                data-testid="sidebar-logout"
            >
                <UAvatar
                    src="https://avatars.githubusercontent.com/u/739984?v=4"
                    alt="Avatar"
                    size="md"
                />
                <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900 truncate">
                        {{ authStore.user?.name || 'จิตราภรณ์' }}
                    </p>
                    <p class="text-xs text-gray-500 truncate">พนักงานต้อนรับ</p>
                </div>
            </div>
        </div>
    </aside>
</template>
