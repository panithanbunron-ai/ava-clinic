<script setup lang="ts">
defineProps<{
    title: string
    icon: string
    gradient: string
}>()
</script>

<template>
    <button
        class="quick-action-card"
        :style="{ background: gradient }"
        data-testid="quick-action-card"
        type="button"
    >
        <div class="action-icon-wrap">
            <UIcon :name="icon" class="action-icon" />
        </div>
        <span class="action-title">{{ title }}</span>
    </button>
</template>

<style scoped>
.quick-action-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 14px;
    padding: 28px 16px;
    border-radius: 20px;
    border: none;
    cursor: pointer;
    width: 100%;
    transition: transform 0.15s, box-shadow 0.15s;
    box-shadow: 0 4px 20px rgba(0,0,0,0.12);
}
.quick-action-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 28px rgba(0,0,0,0.18);
}
.quick-action-card:active {
    transform: translateY(0);
}

.action-icon-wrap {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    background: rgba(255,255,255,0.25);
    display: flex;
    align-items: center;
    justify-content: center;
}
.action-icon {
    width: 26px;
    height: 26px;
    color: white;
}
.action-title {
    font-size: 13px;
    font-weight: 600;
    color: white;
    text-align: center;
    line-height: 1.3;
}
</style>
