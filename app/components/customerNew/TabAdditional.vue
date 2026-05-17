<script setup lang="ts">
    defineProps<{
        form: any
    }>()
</script>

<template>
    <div id="section-04" class="bg-white rounded-3xl p-6 border border-gray-100 shadow-xl shadow-slate-200/40 relative animate-fade-in">
        <!-- Section Header -->
        <div class="flex items-start justify-between mb-6 pb-4 border-b border-gray-50">
            <div class="flex items-center gap-3">
                <div class="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-xl font-black text-sm flex items-center justify-center shrink-0">
                    04
                </div>
                <div>
                    <h2 class="text-base md:text-lg font-black text-slate-800 tracking-tight">การยินยอม & การติดต่อ</h2>
                    <p class="text-xs font-semibold text-gray-400 mt-0.5">PDPA และช่องทางที่ลูกค้าอนุญาตให้ติดต่อ</p>
                </div>
            </div>
        </div>

        <!-- Switches List -->
        <div class="space-y-4">
            <div class="flex items-start justify-between p-3 border border-slate-100 rounded-2xl bg-slate-50/30">
                <div>
                    <h4 class="text-sm font-bold text-slate-800">ยินยอมให้เก็บข้อมูลส่วนบุคคล (PDPA)</h4>
                    <p class="text-xs text-gray-400 font-semibold mt-0.5">ลูกค้ายินยอมให้คลินิกเก็บและใช้ข้อมูลเพื่อการรักษา</p>
                </div>
                <USwitch v-model="form.pdpaConsent" color="primary" class="cursor-pointer" />
            </div>

            <div class="flex items-start justify-between p-3 border border-slate-100 rounded-2xl bg-slate-50/30">
                <div>
                    <h4 class="text-sm font-bold text-slate-800">ส่งโปรโมชั่น & ข่าวสารทาง LINE</h4>
                    <p class="text-xs text-gray-400 font-semibold mt-0.5">แจ้งสิทธิประโยชน์ผ่าน LINE OA</p>
                </div>
                <USwitch v-model="form.linePromoConsent" color="primary" class="cursor-pointer" />
            </div>

            <div class="flex items-start justify-between p-3 border border-slate-100 rounded-2xl bg-slate-50/30">
                <div>
                    <h4 class="text-sm font-bold text-slate-800">แจ้งเตือนนัดทาง SMS</h4>
                    <p class="text-xs text-gray-400 font-semibold mt-0.5">ส่ง SMS เตือนล่วงหน้า 24 ชั่วโมง</p>
                </div>
                <USwitch v-model="form.smsNoticeConsent" color="primary" class="cursor-pointer" />
            </div>
        </div>

        <!-- Autocomplete / Autofill instructions banner -->
        <div class="bg-indigo-50/40 border border-indigo-100 rounded-2xl p-4 flex gap-3 text-indigo-900 text-xs md:text-sm mt-6 shadow-sm">
            <UIcon name="i-lucide-info" class="w-5 h-5 shrink-0 text-indigo-500 mt-0.5" />
            <div class="leading-relaxed font-semibold">
                <span class="text-indigo-800 font-black">เคล็ดลับ: สแกนบัตรประชาชน</span>
                <p class="text-xs text-indigo-900/70 mt-1 font-bold">
                    กดปุ่ม "สแกนบัตรประชาชน" ที่มุมขวาบน — ระบบจะเติมชื่อ, เลขบัตร, วันเกิด, ที่อยู่ และรูปถ่ายให้อัตโนมัติ ช่วยลดเวลาพิมพ์ลง 70%
                </p>
            </div>
        </div>
    </div>
</template>
