<script setup lang="ts">
defineProps<{ form: any }>()
</script>

<template>
    <div class="space-y-10 max-w-4xl mx-auto">
        <!-- Type & Caregiver -->
        <div class="space-y-6">
            <div class="border-b border-gray-100 pb-3">
                <h2 class="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <UIcon name="i-heroicons-user-group" class="w-5 h-5 text-indigo-500" />
                    ประเภทลูกค้า & ผู้ดูแล
                </h2>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-2xl p-6 ring-1 ring-gray-200 shadow-sm">
                <UFormGroup label="กลุ่มประเภทลูกค้า" class="font-bold text-gray-800">
                    <div class="grid grid-cols-3 gap-3 mt-2">
                        <button v-for="type in ['ทั่วไป', 'VIP', 'Staff']" :key="type"
                            type="button"
                            class="py-3 rounded-xl text-sm font-bold transition-all shadow-sm flex flex-col items-center justify-center gap-1"
                            :class="form.customerType === type 
                                ? 'bg-gradient-to-b from-indigo-500 to-indigo-600 text-white shadow-indigo-500/30 scale-105' 
                                : 'bg-white ring-1 ring-gray-200 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 hover:ring-indigo-200'"
                            @click="form.customerType = type"
                        >
                            <UIcon :name="type === 'VIP' ? 'i-heroicons-star-solid' : (type === 'Staff' ? 'i-heroicons-briefcase-solid' : 'i-heroicons-user-solid')" class="w-5 h-5" :class="form.customerType === type ? 'text-indigo-200' : 'text-gray-400'" />
                            {{ type }}
                        </button>
                    </div>
                </UFormGroup>
                <UFormGroup label="พนักงานผู้ดูแล (Sales / CRM)" class="font-bold text-gray-800">
                    <div class="flex items-center gap-4 mt-2 p-3 bg-slate-50 ring-1 ring-slate-200 rounded-xl transition-all hover:bg-white hover:ring-indigo-300 hover:shadow-md cursor-pointer">
                        <div class="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 text-white flex items-center justify-center text-sm font-black shadow-inner shadow-white/20">PM</div>
                        <div class="flex-1">
                            <div class="text-sm font-bold text-gray-800">{{ form.caregiver }}</div>
                            <div class="text-xs text-gray-500 font-medium">Customer Relationship Manager</div>
                        </div>
                        <UButton color="gray" variant="ghost" icon="i-heroicons-arrows-right-left" size="xs" class="rounded-full" />
                    </div>
                </UFormGroup>
            </div>
        </div>
        
        <!-- Membership / Barcode -->
        <div class="space-y-6 pt-2">
            <div class="border-b border-gray-100 pb-3">
                <h2 class="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <UIcon name="i-heroicons-identification" class="w-5 h-5 text-blue-500" />
                    บัตรสมาชิก / บาร์โค้ด
                </h2>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white rounded-2xl p-6 ring-1 ring-gray-200 shadow-sm">
                <UFormGroup label="บาร์โค้ดสมาชิก" class="font-medium text-gray-700">
                    <div class="flex gap-2">
                        <UInput v-model="form.memberBarcode" placeholder="MEM-XXXXXXX" class="flex-1" size="lg" :ui="{ rounded: 'rounded-xl', icon: { leading: { pointer: '' } } }" icon="i-heroicons-qr-code" />
                        <UButton color="blue" variant="soft" icon="i-heroicons-camera" class="rounded-xl px-4" />
                    </div>
                </UFormGroup>
                <UFormGroup label="บาร์โค้ดบัตรแทนเงินสด" class="font-medium text-gray-700">
                    <div class="flex gap-2">
                        <UInput v-model="form.cashBarcode" placeholder="CASH-XXXXXXX" class="flex-1" size="lg" :ui="{ rounded: 'rounded-xl' }" icon="i-heroicons-currency-dollar" />
                        <UButton color="blue" variant="soft" icon="i-heroicons-camera" class="rounded-xl px-4" />
                    </div>
                </UFormGroup>
                <UFormGroup label="วันหมดอายุสมาชิก" class="font-medium text-gray-700">
                    <UInput v-model="form.memberExpiry" type="date" placeholder="DD/MM/YYYY" size="lg" :ui="{ rounded: 'rounded-xl' }" icon="i-heroicons-calendar" />
                </UFormGroup>
                <UFormGroup label="รหัสพนักงาน" description="(เฉพาะพนักงานคลิกนิก)" class="font-medium text-gray-700">
                    <UInput v-model="form.employeeId" placeholder="EMP-XXXX" size="lg" :ui="{ rounded: 'rounded-xl' }" icon="i-heroicons-user-circle" />
                </UFormGroup>
            </div>
        </div>
        
        <!-- Additional Info -->
        <div class="space-y-6 pt-2">
            <div class="border-b border-gray-100 pb-3">
                <h2 class="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <UIcon name="i-heroicons-academic-cap" class="w-5 h-5 text-emerald-500" />
                    ข้อมูลส่วนตัวเพิ่มเติม
                </h2>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white rounded-2xl p-6 ring-1 ring-gray-200 shadow-sm">
                <UFormGroup label="อาชีพ" class="font-medium text-gray-700">
                    <USelectMenu v-model="form.occupation" :options="['พนักงานบริษัท', 'ค้าขาย', 'ข้าราชการ/รัฐวิสาหกิจ', 'นักเรียน/นักศึกษา', 'อื่นๆ']" placeholder="เลือกอาชีพ" size="lg" :ui="{ rounded: 'rounded-xl' }" />
                </UFormGroup>
                <UFormGroup label="ระดับการศึกษา" class="font-medium text-gray-700">
                    <USelectMenu v-model="form.education" :options="['มัธยมศึกษา', 'ปริญญาตรี', 'ปริญญาโท', 'ปริญญาเอก', 'อื่นๆ']" placeholder="เลือกระดับการศึกษา" size="lg" :ui="{ rounded: 'rounded-xl' }" />
                </UFormGroup>
            </div>
        </div>
        
        <!-- Company Info Collapse -->
        <div class="pt-2">
            <div class="group bg-white ring-1 ring-gray-200 rounded-2xl transition-all duration-200 hover:shadow-md overflow-hidden">
                <div class="flex items-center justify-between p-5 cursor-pointer text-gray-700 hover:bg-slate-50/50 border-b border-gray-100">
                    <div class="flex items-center font-bold text-base">
                        <div class="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mr-4 group-hover:scale-105 transition-transform">
                            <UIcon name="i-heroicons-building-office-2" class="w-5 h-5" />
                        </div>
                        ข้อมูลสถานที่ทำงาน / บริษัท
                    </div>
                    <UIcon name="i-heroicons-chevron-down" class="w-5 h-5 text-gray-400 group-hover:text-purple-500 transition-colors" />
                </div>
                <div class="p-6 bg-slate-50/50 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <UFormGroup label="ชื่อบริษัท / สถานที่ทำงาน" class="font-medium text-gray-700">
                        <UInput v-model="form.companyName" placeholder="เช่น บริษัท เอบีซี จำกัด" size="lg" :ui="{ rounded: 'rounded-xl' }" icon="i-heroicons-building-storefront" />
                    </UFormGroup>
                    <UFormGroup label="ที่อยู่บริษัท" class="font-medium text-gray-700">
                        <UInput v-model="form.companyAddress" placeholder="ระบุที่อยู่สำนักงาน..." size="lg" :ui="{ rounded: 'rounded-xl' }" icon="i-heroicons-map" />
                    </UFormGroup>
                </div>
            </div>
        </div>
        
        <!-- Ready to Save Banner -->
        <div class="mt-10 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/60 rounded-2xl p-6 flex flex-col sm:flex-row items-center sm:items-start gap-5 shadow-lg shadow-emerald-900/5 relative overflow-hidden">
            <div class="absolute top-0 right-0 w-32 h-32 bg-emerald-400/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
            
            <div class="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-500/30">
                <UIcon name="i-heroicons-check-badge-solid" class="w-8 h-8" />
            </div>
            <div class="text-center sm:text-left">
                <div class="font-extrabold text-lg text-emerald-800 tracking-wide">พร้อมบันทึกลูกค้าใหม่เข้าสู่ระบบ</div>
                <div class="text-sm text-emerald-600/90 mt-1.5 font-medium leading-relaxed">
                    คุณได้กรอกข้อมูลสำคัญครบถ้วนแล้ว <span class="bg-emerald-200/50 px-2 py-0.5 rounded font-bold text-emerald-700">28 จาก 42 ฟิลด์</span> 
                    <br class="hidden sm:block" /> ส่วนที่เหลือสามารถเพิ่มเติมหรือแก้ไขได้ในหน้าโปรไฟล์ลูกค้าในภายหลัง
                </div>
            </div>
        </div>
    </div>
</template>
