<script setup lang="ts">
    defineProps<{
        title: string
        value: string | number
        description: string
        icon: string
        themeColor: 'red' | 'yellow' | 'blue' | 'green'
    }>()

    const colorMap = {
        red: {
            border: 'border-l-red-500',
            icon: 'text-red-500',
            desc: 'text-red-500'
        },
        yellow: {
            border: 'border-l-yellow-500',
            icon: 'text-yellow-500',
            desc: 'text-gray-500'
        },
        blue: {
            border: 'border-l-blue-600',
            icon: 'text-blue-500',
            desc: 'text-gray-600'
        },
        green: {
            border: 'border-l-emerald-500',
            icon: 'text-emerald-500',
            desc: 'text-emerald-600'
        }
    }
</script>

<template>
    <UCard
        :ui="{ root: 'border-l-4 ' + colorMap[themeColor].border }"
        class="shadow-sm flex flex-col justify-between"
        data-testid="summary-card"
    >
        <div class="flex justify-between items-start mb-4">
            <h3 class="text-gray-700 font-medium">{{ title }}</h3>
            <UIcon :name="icon" class="w-5 h-5" :class="colorMap[themeColor].icon" />
        </div>
        <div>
            <div class="text-2xl font-bold text-gray-900 mb-1">{{ value }}</div>
            <div
                class="text-xs font-medium flex items-center gap-1"
                :class="colorMap[themeColor].desc"
            >
                <slot name="description">
                    {{ description }}
                </slot>
            </div>
        </div>
    </UCard>
</template>
