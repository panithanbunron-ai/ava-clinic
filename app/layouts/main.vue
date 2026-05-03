<template>
    <div class="min-h-screen bg-slate-50 flex">
        <LayoutSidebar />
        <div class="flex-1 flex flex-col ml-64 min-w-0">
            <LayoutHeaderBar />
            <main class="flex-1 overflow-y-auto p-6 lg:p-8">
                <slot />
            </main>
        </div>
    </div>
</template>
