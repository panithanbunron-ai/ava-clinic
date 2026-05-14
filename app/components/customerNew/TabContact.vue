<script setup lang="ts">
defineProps<{ form: any }>()
</script>

<template>
    <div class="space-y-10 max-w-4xl mx-auto">
        <!-- Address Section -->
        <div class="space-y-6">
            <div class="flex justify-between items-end border-b border-gray-100 pb-3">
                <div>
                    <h2 class="text-lg font-bold text-gray-800 flex items-center gap-2">
                        <UIcon name="i-heroicons-home" class="w-5 h-5 text-blue-500" />
                        ที่อยู่ตามทะเบียนบ้าน
                    </h2>
                    <p class="text-xs text-gray-400 mt-1">รายละเอียดที่อยู่สำหรับจัดส่งเอกสารและเวชระเบียน</p>
                </div>
                <UButton size="sm" color="blue" variant="soft" class="rounded-lg shadow-sm font-medium hover:bg-blue-100 transition-all">
                    <template #leading>
                        <UIcon name="i-heroicons-document-duplicate" class="w-4 h-4" />
                    </template>
                    ดึงจากบัตรประชาชน
                </UButton>
            </div>
            
            <div class="bg-white rounded-2xl p-6 ring-1 ring-gray-200 shadow-sm space-y-6">
                <UFormGroup label="ที่อยู่ (เลขที่ / หมู่ / ซอย / ถนน)" class="font-medium text-gray-700">
                    <UTextarea v-model="form.address" placeholder="เช่น 125/4 หมู่ 5 ซอยพหลโยธิน 24 ถ.พหลโยธิน" :rows="3" size="lg" :ui="{ rounded: 'rounded-xl', base: 'bg-slate-50 focus:bg-white transition-colors' }" />
                </UFormGroup>
                
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
                    <UFormGroup label="จังหวัด" class="font-medium text-gray-700">
                        <USelectMenu v-model="form.province" :options="['กรุงเทพมหานคร', 'เชียงใหม่', 'ภูเก็ต']" placeholder="เลือกจังหวัด" size="lg" :ui="{ rounded: 'rounded-xl' }" />
                    </UFormGroup>
                    <UFormGroup label="อำเภอ / เขต" class="font-medium text-gray-700">
                        <USelectMenu v-model="form.district" :options="['จตุจักร', 'บางเขน', 'ลาดพร้าว']" placeholder="เลือกอำเภอ" size="lg" :ui="{ rounded: 'rounded-xl' }" />
                    </UFormGroup>
                    <UFormGroup label="ตำบล / แขวง" class="font-medium text-gray-700">
                        <USelectMenu v-model="form.subDistrict" :options="['ลาดยาว', 'จันทรเกษม']" placeholder="เลือกตำบล" size="lg" :ui="{ rounded: 'rounded-xl' }" />
                    </UFormGroup>
                    <UFormGroup label="รหัสไปรษณีย์" class="font-medium text-gray-700">
                        <UInput v-model="form.zipcode" placeholder="เช่น 10900" size="lg" :ui="{ rounded: 'rounded-xl' }" />
                    </UFormGroup>
                </div>
            </div>
        </div>
        
        <!-- Contact Section -->
        <div class="space-y-6 pt-4">
            <div class="border-b border-gray-100 pb-3">
                <h2 class="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <UIcon name="i-heroicons-device-phone-mobile" class="w-5 h-5 text-indigo-500" />
                    ช่องทางติดต่อ
                </h2>
                <p class="text-xs text-gray-400 mt-1">เบอร์โทรศัพท์และช่องทางติดต่อทางออนไลน์</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white rounded-2xl p-6 ring-1 ring-gray-200 shadow-sm">
                <UFormGroup required class="font-medium text-gray-700">
                    <template #label>
                        เบอร์มือถือ <span class="text-red-500">*</span>
                    </template>
                    <UInput v-model="form.mobile" placeholder="08X-XXX-XXXX" icon="i-heroicons-phone" size="lg" :ui="{ rounded: 'rounded-xl' }" class="dark-input-premium" />
                </UFormGroup>
                <UFormGroup label="เบอร์บ้าน / สำรอง" class="font-medium text-gray-700">
                    <UInput v-model="form.homePhone" placeholder="02-XXX-XXXX" icon="i-heroicons-phone" size="lg" :ui="{ rounded: 'rounded-xl' }" />
                </UFormGroup>
                <UFormGroup label="อีเมล" class="font-medium text-gray-700">
                    <UInput v-model="form.email" placeholder="name@example.com" icon="i-heroicons-envelope" size="lg" :ui="{ rounded: 'rounded-xl' }" />
                </UFormGroup>
                <UFormGroup label="Line ID" class="font-medium text-gray-700">
                    <UInput v-model="form.lineId" placeholder="line_id" size="lg" :ui="{ rounded: 'rounded-xl' }">
                        <template #leading>
                            <span class="text-emerald-500 font-black text-sm bg-emerald-50 px-2 py-0.5 rounded-md">@</span>
                        </template>
                    </UInput>
                </UFormGroup>
            </div>
        </div>
        
        <!-- Marketing Section -->
        <div class="space-y-6 pt-4">
            <div class="border-b border-gray-100 pb-3">
                <h2 class="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <UIcon name="i-heroicons-chart-pie" class="w-5 h-5 text-purple-500" />
                    การตลาด
                </h2>
                <p class="text-xs text-gray-400 mt-1">ข้อมูลเพื่อช่วยให้คลินิกวิเคราะห์และวัดผลแคมเปญได้ดียิ่งขึ้น</p>
            </div>
            
            <div class="bg-gradient-to-br from-purple-50/50 to-white rounded-2xl p-6 ring-1 ring-gray-200 shadow-sm space-y-8">
                <UFormGroup label="รู้จักคลินิกผ่านช่องทางใด?" class="font-medium text-gray-800">
                    <div class="flex flex-wrap gap-3 mt-3">
                        <button v-for="channel in ['Facebook', 'Instagram', 'TikTok', 'Google', 'เพื่อนแนะนำ', 'ผ่านหน้าร้าน']" :key="channel"
                            type="button"
                            class="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center shadow-sm"
                            :class="form.marketingChannels.includes(channel) 
                                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-blue-500/30 scale-105' 
                                : 'bg-white text-gray-600 ring-1 ring-gray-200 hover:bg-gray-50 hover:ring-gray-300'"
                            @click="form.marketingChannels.includes(channel) ? form.marketingChannels = form.marketingChannels.filter((c: string) => c !== channel) : form.marketingChannels.push(channel)"
                        >
                            <UIcon v-if="form.marketingChannels.includes(channel)" name="i-heroicons-check" class="w-4 h-4 mr-1.5" />
                            {{ channel }}
                        </button>
                        <button type="button" class="px-5 py-2.5 rounded-xl border-2 border-dashed border-gray-300 text-gray-500 font-semibold text-sm hover:bg-gray-50 hover:border-gray-400 transition-colors bg-white/50">
                            + ระบุช่องทางอื่น
                        </button>
                    </div>
                </UFormGroup>
                
                <UFormGroup label="ช่องทางที่ต้องการให้ติดต่อกลับ (สามารถเลือกได้มากกว่า 1)" class="font-medium text-gray-800">
                    <div class="flex flex-wrap gap-3 mt-3">
                        <button v-for="pref in ['Line', 'โทรศัพท์', 'SMS', 'อีเมล']" :key="pref"
                            type="button"
                            class="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center shadow-sm"
                            :class="form.contactPreference.includes(pref) 
                                ? 'bg-emerald-500 text-white shadow-emerald-500/30 scale-105' 
                                : 'bg-white text-gray-600 ring-1 ring-gray-200 hover:bg-gray-50 hover:ring-gray-300'"
                            @click="form.contactPreference.includes(pref) ? form.contactPreference = form.contactPreference.filter((c: string) => c !== pref) : form.contactPreference.push(pref)"
                        >
                            <UIcon v-if="form.contactPreference.includes(pref)" name="i-heroicons-check-circle" class="w-4 h-4 mr-1.5" />
                            {{ pref }}
                        </button>
                    </div>
                </UFormGroup>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Only apply dark background to mobile input as requested, keeping others clean */
:deep(.dark-input-premium input) {
    background-color: #1e293b;
    color: white;
    border: none;
    box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 0.1);
}
:deep(.dark-input-premium input::placeholder) {
    color: #64748b;
}
:deep(.dark-input-premium svg) {
    color: #94a3b8;
}
</style>
