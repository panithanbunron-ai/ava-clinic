<script setup lang="ts">
    defineProps<{
        form: any
        isMobileValid: boolean
    }>()

    const toast = useAppToast()
</script>

<template>
    <div id="section-02" class="bg-white rounded-3xl p-6 border border-gray-100 shadow-xl shadow-slate-200/40 relative animate-fade-in">
        <!-- Section Header -->
        <div class="flex items-start justify-between mb-6 pb-4 border-b border-gray-50">
            <div class="flex items-center gap-3">
                <div class="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-xl font-black text-sm flex items-center justify-center shrink-0">
                    02
                </div>
                <div>
                    <h2 class="text-base md:text-lg font-black text-slate-800 tracking-tight">การติดต่อ</h2>
                    <p class="text-[11px] font-semibold text-gray-400 mt-0.5">เบอร์โทร, LINE, อีเมล, ที่อยู่ — สำหรับยืนยันนัดและส่งโปรโมชั่น</p>
                </div>
            </div>
            <span class="text-[10px] font-bold text-gray-400 bg-slate-50 px-2 py-0.5 rounded-lg border border-slate-100">ฟิลด์บังคับ 1 ช่อง</span>
        </div>

        <!-- Inputs Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <!-- เบอร์โทรศัพท์หลัก -->
            <div>
                <label class="block text-[11px] font-black text-slate-600 mb-1.5">เบอร์โทรศัพท์หลัก <span class="text-rose-500">*</span></label>
                <div class="relative">
                    <input
                        v-model="form.mobile"
                        type="text"
                        placeholder="เช่น 081-234-5678"
                        class="w-full bg-slate-50 border border-gray-200 rounded-xl pl-3 pr-8 py-2 text-xs font-semibold text-slate-700 focus:bg-white focus:border-indigo-500 outline-none"
                    />
                    <UIcon name="i-lucide-phone" class="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
                <div v-if="isMobileValid" class="text-[10px] font-bold text-emerald-500 mt-1 flex items-center gap-1">
                    <UIcon name="i-lucide-check-circle" class="w-3.5 h-3.5" />
                    <span>ตรวจสอบรูปแบบเรียบร้อย</span>
                </div>
            </div>

            <!-- เบอร์โทรสำรอง -->
            <div>
                <label class="block text-[11px] font-black text-slate-600 mb-1.5">เบอร์โทรสำรอง <span class="text-gray-400 font-bold">(ไม่บังคับ)</span></label>
                <div class="relative">
                    <input
                        v-model="form.homePhone"
                        type="text"
                        placeholder="เช่น 02-xxx-xxxx"
                        class="w-full bg-slate-50 border border-gray-200 rounded-xl pl-3 pr-8 py-2 text-xs font-semibold text-slate-700 focus:bg-white focus:border-indigo-500 outline-none"
                    />
                    <UIcon name="i-lucide-phone-call" class="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
            </div>

            <!-- LINE ID -->
            <div>
                <label class="block text-[11px] font-black text-slate-600 mb-1.5">LINE ID <span class="text-gray-400 font-bold">(ไม่บังคับ)</span></label>
                <div class="relative">
                    <input
                        v-model="form.lineId"
                        type="text"
                        placeholder="เช่น @pimonpa"
                        class="w-full bg-slate-50 border border-gray-200 rounded-xl pl-3 pr-8 py-2 text-xs font-semibold text-slate-700 focus:bg-white focus:border-indigo-500 outline-none"
                    />
                    <UIcon name="i-lucide-message-circle" class="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
            </div>

            <!-- อีเมล -->
            <div>
                <label class="block text-[11px] font-black text-slate-600 mb-1.5">อีเมล <span class="text-gray-400 font-bold">(ไม่บังคับ)</span></label>
                <div class="relative">
                    <input
                        v-model="form.email"
                        type="text"
                        placeholder="เช่น name@example.com"
                        class="w-full bg-slate-50 border border-gray-200 rounded-xl pl-3 pr-8 py-2 text-xs font-semibold text-slate-700 focus:bg-white focus:border-indigo-500 outline-none"
                    />
                    <UIcon name="i-lucide-mail" class="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
            </div>

            <!-- อาชีพ -->
            <div class="md:col-span-2">
                <label class="block text-[11px] font-black text-slate-600 mb-1.5">อาชีพ <span class="text-gray-400 font-bold">(ไม่บังคับ)</span></label>
                <input
                    v-model="form.occupation"
                    type="text"
                    placeholder="เช่น นักออกแบบ, แพทย์, ครู"
                    class="w-full bg-slate-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:bg-white focus:border-indigo-500 outline-none"
                />
            </div>

            <!-- ที่อยู่ -->
            <div class="md:col-span-2">
                <label class="block text-[11px] font-black text-slate-600 mb-1.5">ที่อยู่ <span class="text-gray-400 font-bold">(ไม่บังคับ)</span></label>
                <input
                    v-model="form.address"
                    type="text"
                    placeholder="บ้านเลขที่ ซอย ถนน แขวง/ตำบล"
                    class="w-full bg-slate-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:bg-white focus:border-indigo-500 outline-none"
                />
            </div>

            <!-- จังหวัด -->
            <div>
                <label class="block text-[11px] font-black text-slate-600 mb-1.5">จังหวัด <span class="text-gray-400 font-bold">(ไม่บังคับ)</span></label>
                <select
                    v-model="form.province"
                    class="w-full bg-slate-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:bg-white focus:border-indigo-500 outline-none"
                >
                    <option>กรุงเทพมหานคร</option>
                    <option>เชียงใหม่</option>
                    <option>นนทบุรี</option>
                    <option>ปทุมธานี</option>
                    <option>สมุทรปราการ</option>
                    <option>ชลบุรี</option>
                </select>
            </div>

            <!-- ผู้ติดต่อกรณีฉุกเฉิน -->
            <div>
                <label class="block text-[11px] font-black text-slate-600 mb-1.5">ผู้ติดต่อกรณีฉุกเฉิน <span class="text-gray-400 font-bold">(ไม่บังคับ)</span></label>
                <input
                    v-model="form.emergencyContact"
                    type="text"
                    placeholder="ชื่อ-นามสกุล"
                    class="w-full bg-slate-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:bg-white focus:border-indigo-500 outline-none"
                />
            </div>

            <!-- ความสัมพันธ์ -->
            <div>
                <label class="block text-[11px] font-black text-slate-600 mb-1.5">ความสัมพันธ์ <span class="text-gray-400 font-bold">(ไม่บังคับ)</span></label>
                <select
                    v-model="form.emergencyRelation"
                    class="w-full bg-slate-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:bg-white focus:border-indigo-500 outline-none"
                >
                    <option>— เลือก —</option>
                    <option>บิดา / มารดา</option>
                    <option>สามี / ภรรยา</option>
                    <option>บุตร</option>
                    <option>ญาติ</option>
                    <option>เพื่อน</option>
                </select>
            </div>

            <!-- เบอร์ติดต่อกรณีฉุกเฉิน -->
            <div>
                <label class="block text-[11px] font-black text-slate-600 mb-1.5">เบอร์ติดต่อฉุกเฉิน <span class="text-gray-400 font-bold">(ไม่บังคับ)</span></label>
                <input
                    v-model="form.emergencyPhone"
                    type="text"
                    placeholder="08x-xxx-xxxx"
                    class="w-full bg-slate-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:bg-white focus:border-indigo-500 outline-none"
                />
            </div>
        </div>

        <!-- Duplicate Patient Warning Banner (Amber notification box) -->
        <div
            v-if="form.mobile && form.mobile.startsWith('0812345678')"
            class="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex gap-3 text-amber-800 text-xs mt-6 shadow-sm animate-fade-in"
        >
            <UIcon name="i-lucide-alert-triangle" class="w-5 h-5 shrink-0 text-amber-500 mt-0.5" />
            <div class="leading-relaxed font-semibold">
                <span>พบลูกค้าที่มีเบอร์ใกล้เคียง: </span>
                <span class="text-slate-800 font-black">คุณพิมพ์ใจ จันทร์เพ็ง</span>
                <span> (HN CN-00184) เบอร์ 081-234-5678 — อาจเป็นคนเดียวกัน? </span>
                <a
                    href="#"
                    class="text-indigo-600 hover:text-indigo-800 font-bold underline underline-offset-4 ml-1 inline-flex items-center gap-0.5"
                    @click.prevent="toast.info('เปิดรายละเอียด', 'กำลังเปิดโปรไฟล์ลูกค้า พิมพ์ใจ จันทร์เพ็ง...')"
                >
                    เปิดดูข้อมูล ➔
                </a>
            </div>
        </div>
    </div>
</template>
