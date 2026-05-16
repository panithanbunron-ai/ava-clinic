<script setup lang="ts">
    import { ref, reactive } from 'vue'

    definePageMeta({
        layout: 'main',
        middleware: ['auth']
    })

    const activeTab = ref(1)
    const isLoading = ref(false)

    const form = reactive({
        title: 'นาย',
        firstName: '',
        lastName: '',
        gender: 'ชาย',
        birthDate: '',
        idCard: '',

        address: '',
        province: '',
        district: '',
        subDistrict: '',
        zipcode: '',

        mobile: '',
        homePhone: '',
        email: '',
        lineId: '',

        marketingChannels: [] as string[],
        contactPreference: ['Line', 'โทรศัพท์'] as string[],

        bloodGroup: '',
        rh: '',
        treatmentRight: '',

        drugAllergies: ['Penicillin', 'Sulfa'] as string[],
        foodAllergies: ['ถั่ว'] as string[],
        chronicDiseases: ['ความดันสูง'] as string[],
        medicalNotes: '',

        customerType: 'ทั่วไป',
        caregiver: 'พิมลภา จันทร์เพ็ญ',
        memberBarcode: '',
        cashBarcode: '',
        memberExpiry: '',
        employeeId: '',

        occupation: '',
        education: '',
        companyName: '',
        companyAddress: ''
    })

    const tabs = [
        { id: 1, name: 'ข้อมูลทั่วไป', icon: 'i-heroicons-user' },
        { id: 2, name: 'ที่อยู่ & ติดต่อ', icon: 'i-heroicons-map-pin' },
        { id: 3, name: 'ข้อมูลสุขภาพ', icon: 'i-heroicons-heart' },
        { id: 4, name: 'เพิ่มเติม', suffix: '(ไม่บังคับ)', icon: 'i-heroicons-sparkles' }
    ]

    const nextTab = () => {
        if (activeTab.value < 4) activeTab.value++
    }

    const prevTab = () => {
        if (activeTab.value > 1) activeTab.value--
    }

    const saveCustomer = async () => {
        if (isLoading.value) return
        isLoading.value = true
        try {
            await $fetch('/api/customers', {
                method: 'POST',
                body: form
            })
            useToast().add({
                title: 'สำเร็จ',
                description: 'บันทึกลูกค้าใหม่เรียบร้อยแล้ว',
                icon: 'i-heroicons-check-circle'
            })
            setTimeout(() => {
                navigateTo('/customerInfo')
            }, 800)
        } catch (error) {
            isLoading.value = false
            useToast().add({
                title: 'ข้อผิดพลาด',
                description: 'ไม่สามารถบันทึกข้อมูลได้',
                icon: 'i-heroicons-x-circle'
            })
        }
    }
</script>

