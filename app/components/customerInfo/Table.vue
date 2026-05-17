<script setup lang="ts">
    const { data, pending } = await useFetch('/api/customers')
    const customers = computed(() => data.value?.data?.items || [])
</script>

<template>
    <div class="overflow-x-auto min-h-[400px]">
        <table class="w-full text-left border-collapse">
            <thead>
                <tr class="border-b border-gray-100 text-xs font-semibold text-gray-500 bg-white">
                    <th class="py-4 px-6 font-semibold w-12">#</th>
                    <th class="py-4 px-6 font-semibold">ลูกค้า</th>
                    <th class="py-4 px-6 font-semibold">HN / ปชช.</th>
                    <th class="py-4 px-6 font-semibold">ติดต่อ</th>
                    <th class="py-4 px-6 font-semibold">บันทึก</th>
                    <th class="py-4 px-6 font-semibold">วันที่</th>
                    <th class="py-4 px-6 font-semibold text-right">การจัดการ</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-50 bg-white relative">
                <!-- Loading State -->
                <tr
                    v-if="pending"
                    class="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex items-center justify-center"
                >
                    <td>
                        <UIcon
                            name="i-heroicons-arrow-path"
                            class="w-8 h-8 text-indigo-500 animate-spin"
                        />
                    </td>
                </tr>

                <!-- Data rows -->
                <tr
                    v-for="customer in customers"
                    :key="customer.id"
                    class="hover:bg-slate-50/50 transition-colors cursor-pointer"
                    @click="navigateTo(`/customerInfo/${customer.id}`)"
                >
                    <!-- Avatar / Initial -->
                    <td class="py-3 px-6">
                        <div
                            class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
                            :class="customer.avatarColor"
                        >
                            {{ customer.name[0] }}
                        </div>
                    </td>

                    <!-- Customer Details -->
                    <td class="py-3 px-6">
                        <div class="font-bold text-gray-900 text-sm flex items-center gap-2">
                            {{ customer.name }}
                            <!-- <UBadge v-for="tag in customer.tags" :key="tag" variant="subtle" size="xs">
                                {{ tag }}
                            </UBadge> -->
                        </div>
                        <div class="text-xs text-gray-500 mt-0.5">
                            {{ customer.age }} ปี • {{ customer.gender }}
                        </div>
                    </td>

                    <!-- IDs -->
                    <td class="py-3 px-6">
                        <div class="font-medium text-gray-800 text-sm">{{ customer.hn }}</div>
                        <div class="text-xs text-gray-500 mt-0.5">{{ customer.idCard }}</div>
                    </td>

                    <!-- Contact -->
                    <td class="py-3 px-6">
                        <div class="text-sm font-medium text-gray-800 flex items-center gap-1">
                            <UIcon name="i-heroicons-phone" class="w-3.5 h-3.5 text-gray-400" />
                            {{ customer.phone }}
                        </div>
                        <div class="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                            <UIcon
                                name="i-heroicons-chat-bubble-oval-left-ellipsis"
                                class="w-3.5 h-3.5 text-emerald-500"
                            />
                            {{ customer.lineId }}
                        </div>
                    </td>

                    <!-- Note -->
                    <td class="py-3 px-6">
                        <span
                            class="text-sm"
                            :class="
                                customer.note !== '-'
                                    ? 'text-rose-500 font-medium'
                                    : 'text-gray-400'
                            "
                        >
                            {{ customer.note }}
                        </span>
                    </td>

                    <!-- Date -->
                    <td class="py-3 px-6 text-sm text-gray-500">
                        {{ customer.createdAt }}
                    </td>

                    <!-- Actions -->
                    <td class="py-3 px-6 text-right">
                        <UButton
                            variant="ghost"
                            icon="i-heroicons-ellipsis-vertical"
                            class="rounded-full"
                        />
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
