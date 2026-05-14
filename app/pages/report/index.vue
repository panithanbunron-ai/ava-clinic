<script lang="ts">
    import { useAuthStore } from '~/stores/auth';

    definePageMeta({
        layout: 'main',
        middleware: ['auth']
    })
</script>

<template>
    <p>
        Customer Report
    </p>
</template>
