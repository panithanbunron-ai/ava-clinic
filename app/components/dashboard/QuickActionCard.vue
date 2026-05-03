<script setup lang="ts">
    defineProps<{
        title: string
        icon: string
        bgColorClass: string
        textColorClass: string
    }>()
</script>

<template>
    <UCard
        as="button"
        :class="['border-transparent hover:border-gray-200 transition-all duration-200 cursor-pointer shadow-none hover:shadow-md', bgColorClass]"
        :ui="{ body: 'w-full flex flex-col items-center justify-center p-6' }"
        data-testid="quick-action-card"
    >
        <div
            class="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mx-auto mb-4"
        >
            <UIcon :name="icon" class="w-6 h-6" :class="textColorClass" />
        </div>
        <span class="font-medium text-sm block text-center" :class="textColorClass">{{ title }}</span>
    </UCard>
</template>
