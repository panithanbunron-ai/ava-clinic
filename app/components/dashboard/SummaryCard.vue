<script setup lang="ts">
    defineProps<{
        title: string
        value: string | number
        description: string
        icon: string
        iconColor: string
        iconBg: string
    }>()
</script>

<template>
    <div class="summary-card" data-testid="summary-card">
        <div class="card-top">
            <div class="card-title">{{ title }}</div>
            <div class="card-icon-wrap" :style="{ background: iconBg }">
                <UIcon :name="icon" class="card-icon" :style="{ color: iconColor }" />
            </div>
        </div>
        <div class="card-value">{{ value }}</div>
        <div class="card-description">
            <slot name="description">{{ description }}</slot>
        </div>
    </div>
</template>

<style scoped>
    .summary-card {
        background: white;
        border-radius: 16px;
        padding: 20px 22px;
        display: flex;
        flex-direction: column;
        gap: 6px;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
        border: 1px solid #f1f5f9;
        transition: box-shadow 0.2s;
    }
    .summary-card:hover {
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    .card-top {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
    }
    .card-title {
        font-size: 13px;
        font-weight: 500;
        color: #64748b;
    }
    .card-icon-wrap {
        width: 38px;
        height: 38px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
    }
    .card-icon {
        width: 20px;
        height: 20px;
    }
    .card-value {
        font-size: 30px;
        font-weight: 800;
        color: #1e293b;
        line-height: 1.1;
        margin-top: 4px;
    }
    .card-description {
        font-size: 12px;
        color: #94a3b8;
        display: flex;
        align-items: center;
        gap: 4px;
        min-height: 18px;
    }
</style>
