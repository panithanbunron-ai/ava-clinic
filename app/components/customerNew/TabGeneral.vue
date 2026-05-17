<script setup lang="ts">
    defineProps<{
        form: any
        avatarInitials: string
        computedAge: number | null
        isIdCardValid: boolean
    }>()

    const toast = useAppToast()
</script>

<template>
    <div id="section-01" class="bg-white rounded-3xl p-6 border border-gray-100 shadow-xl shadow-slate-200/40 relative animate-fade-in">
        <!-- Section Header -->
        <div class="flex items-start justify-between mb-6 pb-4 border-b border-gray-50">
            <div class="flex items-center gap-3">
                <div class="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-xl font-black text-sm flex items-center justify-center shrink-0">
                    01
                </div>
                <div>
                    <h2 class="text-base md:text-lg font-black text-slate-800 tracking-tight">ข้อมูลพื้นฐาน</h2>
                    <p class="text-[11px] font-semibold text-gray-400 mt-0.5">ชื่อ-นามสกุล วันเกิด เลขประจำตัวประชาชน — สำหรับ HN และระบุตัวตน</p>
                </div>
            </div>
            <span class="text-[10px] font-bold text-gray-400 bg-slate-50 px-2 py-0.5 rounded-lg border border-slate-100">ฟิลด์บังคับ 5 ช่อง</span>
        </div>

        <!-- Profile Photo Selection area -->
        <div class="flex flex-col sm:flex-row gap-5 items-center p-4 border border-dashed border-indigo-100 rounded-2xl bg-indigo-50/10 mb-6">
            <!-- Abbreviation avatar inside light purple circle -->
            <div class="w-20 h-20 rounded-full bg-[#f0eaff] border border-indigo-100/50 flex items-center justify-center font-black text-2xl text-indigo-600 shrink-0 shadow-inner">
                {{ avatarInitials }}
            </div>
            <div class="flex-1 text-center sm:text-left">
                <h4 class="text-xs font-bold text-slate-700">รูปโปรไฟล์ลูกค้า</h4>
                <p class="text-[10px] text-gray-400 font-semibold mt-1">PNG / JPG ขนาดไม่เกิน 4 MB · แนะนำสี่เหลี่ยมจัตุรัส 400x400 px</p>
                <p class="text-[10px] text-gray-400/80 font-bold mt-0.5">หากไม่มี ระบบจะใช้อักษรย่อ {{ avatarInitials }} เป็นรูปแทน</p>
                
                <div class="flex items-center justify-center sm:justify-start gap-2 mt-3">
                    <button type="button" class="border border-gray-100 hover:border-gray-200 bg-white hover:bg-slate-50 text-slate-600 font-bold text-[10px] px-3 py-1.5 rounded-xl flex items-center gap-1 shadow-sm transition-all cursor-pointer" @click="toast.info('อัปโหลดไฟล์', 'เปิดกล่องอัปโหลดรูปภาพ')">
                        <UIcon name="i-lucide-upload" class="w-3.5 h-3.5" />
                        <span>เลือกไฟล์</span>
                    </button>
                    <button type="button" class="border border-gray-100 hover:border-gray-200 bg-white hover:bg-slate-50 text-slate-600 font-bold text-[10px] px-3 py-1.5 rounded-xl flex items-center gap-1 shadow-sm transition-all cursor-pointer" @click="toast.info('ถ่ายภาพ', 'เปิดใช้งานกล้องถ่ายรูป')">
                        <UIcon name="i-lucide-camera" class="w-3.5 h-3.5" />
                        <span>ถ่ายภาพ</span>
                    </button>
                    <button type="button" class="border border-rose-100 bg-rose-50 text-rose-500 hover:bg-rose-100 font-bold text-[10px] px-3 py-1.5 rounded-xl flex items-center gap-1 transition-all cursor-pointer" @click="toast.info('ลบรูปภาพ', 'ล้างรูปภาพเรียบร้อย')">
                        <UIcon name="i-lucide-trash-2" class="w-3.5 h-3.5" />
                        <span>ลบ</span>
                    </button>
                </div>
            </div>
        </div>

        <!-- Input Grid -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <!-- คำนำหน้า -->
            <div>
                <label class="block text-[11px] font-black text-slate-600 mb-1.5">คำนำหน้า <span class="text-rose-500">*</span></label>
                <select
                    v-model="form.title"
                    class="w-full bg-slate-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:bg-white focus:border-indigo-500 outline-none"
                >
                    <option>นางสาว</option>
                    <option>นาย</option>
                    <option>นาง</option>
                    <option>เด็กหญิง</option>
                    <option>เด็กชาย</option>
                </select>
            </div>

            <!-- ชื่อจริง -->
            <div class="md:col-span-2">
                <label class="block text-[11px] font-black text-slate-600 mb-1.5">ชื่อจริง <span class="text-rose-500">*</span></label>
                <input
                    v-model="form.firstName"
                    type="text"
                    placeholder="เช่น พิมลภา"
                    class="w-full bg-slate-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:bg-white focus:border-indigo-500 outline-none"
                />
            </div>

            <!-- นามสกุล -->
            <div>
                <label class="block text-[11px] font-black text-slate-600 mb-1.5">นามสกุล <span class="text-rose-500">*</span></label>
                <input
                    v-model="form.lastName"
                    type="text"
                    placeholder="เช่น จันทร์เพ็ญ"
                    class="w-full bg-slate-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:bg-white focus:border-indigo-500 outline-none"
                />
            </div>

            <!-- ชื่อเล่น -->
            <div>
                <label class="block text-[11px] font-black text-slate-600 mb-1.5">ชื่อเล่น <span class="text-gray-400 font-bold">(ไม่บังคับ)</span></label>
                <input
                    v-model="form.nickname"
                    type="text"
                    placeholder="เช่น พิบ"
                    class="w-full bg-slate-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:bg-white focus:border-indigo-500 outline-none"
                />
            </div>

            <!-- เพศ (Segmented custom cards) -->
            <div class="md:col-span-3">
                <label class="block text-[11px] font-black text-slate-600 mb-1.5">เพศ <span class="text-rose-500">*</span></label>
                <div class="grid grid-cols-3 gap-3">
                    <div
                        class="border-2 rounded-xl p-2.5 flex items-center justify-center gap-2 cursor-pointer transition-all shadow-sm"
                        :class="form.gender === 'หญิง' ? 'border-indigo-500 bg-indigo-50/20 text-indigo-700 font-bold' : 'border-gray-200 text-slate-500 hover:bg-slate-50'"
                        @click="form.gender = 'หญิง'"
                    >
                        <span class="w-4 h-4 rounded-full border flex items-center justify-center" :class="form.gender === 'หญิง' ? 'border-indigo-600 bg-indigo-600 text-white text-[8px]' : 'border-gray-300 bg-white'">
                            <span v-if="form.gender === 'หญิง'" class="w-1.5 h-1.5 rounded-full bg-white"></span>
                        </span>
                        <span class="text-xs">หญิง</span>
                    </div>
                    
                    <div
                        class="border-2 rounded-xl p-2.5 flex items-center justify-center gap-2 cursor-pointer transition-all shadow-sm"
                        :class="form.gender === 'ชาย' ? 'border-indigo-500 bg-indigo-50/20 text-indigo-700 font-bold' : 'border-gray-200 text-slate-500 hover:bg-slate-50'"
                        @click="form.gender = 'ชาย'"
                    >
                        <span class="w-4 h-4 rounded-full border flex items-center justify-center" :class="form.gender === 'ชาย' ? 'border-indigo-600 bg-indigo-600 text-white text-[8px]' : 'border-gray-300 bg-white'">
                            <span v-if="form.gender === 'ชาย'" class="w-1.5 h-1.5 rounded-full bg-white"></span>
                        </span>
                        <span class="text-xs">ชาย</span>
                    </div>

                    <div
                        class="border-2 rounded-xl p-2.5 flex items-center justify-center gap-2 cursor-pointer transition-all shadow-sm"
                        :class="form.gender === 'ไม่ระบุ / อื่นๆ' ? 'border-indigo-500 bg-indigo-50/20 text-indigo-700 font-bold' : 'border-gray-200 text-slate-500 hover:bg-slate-50'"
                        @click="form.gender = 'ไม่ระบุ / อื่นๆ'"
                    >
                        <span class="w-4 h-4 rounded-full border flex items-center justify-center" :class="form.gender === 'ไม่ระบุ / อื่นๆ' ? 'border-indigo-600 bg-indigo-600 text-white text-[8px]' : 'border-gray-300 bg-white'">
                            <span v-if="form.gender === 'ไม่ระบุ / อื่นๆ'" class="w-1.5 h-1.5 rounded-full bg-white"></span>
                        </span>
                        <span class="text-xs">ไม่ระบุ / อื่นๆ</span>
                    </div>
                </div>
            </div>

            <!-- วันเกิด -->
            <div>
                <label class="block text-[11px] font-black text-slate-600 mb-1.5">วันเกิด <span class="text-rose-500">*</span></label>
                <div class="relative">
                    <input
                        v-model="form.birthDate"
                        type="date"
                        class="w-full bg-slate-50 border border-gray-200 rounded-xl pl-3 pr-8 py-2 text-xs font-semibold text-slate-700 focus:bg-white focus:border-indigo-500 outline-none"
                    />
                    <UIcon name="i-lucide-calendar" class="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
                <div v-if="computedAge !== null" class="text-[10px] font-bold text-emerald-500 mt-1 flex items-center gap-1">
                    <UIcon name="i-lucide-check-circle" class="w-3.5 h-3.5" />
                    <span>อายุ {{ computedAge }} ปี</span>
                </div>
            </div>

            <!-- หมู่เลือด -->
            <div>
                <label class="block text-[11px] font-black text-slate-600 mb-1.5">หมู่เลือด <span class="text-gray-400 font-bold">(ไม่บังคับ)</span></label>
                <select
                    v-model="form.bloodGroup"
                    class="w-full bg-slate-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:bg-white focus:border-indigo-500 outline-none"
                >
                    <option>— ไม่ทราบ —</option>
                    <option>A</option>
                    <option>B</option>
                    <option>O</option>
                    <option>AB</option>
                </select>
            </div>

            <!-- เลขประจำตัวประชาชน -->
            <div class="md:col-span-2">
                <label class="block text-[11px] font-black text-slate-600 mb-1.5">เลขประจำตัวประชาชน / หนังสือเดินทาง <span class="text-rose-500">*</span></label>
                <div class="relative">
                    <input
                        v-model="form.idCard"
                        type="text"
                        placeholder="กรอกตัวเลข 13 หลัก"
                        class="w-full bg-slate-50 border border-gray-200 rounded-xl pl-3 pr-8 py-2 text-xs font-semibold text-slate-700 focus:bg-white focus:border-indigo-500 outline-none"
                    />
                    <UIcon name="i-lucide-fingerprint" class="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
                <div v-if="isIdCardValid" class="text-[10px] font-bold text-emerald-500 mt-1 flex items-center gap-1">
                    <UIcon name="i-lucide-check-circle" class="w-3.5 h-3.5" />
                    <span>ตรวจสอบรูปแบบถูกต้อง 13 หลัก</span>
                </div>
            </div>

            <!-- HN Auto generated -->
            <div class="md:col-span-2">
                <label class="block text-[11px] font-black text-slate-600 mb-1.5">HN (Hospital Number) <span class="text-gray-400 font-bold">(ไม่บังคับ)</span></label>
                <div class="relative">
                    <input
                        type="text"
                        disabled
                        placeholder="สร้างอัตโนมัติ ➔ CN-00192"
                        class="w-full bg-gray-50 border border-gray-200 rounded-xl pl-3 pr-8 py-2 text-xs font-semibold text-gray-400 outline-none cursor-not-allowed select-none"
                    />
                    <UIcon name="i-lucide-lock" class="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
                <span class="text-[9px] text-slate-400 font-semibold block mt-1.5">ปล่อยว่างเพื่อให้ระบบสร้างให้อัตโนมัติ</span>
            </div>
        </div>
    </div>
</template>
