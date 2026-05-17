<script setup lang="ts">
    import { ref, computed, watch } from 'vue'

    const props = defineProps<{
        selectedDay: number // e.g. 17
    }>()

    const emit = defineEmits<{
        (e: 'save-booking', payload: any): void
    }>()

    // 3 Branches: เลย, เมืองทองธานี, อมตะชลบุรี
    const doctors = ref([
        { id: 1, name: 'Dr. นันทกานต์ ภู่กัน', branch: 'เลย', specialty: 'จิตเวช', time: '10:00-18:00', initial: 'นก', color: 'bg-emerald-100 text-emerald-600' },
        { id: 2, name: 'Dr. พิมลภา จันทร์เพ็ญ', branch: 'เมืองทองธานี', specialty: 'ความงาม', time: '10:00-19:00', initial: 'พม', color: 'bg-indigo-100 text-indigo-600' },
        { id: 3, name: 'Dr. ธนดล สวัสดี', branch: 'อมตะชลบุรี', specialty: 'ผิวหนัง', time: '13:00-20:00', initial: 'ธด', color: 'bg-rose-100 text-rose-600' },
        { id: 4, name: 'Dr. สมศักดิ์ พัฒนกุล', branch: 'อมตะชลบุรี', specialty: 'อายุรกรรม', time: '09:00-17:00', initial: 'สศ', color: 'bg-slate-100 text-slate-600' }
    ])

    const selectedDoctorId = ref(1)
    const selectedTimeSlot = ref('14:30')
    const selectedCustomer = ref('คุณรุ่งเรือง เลิศล้ำ')

    const activeDoctor = computed(() => {
        const doc = doctors.value.find(d => d.id === selectedDoctorId.value)
        return doc || { id: 1, name: 'Dr. นันทกานต์ ภู่กัน', branch: 'เลย', specialty: 'จิตเวช', time: '10:00-18:00', initial: 'นก', color: 'bg-emerald-100 text-emerald-600' }
    })

    // Mock booked slots for each doctor to show a realistic schedule
    const bookedSlots = {
        1: ['10:00', '13:00', '15:30'],
        2: ['11:00', '14:00', '16:30'],
        3: ['13:30', '14:00', '17:00'],
        4: ['09:30', '12:00', '14:30']
    }

    const timeSlots = [
        '09:00', '09:30', '10:00', '10:30',
        '11:00', '11:30', '12:00', '12:30',
        '13:00', '13:30', '14:00', '14:30',
        '15:00', '15:30', '16:00', '16:30',
        '17:00', '17:30', '18:00', '18:30'
    ]

    const getSlotState = (slot: string) => {
        const booked = bookedSlots[selectedDoctorId.value as keyof typeof bookedSlots] || []
        if (booked.includes(slot)) return 'booked'
        if (selectedTimeSlot.value === slot) return 'selected'
        return 'free'
    }

    const selectSlot = (slot: string) => {
        if (getSlotState(slot) !== 'booked') {
            selectedTimeSlot.value = slot
        }
    }

    const confirmBooking = () => {
        emit('save-booking', {
            day: props.selectedDay,
            time: selectedTimeSlot.value,
            doctor: activeDoctor.value.name,
            branch: activeDoctor.value.branch,
            customer: selectedCustomer.value
        })
    }

    // Auto update slot selection if selected slot becomes booked on doctor change
    watch(selectedDoctorId, () => {
        const booked = bookedSlots[selectedDoctorId.value as keyof typeof bookedSlots] || []
        if (booked.includes(selectedTimeSlot.value)) {
            // Pick first free slot
            const freeSlot = timeSlots.find(slot => !booked.includes(slot))
            if (freeSlot) selectedTimeSlot.value = freeSlot
        }
    })
</script>