<template>
    <div class="p-4 md:p-8 max-w-6xl mx-auto min-h-screen bg-slate-50/50">
        <!-- Main Form Container -->
        <div
            class="bg-white rounded-3xl shadow-xl shadow-blue-900/5 ring-1 ring-gray-100 flex flex-col h-full overflow-hidden transition-all duration-300"
        >
            <!-- Dynamic Header with Gradient -->
            <div
                class="px-8 py-8 border-b border-gray-100 flex justify-between items-start bg-gradient-to-b from-blue-50/50 to-white relative overflow-hidden"
            >
                <div
                    class="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"
                ></div>
                <div
                    class="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"
                ></div>

                <div class="flex items-center gap-5 relative z-10">
                    <div
                        class="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20 transform transition-transform hover:scale-105 duration-300"
                    >
                        <UIcon
                            v-if="activeTab === 1"
                            name="i-heroicons-user-plus"
                            class="w-7 h-7"
                        />
                        <UIcon v-else name="i-heroicons-user" class="w-7 h-7" />
                    </div>
                    <div>
                        <h1
                            class="text-2xl font-extrabold text-gray-900 flex items-center gap-3 tracking-tight"
                        >
                            เพิ่มลูกค้าใหม่
                            <UBadge
                                v-if="activeTab > 1 && form.firstName"
                                class="rounded-full px-3 py-1 font-semibold"
                            >
                                {{ form.firstName }} {{ form.lastName }}
                            </UBadge>
                        </h1>
                        <p class="text-sm text-gray-500 mt-1.5 font-medium flex items-center gap-2">
                            <template v-if="activeTab === 1">
                                <UIcon
                                    name="i-heroicons-information-circle"
                                    class="w-4 h-4 text-blue-500"
                                />
                                กรอกข้อมูลพื้นฐานก่อน · ส่วนที่เหลือเพิ่มเติมภายหลังได้
                            </template>
                            <template v-else>
                                <span
                                    class="text-blue-600 font-semibold bg-blue-50 px-2 py-0.5 rounded-md"
                                    >CN-00184</span
                                >
                                <span class="text-gray-300">•</span> 35 ปี
                                <span class="text-gray-300">•</span> {{ form.gender }}
                            </template>
                        </p>
                    </div>
                </div>

                <div class="flex items-center gap-3 relative z-10">
                    <UButton
                        v-if="activeTab === 1"
                        variant="solid"
                        class="shadow-sm ring-1 ring-gray-200 transition-all rounded-2xl font-medium"
                    >
                        <template #leading>
                            <UIcon name="i-heroicons-identification" class="w-5 h-5" />
                        </template>
                        เสียบบัตรประชาชน
                    </UButton>
                    <UButton
                        variant="ghost"
                        icon="i-heroicons-x-mark"
                        class="rounded-full hover:bg-red-50 hover:text-red-500 transition-colors"
                        @click="navigateTo('/dashboard')"
                    />
                </div>
            </div>

            <!-- Premium Stepper Tabs -->
            <div class="px-8 bg-white border-b border-gray-100/80">
                <div class="flex gap-2">
                    <div
                        v-for="tab in tabs"
                        :key="tab.id"
                        class="flex-1 py-5 flex items-center gap-3 relative cursor-pointer group transition-all"
                        @click="activeTab = tab.id"
                    >
                        <!-- Line connecting steps (background) -->
                        <div
                            v-if="tab.id < 4"
                            class="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-[2px] bg-gray-100 -mr-4 z-0"
                        ></div>

                        <!-- Icon & Number -->
                        <div
                            class="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-all duration-300 z-10 relative"
                            :class="[
                                activeTab === tab.id
                                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30 scale-110'
                                    : activeTab > tab.id
                                      ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                                      : 'bg-gray-50 text-gray-400 ring-1 ring-gray-200 group-hover:bg-gray-100 group-hover:text-gray-600'
                            ]"
                        >
                            <UIcon
                                v-if="activeTab > tab.id"
                                name="i-heroicons-check-16-solid"
                                class="w-5 h-5"
                            />
                            <span v-else>{{ tab.id }}</span>

                            <!-- Pulsing ring for active tab -->
                            <div
                                v-if="activeTab === tab.id"
                                class="absolute -inset-1.5 rounded-full border border-blue-400/30 animate-pulse"
                            ></div>
                        </div>

                        <!-- Text -->
                        <div class="flex flex-col z-10">
                            <span
                                class="text-sm font-bold transition-colors duration-200"
                                :class="
                                    activeTab === tab.id
                                        ? 'text-gray-900'
                                        : activeTab > tab.id
                                          ? 'text-emerald-700'
                                          : 'text-gray-500 group-hover:text-gray-700'
                                "
                            >
                                {{ tab.name }}
                            </span>
                            <span v-if="tab.suffix" class="text-[11px] font-medium text-gray-400">{{
                                tab.suffix
                            }}</span>
                        </div>

                        <!-- Red dot for required in Tab 1 -->
                        <div
                            v-if="tab.id === 1 && activeTab === 1"
                            class="absolute top-4 right-1/4 w-2 h-2 rounded-full bg-red-500 shadow-sm shadow-red-500/50"
                        ></div>

                        <!-- Active Bottom Line Indicator -->
                        <div
                            v-if="activeTab === tab.id"
                            class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-full"
                        ></div>
                    </div>
                </div>
            </div>

            <!-- Animated Body Wrapper -->
            <div class="p-8 flex-1 bg-[#fcfcfd] relative overflow-hidden">
                <ClientOnly>
                    <Transition name="fade" mode="out-in">
                        <CustomerNewTabGeneral v-if="activeTab === 1" key="tab1" :form="form" />
                        <CustomerNewTabContact
                            v-else-if="activeTab === 2"
                            key="tab2"
                            :form="form"
                        />
                        <CustomerNewTabHealth v-else-if="activeTab === 3" key="tab3" :form="form" />
                        <CustomerNewTabAdditional
                            v-else-if="activeTab === 4"
                            key="tab4"
                            :form="form"
                        />
                    </Transition>
                    <template #fallback>
                        <div class="flex h-64 items-center justify-center">
                            <UIcon
                                name="i-heroicons-arrow-path"
                                class="w-10 h-10 animate-spin text-blue-500"
                            />
                        </div>
                    </template>
                </ClientOnly>
            </div>

            <!-- Refined Footer -->
            <div
                class="px-8 py-5 border-t border-gray-100 flex items-center justify-between bg-white/80 backdrop-blur-md rounded-b-3xl"
            >
                <!-- Progress Bar -->
                <div class="flex items-center gap-5">
                    <div class="flex gap-2">
                        <div
                            v-for="i in 4"
                            :key="i"
                            class="h-2 rounded-full transition-all duration-500"
                            :class="[
                                i === activeTab
                                    ? 'w-10 bg-gradient-to-r from-blue-600 to-indigo-600 shadow-sm shadow-blue-500/20'
                                    : i < activeTab
                                      ? 'w-6 bg-emerald-400'
                                      : 'w-6 bg-gray-100'
                            ]"
                        ></div>
                    </div>
                    <div class="text-sm text-gray-500 font-bold tracking-wide">
                        ขั้นตอนที่ <span class="text-gray-900">{{ activeTab }}</span> / 4
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="flex gap-4">
                    <template v-if="activeTab === 1">
                        <UButton
                            variant="ghost"
                            class="px-6 rounded-xl hover:bg-gray-100 font-medium"
                            @click="navigateTo('/dashboard')"
                            >ยกเลิก</UButton
                        >
                        <UButton
                            variant="solid"
                            class="px-6 rounded-xl shadow-sm ring-1 ring-gray-200 hover:bg-gray-50 font-medium text-gray-700"
                            >บันทึกร่าง</UButton
                        >
                        <UButton
                            variant="solid"
                            class="px-8 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md shadow-blue-500/20 font-bold transition-transform hover:-translate-y-0.5"
                            @click="nextTab"
                        >
                            ถัดไป
                            <UIcon name="i-heroicons-arrow-right-20-solid" class="w-5 h-5 ml-1.5" />
                        </UButton>
                    </template>
                    <template v-else-if="activeTab < 4">
                        <UButton
                            variant="solid"
                            class="px-6 rounded-xl shadow-sm ring-1 ring-gray-200 hover:bg-gray-50 font-medium text-gray-700 transition-transform hover:-translate-y-0.5"
                            @click="prevTab"
                        >
                            <UIcon name="i-heroicons-arrow-left-20-solid" class="w-5 h-5 mr-1.5" />
                            ย้อนกลับ
                        </UButton>
                        <UButton
                            variant="ghost"
                            class="px-6 rounded-xl hover:bg-gray-100 font-medium text-gray-500"
                            @click="nextTab"
                            >ข้าม</UButton
                        >
                        <UButton
                            variant="solid"
                            class="px-8 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md shadow-blue-500/20 font-bold transition-transform hover:-translate-y-0.5"
                            @click="nextTab"
                        >
                            ถัดไป
                            <UIcon name="i-heroicons-arrow-right-20-solid" class="w-5 h-5 ml-1.5" />
                        </UButton>
                    </template>
                    <template v-else>
                        <UButton
                            variant="solid"
                            class="px-6 rounded-xl shadow-sm ring-1 ring-gray-200 hover:bg-gray-50 font-medium text-gray-700 transition-transform hover:-translate-y-0.5"
                            @click="prevTab"
                        >
                            <UIcon name="i-heroicons-arrow-left-20-solid" class="w-5 h-5 mr-1.5" />
                            ย้อนกลับ
                        </UButton>
                        <UButton
                            variant="solid"
                            class="px-8 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-md shadow-emerald-500/20 font-bold transition-transform hover:-translate-y-0.5"
                            :loading="isLoading"
                            @click="saveCustomer"
                        >
                            <UIcon
                                v-if="!isLoading"
                                name="i-heroicons-check-circle-20-solid"
                                class="w-5 h-5 mr-1.5"
                            />
                            บันทึกลูกค้า
                        </UButton>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .fade-enter-active,
    .fade-leave-active {
        transition:
            opacity 0.25s ease,
            transform 0.25s ease;
    }
    .fade-enter-from {
        opacity: 0;
        transform: translateY(10px);
    }
    .fade-leave-to {
        opacity: 0;
        transform: translateY(-10px);
    }
</style>
