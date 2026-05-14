<template>
    <div class="min-h-screen bg-slate-50">
        <LayoutSidebar />
        <LayoutHeaderBar />
        <main class="ml-[224px] pt-16 min-h-screen overflow-y-auto p-6 lg:p-8 mt-10">
            <slot />
        </main>
    </div>
</template>
