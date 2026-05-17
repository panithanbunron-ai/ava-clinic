<script setup lang="ts">
    import { ref, reactive, computed } from 'vue'

    definePageMeta({
        layout: 'main',
        middleware: ['auth']
    })

    const isLoading = ref(false)
    const activeTab = ref(1)

    // Form reactive state
    const form = reactive({
        title: 'นาย',
        firstName: '',
        lastName: '',
        nickname: '',
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
        emergencyName: '',
        emergencyMobile: '',

        leadSource: 'Facebook / Instagram',
        referredBy: '— ไม่ระบุ —',
        customerGroup: 'Standard',

        drugAllergies: [] as string[],
        chronicDiseases: [] as string[],
        medicalNotes: '',

        pdpaConsent: false,
        linePromoConsent: false,
        smsNoticeConsent: false
    })

    // Initial Abbreviation Calculation for Avatar
    const avatarInitials = computed(() => {
        if (form.firstName && form.lastName) {
            return (form.firstName.charAt(0) + form.lastName.charAt(0)).toUpperCase()
        } else if (form.firstName) {
            return form.firstName.charAt(0).toUpperCase()
        }
        return 'HN'
    })

    // Computed Age based on Birth Date
    const computedAge = computed(() => {
        if (!form.birthDate) return null
        const today = new Date()
        const birth = new Date(form.birthDate)
        let age = today.getFullYear() - birth.getFullYear()
        const monthDiff = today.getMonth() - birth.getMonth()
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--
        }
        return age >= 0 ? age : 0
    })

    // 13-digit Thai ID Card validation
    const isIdCardValid = computed(() => {
        if (!form.idCard) return false
        const id = form.idCard.replace(/-/g, '')
        if (id.length !== 13) return false
        let sum = 0
        for (let i = 0; i < 12; i++) {
            sum += parseFloat(id.charAt(i)) * (13 - i)
        }
        return (11 - (sum % 11)) % 10 === parseFloat(id.charAt(12))
    })

    // Phone validation
    const isMobileValid = computed(() => {
        if (!form.mobile) return false
        const clean = form.mobile.replace(/-/g, '')
        return clean.length === 10 && clean.startsWith('0')
    })

    // Completion Checklist & Score
    const progressList = computed(() => [
        {
            label: 'ข้อมูลพื้นฐานครบถ้วน',
            done: !!(form.title && form.firstName && form.lastName && form.gender && form.birthDate && form.idCard)
        },
        {
            label: 'การติดต่อระบุเรียบร้อย',
            done: !!(form.mobile && form.address)
        },
        {
            label: 'ยอมรับเงื่อนไข & PDPA',
            done: form.pdpaConsent
        }
    ])

    const completionProgress = computed(() => {
        const doneCount = progressList.value.filter(item => item.done).length
        return Math.round((doneCount / progressList.value.length) * 100)
    })

    const toast = useAppToast()

    // Smooth scroll helper
    const scrollToSection = (id: string, tabNum: number) => {
        activeTab.value = tabNum
        const element = document.getElementById(id)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
    }

    // Autofill / ID Card Scanner Simulator
    const simulateIdScan = () => {
        toast.info('ระบบสแกน', 'กำลังเชื่อมต่อเครื่องอ่านบัตรประชาชน...')
        
        setTimeout(() => {
            // Fill high-fidelity simulated Thai ID card data
            form.title = 'นางสาว'
            form.firstName = 'พิมลภา'
            form.lastName = 'จันทร์เพ็ญ'
            form.nickname = 'จอย'
            form.gender = 'หญิง'
            form.birthDate = '1990-05-12'
            form.idCard = '1100201456789'

            form.address = '99/1 ถนนสุขุมวิท'
            form.province = 'กรุงเทพมหานคร'
            form.district = 'คลองเตย'
            form.subDistrict = 'คลองเตย'
            form.zipcode = '10110'

            form.mobile = '081-234-5678'
            form.email = 'pimonpa.j@gmail.com'
            form.lineId = '@pimonpa'
            form.emergencyName = 'สมเกียรติ จันทร์เพ็ญ (บิดา)'
            form.emergencyMobile = '089-876-5432'

            form.drugAllergies = ['Penicillin']
            form.chronicDiseases = ['ผิวแพ้ง่าย']
            
            form.pdpaConsent = true
            form.linePromoConsent = true
            form.smsNoticeConsent = true

            toast.success('สแกนสำเร็จ', 'ดึงข้อมูลจากบัตรประชาชน พิมลภา จันทร์เพ็ญ เรียบร้อยแล้ว')
        }, 1200)
    }

    // Save Customer Handler
    const saveCustomer = async () => {
        if (!form.firstName || !form.lastName) {
            toast.error('ข้อมูลไม่ครบถ้วน', 'กรุณากรอกชื่อและนามสกุลลูกค้า')
            return
        }
        if (isLoading.value) return
        isLoading.value = true
        try {
            await $fetch('/api/customers', {
                method: 'POST',
                body: form
            })
            toast.success('สำเร็จ', 'บันทึกลูกค้าใหม่เรียบร้อยแล้ว')
            setTimeout(() => {
                navigateTo('/customerInfo')
            }, 800)
        } catch (error) {
            isLoading.value = false
            toast.error('ข้อผิดพลาด', 'ไม่สามารถบันทึกข้อมูลได้')
        }
    }
