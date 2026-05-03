<script setup lang="ts">
    defineProps<{
        title: string
        icon: string
        bgColorClass: string
        textColorClass: string
    }>()
</script>

<template>
    <button
        class="flex flex-col items-center justify-center p-6 rounded-xl border border-transparent hover:border-gray-200 hover:shadow-md transition-all duration-200"
        :class="bgColorClass"
        data-testid="quick-action-card"
    >
        <div
            class="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-4"
        >
            <UIcon :name="icon" class="w-6 h-6" :class="textColorClass" />
        </div>
        <span class="font-medium text-sm" :class="textColorClass">{{ title }}</span>
    </button>
</template>
