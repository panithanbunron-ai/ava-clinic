<script setup lang="ts">
    import type { FormError, FormSubmitEvent } from '@nuxt/ui'

    defineProps<{ form: any }>()

    const state = reactive({
        email: undefined,
        password: undefined
    })

    type Schema = typeof state

    function validate(state: Partial<Schema>): FormError[] {
        const errors = []
        if (!state.email) errors.push({ name: 'email', message: 'Required' })
        if (!state.password) errors.push({ name: 'password', message: 'Required' })
        return errors
    }

    const toast = useToast()
    async function onSubmit(event: FormSubmitEvent<Schema>) {
        toast.add({
            title: 'Success',
            description: 'The form has been submitted.',
            color: 'success'
        })
        console.log(event.data)
    }

    const items = ref(['Backlog', 'Todo', 'In Progress', 'Done'])
    const value = ref('Backlog')
</script>

<template>
    <div class="flex flex-col lg:flex-row gap-10">
        <!-- Left Sidebar (Avatar & ID) -->
        <div class="w-full lg:w-[280px] shrink-0 space-y-6">
            <!-- Photo Upload Area -->
            <div
                class="group relative border-2 border-dashed border-gray-200 hover:border-blue-400 rounded-3xl p-8 flex flex-col items-center justify-center text-center gap-4 bg-white/50 hover:bg-blue-50/30 transition-all duration-300 h-[240px] shadow-sm hover:shadow-md cursor-pointer overflow-hidden"
            >
                <div
                    class="absolute inset-0 bg-gradient-to-b from-transparent to-blue-50/20 opacity-0 group-hover:opacity-100 transition-opacity"
                ></div>
                <div
                    class="w-16 h-16 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-100 transition-all duration-300 relative z-10 shadow-sm"
                >
                    <UIcon name="i-heroicons-camera" class="w-8 h-8" />
                </div>
                <div class="relative z-10">
                    <div
                        class="font-bold text-gray-700 group-hover:text-blue-700 transition-colors"
                    >
                        อัปโหลดรูปโปรไฟล์
                    </div>
                    <div class="text-xs text-gray-400 mt-1.5 font-medium">
                        รองรับ JPG, PNG (สูงสุด 2MB)
                    </div>
                </div>
            </div>

            <!-- Customer Code Banner -->
            <div
                class="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700 shadow-xl shadow-slate-900/10 relative overflow-hidden group"
            >
                <div
                    class="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"
                ></div>
                <div class="text-xs text-slate-400 mb-1 font-medium tracking-wide">
                    รหัสลูกค้า (Customer ID)
                </div>
                <div class="text-2xl font-black text-white tracking-wider font-mono">CN-00184</div>
                <div class="text-[10px] text-emerald-400 mt-2 flex items-center gap-1 font-medium">
                    <UIcon name="i-heroicons-check-circle-20-solid" class="w-3 h-3" />
                    ระบบสร้างรหัสอัตโนมัติ
                </div>
            </div>
        </div>

        <!-- Main Form -->
        <div class="flex-1 space-y-4">
            <div class="flex items-center gap-3 border-b border-gray-200 pb-4">
                <div
                    class="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600"
                >
                    <UIcon name="i-heroicons-identification" class="w-5 h-5" />
                </div>
                <h2 class="text-lg font-bold text-gray-900">ข้อมูลส่วนตัว</h2>
            </div>

            <!-- demo input -->
            <div>
                <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <UFormField label="Email" name="email">
                            <UInputMenu class="rounded-2xl" v-model="value" :items="items" />
                        </UFormField>

                        <UFormField label="Email" name="email">
                            <UInput class="flex" v-model="state.email" />
                        </UFormField>

                        <UFormField label="Password" name="password">
                            <UInput class="flex" v-model="state.password" type="password" />
                        </UFormField>

                        <UFormField label="Password" name="password">
                            <UInput class="flex" v-model="state.password" type="password" />
                        </UFormField>

                        <UFormField label="Password" name="password">
                            <UInput class="flex" v-model="state.password" type="password" />
                        </UFormField>

                        <UFormField label="Password" name="password">
                            <UInput class="flex" v-model="state.password" type="password" />
                        </UFormField>
                    </div>

                    <div>
                        <UFormField label="Password" name="password">
                            <UInput class="flex" v-model="state.password" type="password" />
                        </UFormField>

                        <div
                            class="flex items-center px-5 py-3 bg-emerald-50 text-emerald-700 rounded-xl text-sm font-bold border border-emerald-200/60 shadow-sm shrink-0"
                        >
                            <span class="relative flex h-2.5 w-2.5 mr-2.5">
                                <span
                                    class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
                                ></span>
                                <span
                                    class="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"
                                ></span>
                            </span>
                            ตรวจสอบแล้ว
                        </div>
                    </div>

                    <UButton type="submit"> Submit </UButton>
                </UForm>
            </div>

            <div
                class="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/60 rounded-2xl p-4 flex gap-3 text-amber-800 text-sm mt-8 shadow-sm"
            >
                <UIcon
                    name="i-heroicons-exclamation-triangle"
                    class="w-5 h-5 shrink-0 text-amber-500 mt-0.5"
                />
                <div class="font-medium leading-relaxed">
                    ฟิลด์ที่จำเป็นมีเครื่องหมาย
                    <span class="text-red-500 font-bold text-base">*</span>
                    <span class="text-amber-700/80 mx-1">·</span>
                    ข้อมูลส่วนที่เหลือสามารถกลับมาเพิ่มหรือแก้ไขได้ที่หน้า
                    <span class="font-bold underline decoration-amber-300 underline-offset-4"
                        >โปรไฟล์ลูกค้า</span
                    >
                    ในภายหลัง
                </div>
            </div>

            <!-- Accordions -->
            <div class="space-y-3 pt-6">
                <div
                    class="group bg-white ring-1 ring-gray-200 hover:ring-blue-300 rounded-2xl transition-all duration-200 hover:shadow-md overflow-hidden"
                >
                    <div
                        class="flex items-center justify-between p-4 cursor-pointer text-gray-700 hover:bg-slate-50/50"
                    >
                        <div class="flex items-center font-bold">
                            <div
                                class="w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform"
                            >
                                <UIcon name="i-heroicons-globe-alt" class="w-4 h-4" />
                            </div>
                            ข้อมูลภาษาอังกฤษ / Passport
                            <span
                                class="text-xs font-medium text-slate-400 ml-2 bg-slate-100 px-2 py-0.5 rounded-md hidden sm:inline-block"
                                >ลูกค้าต่างชาติ</span
                            >
                        </div>
                        <div
                            class="flex items-center text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full group-hover:bg-blue-100 transition-colors"
                        >
                            ขยาย
                            <UIcon name="i-heroicons-chevron-down" class="w-4 h-4 ml-1" />
                        </div>
                    </div>
                </div>

                <div
                    class="group bg-white ring-1 ring-gray-200 hover:ring-indigo-300 rounded-2xl transition-all duration-200 hover:shadow-md overflow-hidden"
                >
                    <div
                        class="flex items-center justify-between p-4 cursor-pointer text-gray-700 hover:bg-slate-50/50"
                    >
                        <div class="flex items-center font-bold">
                            <div
                                class="w-8 h-8 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform"
                            >
                                <UIcon name="i-heroicons-building-office-2" class="w-4 h-4" />
                            </div>
                            ข้อมูลบริษัท / ที่ทำงาน
                        </div>
                        <div
                            class="flex items-center text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full group-hover:bg-indigo-100 transition-colors"
                        >
                            ขยาย
                            <UIcon name="i-heroicons-chevron-down" class="w-4 h-4 ml-1" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