<template>
    <div class="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-slate-200/40 overflow-hidden flex flex-col h-full">
        <!-- ── Date Information Header ── -->
        <div class="bg-gradient-to-tr from-indigo-800 to-indigo-900 p-6 text-white relative">
            <div class="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>

            <span class="text-[10px] font-black text-indigo-200 uppercase tracking-widest block mb-1">เลือกวัน • พฤษภาคม 2569</span>
            <h3 class="text-lg font-black tracking-tight flex items-center gap-2">
                <UIcon name="i-lucide-calendar-days" class="w-5 h-5 text-indigo-300" />
                อาทิตย์ที่ {{ selectedDay }} พฤษภาคม
            </h3>
            <p class="text-xs text-indigo-200/80 font-bold mt-1.5 flex items-center gap-2">
                <span>4 แพทย์เข้าตรวจ</span>
                <span class="text-indigo-400">•</span>
                <span>นัดแล้ว 8 ราย</span>
                <span class="text-indigo-400">•</span>
                <span>ว่าง 12 ช่อง</span>
            </p>
        </div>

        <!-- ── Sidebar Body (Scrollable) ── -->
        <div class="p-6 space-y-6 flex-1 overflow-y-auto max-h-[700px]">
            <!-- 1. Doctors Duty Schedule -->
            <div class="space-y-3">
                <h4 class="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center justify-between">
                    <span>แพทย์เข้าตรวจสาขาประจำวัน</span>
                    <span class="text-indigo-600 cursor-pointer hover:underline text-[10px]">ดูทั้งหมด</span>
                </h4>

                <div class="space-y-2.5">
                    <button
                        v-for="doc in doctors"
                        :key="doc.id"
                        type="button"
                        class="w-full p-3 rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer"
                        :class="[
                            selectedDoctorId === doc.id
                                ? 'border-indigo-600 bg-indigo-50/10 shadow-sm'
                                : 'border-gray-100 bg-white hover:bg-slate-50'
                        ]"
                        @click="selectedDoctorId = doc.id"
                    >
                        <div class="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shrink-0 shadow-sm" :class="doc.color">
                            {{ doc.initial }}
                        </div>
                        <div class="flex-1 min-w-0">
                            <span class="text-xs font-black text-slate-800 block truncate">{{ doc.name }}</span>
                            <span class="text-[10px] text-gray-400 font-semibold mt-0.5 block flex items-center gap-1.5">
                                <span class="px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 font-bold">สาขา{{ doc.branch }}</span>
                                <span>•</span>
                                <span>{{ doc.specialty }}</span>
                            </span>
                        </div>
                        <div class="text-right shrink-0">
                            <span class="text-[10px] font-black text-slate-700 block">{{ doc.time }}</span>
                        </div>
                    </button>
                </div>
            </div>

            <!-- Divider -->
            <div class="border-b border-gray-100"></div>

            <!-- 2. Interactive Time Slot Grid -->
            <div class="space-y-3">
                <h4 class="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center justify-between">
                    <span>เลือกเวลานัดหมาย (15 นาที/ช่อง)</span>
                    <span class="text-slate-400 font-bold text-[10px]">สำหรับ {{ activeDoctor.name }}</span>
                </h4>

                <!-- Time slot grid -->
                <div class="grid grid-cols-4 gap-2">
                    <button
                        v-for="slot in timeSlots"
                        :key="slot"
                        type="button"
                        class="py-2.5 rounded-xl border text-center font-black text-xs transition-all cursor-pointer"
                        :class="[
                            getSlotState(slot) === 'booked'
                                ? 'bg-rose-50 border-rose-100 text-rose-300 pointer-events-none line-through'
                                : getSlotState(slot) === 'selected'
                                    ? 'bg-indigo-600 border-transparent text-white shadow-md shadow-indigo-200'
                                    : 'bg-white border-gray-200 text-slate-700 hover:bg-slate-50'
                        ]"
                        @click="selectSlot(slot)"
                    >
                        {{ slot }}
                    </button>
                </div>
            </div>

            <!-- Divider -->
            <div class="border-b border-gray-100"></div>

            <!-- 3. Confirmation Widget -->
            <div class="space-y-4">
                <h4 class="text-xs font-black text-slate-400 uppercase tracking-widest">ยืนยันข้อมูลนัดหมาย</h4>

                <div class="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-3 text-xs">
                    <div class="flex items-center justify-between">
                        <span class="font-bold text-slate-400">วันที่นัดตรวจ</span>
                        <span class="font-black text-slate-800">อาทิตย์ที่ {{ selectedDay }} พ.ค. 2569</span>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="font-bold text-slate-400">เวลาตรวจ</span>
                        <span class="font-black text-indigo-600">{{ selectedTimeSlot }} น. • 30 นาที</span>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="font-bold text-slate-400">แพทย์ผู้นัด</span>
                        <span class="font-black text-slate-800">{{ activeDoctor.name }}</span>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="font-bold text-slate-400">สาขาที่นัดหมาย</span>
                        <span class="font-black text-emerald-600 flex items-center gap-1">
                            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
                            สาขา{{ activeDoctor.branch }}
                        </span>
                    </div>

                    <!-- Customer Dropdown Selector -->
                    <div class="space-y-1.5 pt-2 border-t border-slate-200/50">
                        <label class="block font-bold text-slate-400">เลือกชื่อคนไข้ / ลูกค้า</label>
                        <select v-model="selectedCustomer" class="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 outline-none focus:border-indigo-500">
                            <option>คุณรุ่งเรือง เลิศล้ำ</option>
                            <option>คุณวิไลพร โพธิ์ศิริ</option>
                            <option>คุณธนภูมิ สุวรรณ</option>
                            <option>คุณสมศักดิ์ สมเจตน์</option>
                            <option>คุณอลิศรา รักชาติ</option>
                            <option>— ลงทะเบียนคนใหม่ —</option>
                        </select>
                    </div>
                </div>

                <!-- Booking CTA -->
                <button
                    type="button"
                    class="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-extrabold text-xs md:text-sm py-3 px-4 rounded-2xl shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0 transition-all"
                    @click="confirmBooking"
                >
                    <UIcon name="i-lucide-check-circle" class="w-4.5 h-4.5" />
                    <span>ยืนยันสร้างคิวนัดหมายใหม่</span>
                </button>
            </div>
        </div>
    </div>
</template>
