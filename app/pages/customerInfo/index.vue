<script setup lang="ts">
    definePageMeta({
        layout: 'main',
        middleware: ['auth']
    })
</script>

<template>
    <div class="p-4 md:p-8 max-w-6xl mx-auto min-h-screen bg-slate-50/50">
        <!-- Main Container matching customerNew spacing & styles -->
        <div class="bg-white rounded-3xl shadow-xl shadow-blue-900/5 ring-1 ring-gray-100 flex flex-col h-full overflow-hidden">
            <!-- Header Component -->
            <CustomerInfoHeader />

            <!-- Toolbar (Search & Filters) Component -->
            <CustomerInfoToolbar />

            <!-- Main Table Component -->
            <CustomerInfoTable />

            <!-- Pagination Component -->
            <CustomerInfoPagination />
        </div>
    </div>
</template>