</script>

<template>
    <div class="p-4 md:p-8 max-w-7xl mx-auto min-h-screen bg-slate-50/50">
        <!-- ── Premium Header & Actions ── -->
        <div class="bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 rounded-3xl p-6 md:p-8 text-white shadow-xl shadow-indigo-950/20 mb-8 relative overflow-hidden">
            <!-- Background elements -->
            <div class="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
            <div class="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>

            <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                <div class="flex items-center gap-4">
                    <div class="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shrink-0 shadow-lg transition-transform hover:scale-105 duration-300">
                        <UIcon name="i-heroicons-user-plus" class="w-7 h-7 text-indigo-300" />
                    </div>
                    <div>
                        <h1 class="text-xl md:text-2xl font-extrabold flex items-center gap-3 tracking-tight">
                            ลงทะเบียนลูกค้าใหม่
                            <span class="text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-full backdrop-blur-md">HN AUTO</span>
                        </h1>
                        <p class="text-xs md:text-sm text-indigo-200/80 mt-1 font-medium">บันทึกข้อมูลประวัติผู้ป่วยใหม่เพื่อรับการตรวจและประเมินอาการ</p>
                    </div>
                </div>

                <div class="flex items-center gap-3">
                    <!-- เสียบบัตรประชาชน button -->
                    <button
                        type="button"
                        class="bg-indigo-600/80 hover:bg-indigo-600 border border-indigo-500/40 text-white font-bold text-xs px-5 py-2.5 rounded-2xl flex items-center gap-2 shadow-lg shadow-indigo-900/40 transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
                        @click="simulateIdScan"
                    >
                        <UIcon name="i-heroicons-identification" class="w-4.5 h-4.5" />
                        <span>เสียบบัตรประชาชน</span>
                    </button>

                    <!-- Cancel button -->
                    <button
                        type="button"
                        class="bg-white/10 hover:bg-white/20 border border-white/10 text-white font-bold text-xs px-4 py-2.5 rounded-2xl transition-all cursor-pointer"
                        @click="navigateTo('/dashboard')"
                    >
                        ยกเลิก
                    </button>
                </div>
            </div>
        </div>

        <!-- ── Main Grid Layout ── -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <!-- ── Left Column: Form & Stepper Index (8/12) ── -->
            <div class="lg:col-span-8 space-y-6">
                <!-- Stepper Index Bar -->
                <div class="bg-white rounded-3xl p-4 border border-gray-100 shadow-sm flex items-center justify-between gap-4">
                    <div class="flex flex-wrap gap-2 md:gap-4 flex-1">
                        <button
                            type="button"
                            class="flex items-center gap-2 px-3 py-2 rounded-xl transition-all cursor-pointer font-bold text-xs md:text-sm"
                            :class="activeTab === 1 ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-50 text-slate-400 hover:bg-slate-100/80 hover:text-slate-600'"
                            @click="scrollToSection('section-01', 1)"
                        >
                            <span class="w-5 h-5 rounded-lg flex items-center justify-center text-xs" :class="activeTab === 1 ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'">1</span>
                            <span>ข้อมูลพื้นฐาน</span>
                        </button>
                        <button
                            type="button"
                            class="flex items-center gap-2 px-3 py-2 rounded-xl transition-all cursor-pointer font-bold text-xs md:text-sm"
                            :class="activeTab === 2 ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-50 text-slate-400 hover:bg-slate-100/80 hover:text-slate-600'"
                            @click="scrollToSection('section-02', 2)"
                        >
                            <span class="w-5 h-5 rounded-lg flex items-center justify-center text-xs" :class="activeTab === 2 ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'">2</span>
                            <span>การติดต่อ</span>
                        </button>
                        <button
                            type="button"
                            class="flex items-center gap-2 px-3 py-2 rounded-xl transition-all cursor-pointer font-bold text-xs md:text-sm"
                            :class="activeTab === 3 ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-50 text-slate-400 hover:bg-slate-100/80 hover:text-slate-600'"
                            @click="scrollToSection('section-03', 3)"
                        >
                            <span class="w-5 h-5 rounded-lg flex items-center justify-center text-xs" :class="activeTab === 3 ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'">3</span>
                            <span>ข้อมูลสุขภาพ</span>
                        </button>
                        <button
                            type="button"
                            class="flex items-center gap-2 px-3 py-2 rounded-xl transition-all cursor-pointer font-bold text-xs md:text-sm"
                            :class="activeTab === 4 ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-50 text-slate-400 hover:bg-slate-100/80 hover:text-slate-600'"
                            @click="scrollToSection('section-04', 4)"
                        >
                            <span class="w-5 h-5 rounded-lg flex items-center justify-center text-xs" :class="activeTab === 4 ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'">4</span>
                            <span>การยินยอม</span>
                        </button>
                    </div>

                    <div class="text-right hidden sm:block shrink-0">
                        <span class="text-xs font-black text-slate-400 block">กรอกเสร็จสิ้น</span>
                        <span class="text-sm font-black text-slate-700 mt-0.5 block">{{ completionProgress }}%</span>
                    </div>
                </div>

                <!-- Sections scrolling layout -->
                <div class="space-y-6">
                    <CustomerNewTabGeneral
                        :form="form"
                        :avatarInitials="avatarInitials"
                        :computedAge="computedAge"
                        :isIdCardValid="isIdCardValid"
                    />

                    <CustomerNewTabContact
                        :form="form"
                        :isMobileValid="isMobileValid"
                    />

                    <CustomerNewTabHealth
                        :form="form"
                    />

                    <CustomerNewTabAdditional
                        :form="form"
                    />
                </div>

                <!-- Action Footer -->
                <div class="bg-white rounded-3xl p-5 border border-gray-100 shadow-xl shadow-slate-200/30 flex items-center justify-between gap-4">
                    <button
                        type="button"
                        class="px-6 py-2.5 rounded-2xl hover:bg-slate-50 text-slate-500 hover:text-slate-700 font-bold text-xs md:text-sm cursor-pointer transition-all"
                        @click="navigateTo('/dashboard')"
                    >
                        ยกเลิกการกรอก
                    </button>

                    <button
                        type="button"
                        class="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-extrabold text-xs md:text-sm px-8 py-3 rounded-2xl shadow-lg shadow-indigo-500/20 flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0 transition-all"
                        :disabled="isLoading"
                        @click="saveCustomer"
                    >
                        <UIcon v-if="isLoading" name="i-heroicons-arrow-path" class="w-4 h-4 animate-spin" />
                        <UIcon v-else name="i-heroicons-check-circle" class="w-4.5 h-4.5" />
                        <span>บันทึกข้อมูลลูกค้า</span>
                    </button>
                </div>
            </div>

            <!-- ── Right Column: Live Preview & Progress Tracker (4/12) ── -->
            <div class="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
                <!-- Live Preview Card -->
                <div class="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-slate-200/40 overflow-hidden relative">
                    <!-- Card Top Gradient Banner -->
                    <div class="h-20 bg-gradient-to-tr from-indigo-600 to-indigo-800 p-4 flex items-start justify-between relative overflow-hidden">
                        <div class="absolute -right-6 -bottom-6 w-20 h-20 bg-white/5 rounded-full blur-xl pointer-events-none"></div>
                        <span class="text-xs font-black text-indigo-200 uppercase tracking-widest bg-indigo-900/30 px-2.5 py-0.5 rounded-md border border-indigo-400/20 backdrop-blur-md">LIVE PREVIEW</span>
                        <span class="text-xs font-bold text-white/80">CN-00184</span>
                    </div>

                    <!-- Card Body -->
                    <div class="p-6 pt-0 relative">
                        <!-- Profile Image Circle overlapping banner -->
                        <div class="w-20 h-20 rounded-full bg-[#f6f3ff] border-4 border-white flex items-center justify-center font-black text-2xl text-indigo-600 shadow-md -mt-10 mb-4 mx-auto relative z-10 shrink-0">
                            {{ avatarInitials }}
                        </div>

                        <!-- Patient Name & Basic Info -->
                        <div class="text-center mb-6">
                            <h3 class="text-base font-black text-slate-800">
                                {{ form.firstName ? (form.title + ' ' + form.firstName + ' ' + form.lastName) : '— ยังไม่ได้ระบุชื่อ —' }}
                            </h3>
                            <p class="text-xs text-gray-400 font-bold mt-1 flex items-center justify-center gap-1.5">
                                <span>เพศ: {{ form.gender || '—' }}</span>
                                <span class="text-slate-300">•</span>
                                <span>อายุ: {{ computedAge !== null ? computedAge + ' ปี' : '—' }}</span>
                            </p>
                        </div>

                        <!-- Divider line -->
                        <div class="border-b border-gray-50 mb-4"></div>

                        <!-- Details list -->
                        <div class="space-y-3.5 text-xs">
                            <!-- เบอร์โทรศัพท์ -->
                            <div class="flex items-start gap-3">
                                <div class="w-7 h-7 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center text-slate-400 shrink-0">
                                    <UIcon name="i-lucide-phone" class="w-3.5 h-3.5" />
                                </div>
                                <div class="flex-1 min-w-0">
                                    <span class="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">เบอร์โทรศัพท์</span>
                                    <span class="text-xs md:text-sm font-semibold text-slate-700 block truncate">{{ form.mobile || '—' }}</span>
                                </div>
                            </div>

                            <!-- อีเมล -->
                            <div class="flex items-start gap-3">
                                <div class="w-7 h-7 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center text-slate-400 shrink-0">
                                    <UIcon name="i-lucide-mail" class="w-3.5 h-3.5" />
                                </div>
                                <div class="flex-1 min-w-0">
                                    <span class="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">อีเมล</span>
                                    <span class="text-xs md:text-sm font-semibold text-slate-700 block truncate">{{ form.email || '—' }}</span>
                                </div>
                            </div>

                            <!-- LINE ID -->
                            <div class="flex items-start gap-3">
                                <div class="w-7 h-7 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center text-slate-400 shrink-0">
                                    <UIcon name="i-lucide-message-square" class="w-3.5 h-3.5" />
                                </div>
                                <div class="flex-1 min-w-0">
                                    <span class="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">LINE ID</span>
                                    <span class="text-xs md:text-sm font-semibold text-slate-700 block truncate">{{ form.lineId || '—' }}</span>
                                </div>
                            </div>

                            <!-- ที่อยู่ปัจจุบัน -->
                            <div class="flex items-start gap-3">
                                <div class="w-7 h-7 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center text-slate-400 shrink-0">
                                    <UIcon name="i-lucide-map-pin" class="w-3.5 h-3.5" />
                                </div>
                                <div class="flex-1 min-w-0">
                                    <span class="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">ที่อยู่ปัจจุบัน</span>
                                    <span class="text-xs md:text-sm font-semibold text-slate-700 block leading-relaxed">
                                        {{ form.address ? (form.address + ' ' + form.subDistrict + ' ' + form.district + ' ' + form.province + ' ' + form.zipcode).trim() : '—' }}
                                    </span>
                                </div>
                            </div>

                            <!-- ติดต่อฉุกเฉิน -->
                            <div class="flex items-start gap-3">
                                <div class="w-7 h-7 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center text-slate-400 shrink-0">
                                    <UIcon name="i-lucide-shield-alert" class="w-3.5 h-3.5" />
                                </div>
                                <div class="flex-1 min-w-0">
                                    <span class="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">ผู้ติดต่อฉุกเฉิน</span>
                                    <span class="text-xs md:text-sm font-semibold text-slate-700 block leading-relaxed">
                                        {{ form.emergencyName ? (form.emergencyName + ' (' + form.emergencyMobile + ')') : '—' }}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <!-- Divider line -->
                        <div class="border-b border-gray-50 my-4"></div>

                        <!-- Interactive Allergies & Chronic tag indicators -->
                        <div class="space-y-3">
                            <!-- แพ้ยา -->
                            <div>
                                <span class="text-[11px] font-bold text-rose-400 uppercase tracking-wider block mb-1">ประวัติการแพ้ยา</span>
                                <div class="flex flex-wrap gap-1.5">
                                    <template v-if="form.drugAllergies.length > 0">
                                        <span v-for="tag in form.drugAllergies" :key="tag" class="text-xs font-bold bg-rose-50 border border-rose-100 text-rose-500 px-2 py-0.5 rounded-lg">{{ tag }}</span>
                                    </template>
                                    <span v-else class="text-xs font-bold text-slate-400/80">ไม่มีประวัติแพ้ยา</span>
                                </div>
                            </div>

                            <!-- โรคประจำตัว -->
                            <div>
                                <span class="text-[11px] font-bold text-indigo-400 uppercase tracking-wider block mb-1">โรคประจำตัว</span>
                                <div class="flex flex-wrap gap-1.5">
                                    <template v-if="form.chronicDiseases.length > 0">
                                        <span v-for="tag in form.chronicDiseases" :key="tag" class="text-xs font-bold bg-indigo-50 border border-indigo-100 text-indigo-500 px-2 py-0.5 rounded-lg">{{ tag }}</span>
                                    </template>
                                    <span v-else class="text-xs font-bold text-slate-400/80">ไม่มีโรคประจำตัว</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Completion score card -->
                <div class="bg-white rounded-3xl p-6 border border-gray-100 shadow-xl shadow-slate-200/40 relative">
                    <h4 class="text-sm font-bold text-slate-700 mb-3 flex items-center justify-between">
                        <span>ความสมบูรณ์ของเอกสาร</span>
                        <span class="text-indigo-600 font-black text-base">{{ completionProgress }}%</span>
                    </h4>

                    <!-- Progress bar -->
                    <div class="h-2 w-full bg-slate-100 rounded-full mb-5 overflow-hidden">
                        <div class="h-full bg-gradient-to-r from-indigo-600 to-blue-500 rounded-full transition-all duration-500" :style="{ width: completionProgress + '%' }"></div>
                    </div>

                    <!-- Checklist -->
                    <div class="space-y-3">
                        <div v-for="item in progressList" :key="item.label" class="flex items-center gap-2.5 text-xs md:text-sm">
                            <div class="w-4.5 h-4.5 rounded-lg flex items-center justify-center shrink-0 border transition-all" :class="item.done ? 'bg-emerald-500 border-emerald-400 text-white' : 'border-gray-200 bg-slate-50 text-transparent'">
                                <UIcon name="i-lucide-check" class="w-3 h-3 stroke-[3]" />
                            </div>
                            <span class="font-bold transition-all duration-300" :class="item.done ? 'text-slate-700' : 'text-slate-400'">{{ item.label }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
