<script setup lang="ts">
    import { computed } from 'vue'
    import { useRoute } from 'vue-router'

    const route = useRoute()

    interface MenuInfo {
        parent: string
        child: string
        icon?: string
    }

    // Define route categories and page titles
    const routeMap: Record<string, MenuInfo> = {
        '/dashboard': { parent: 'เมนูหลัก', child: 'หน้าแรก', icon: 'i-lucide-home' },
        '/customerNew': { parent: 'เมนูหลัก', child: 'เพิ่มลูกค้าใหม่', icon: 'i-lucide-user-plus' },
        '/customerInfo': { parent: 'เมนูหลัก', child: 'ข้อมูลลูกค้า', icon: 'i-lucide-users' },
        '/reports': { parent: 'เมนูหลัก', child: 'รายงาน', icon: 'i-lucide-bar-chart-2' },
        '/teleconsult': { parent: 'เมนูหลัก', child: 'Teleconsult', icon: 'i-lucide-video' },
        '/settings': { parent: 'ระบบ', child: 'ตั้งค่า', icon: 'i-lucide-settings' },
        '/search': { parent: 'ระบบ', child: 'ค้นหา', icon: 'i-lucide-search' }
    }

    const currentMenu = computed((): MenuInfo => {
        // If exact match is found
        const exactMatch = routeMap[route.path]
        if (exactMatch) {
            return exactMatch
        }
        
        // Fallback: search for partial matches (e.g., /customerInfo/123)
        const matchedKey = Object.keys(routeMap).find(key => 
            key !== '/' && route.path.startsWith(key)
        )
        if (matchedKey) {
            const partialMatch = routeMap[matchedKey]
            if (partialMatch) {
                return partialMatch
            }
        }
        
        // Default fallback
        return { parent: 'เมนูหลัก', child: 'หน้าแรก', icon: 'i-lucide-home' }
    })
</script>

<template>
    <header
        class="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-6 fixed top-0 left-[255px] right-0 z-40"
    >
        <div class="flex items-center text-sm gap-2">
            <span class="text-gray-400 font-medium transition-all duration-300">{{ currentMenu.parent }}</span>
            <UIcon name="i-lucide-chevron-right" class="w-4 h-4 text-gray-400" />
            <div class="flex items-center gap-1.5 font-semibold text-gray-800 bg-gray-50 px-2.5 py-1 rounded-lg ring-1 ring-gray-200/50 transition-all duration-300">
                <UIcon v-if="currentMenu.icon" :name="currentMenu.icon" class="w-4 h-4 text-primary-500" />
                <span class="text-xs tracking-wider uppercase">{{ currentMenu.child }}</span>
            </div>
        </div>

        <div class="flex items-center gap-4">
            <div class="flex items-center bg-gray-100 rounded-full p-1 text-xs font-semibold">
                <button
                    class="px-3 py-1 rounded-full bg-white text-gray-800 shadow-sm"
                    data-testid="lang-th"
                >
                    TH
                </button>
                <button
                    class="px-3 py-1 rounded-full text-gray-400 hover:text-gray-600"
                    data-testid="lang-en"
                >
                    EN
                </button>
            </div>

            <button
                class="text-gray-400 hover:text-gray-600 transition-colors"
                data-testid="btn-global"
            >
                <UIcon name="i-lucide-globe" class="w-5 h-5" />
            </button>

            <div class="relative">
                <button
                    class="text-gray-400 hover:text-gray-600 transition-colors mt-1"
                    data-testid="btn-notification"
                >
                    <UIcon name="i-lucide-bell" class="w-5 h-5" />
                </button>
                <span
                    class="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"
                ></span>
            </div>

            <button
                class="text-gray-400 hover:text-gray-600 transition-colors"
                data-testid="btn-help"
            >
                <UIcon name="i-lucide-help-circle" class="w-5 h-5" />
            </button>
        </div>
    </header>
</template>
