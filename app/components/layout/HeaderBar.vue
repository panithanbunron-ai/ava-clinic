<script setup lang="ts"></script>

<template>
    <header
        class="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-6 fixed top-0 left-[255px] right-0 z-40"
    >
        <div class="flex items-center text-sm">
            <span class="text-gray-400">หน้าแรก</span>
            <UIcon name="i-lucide-chevron-right" class="w-4 h-4 text-gray-400 mx-2" />
            <span class="font-semibold text-gray-800 tracking-widest text-xs uppercase"
                >Dashboard</span
            >
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
