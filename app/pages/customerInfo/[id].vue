<script setup lang="ts">
    import { ref, reactive, computed, watch } from 'vue'

    definePageMeta({
        layout: 'main',
        middleware: ['auth']
    })

    const route = useRoute()
    const id = route.params.id
    const toast = useAppToast()

    const isLoading = ref(false)
    const isEditMode = ref(false)
    const activeTab = ref(1)

    // Fetch original customer data
    const { data: response, pending, refresh } = await useFetch<any>(`/api/customers/${id}`)
    const customerData = computed<any>(() => response.value?.data || {})

    // Form reactive state
    const form = reactive({
        id: '',
        hn: '',
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
        emergencyRelation: '— เลือก —',
        emergencyMobile: '',

        leadSource: 'Facebook / Instagram',
        referredBy: '— ไม่ระบุ —',
        customerGroup: 'Standard',

        drugAllergies: [] as string[],
        chronicDiseases: [] as string[],
        medicalNotes: '',

        pdpaConsent: false,
        linePromoConsent: false,
        smsNoticeConsent: false,
        avatarColor: 'bg-indigo-100 text-indigo-600'
    })

    // Populate form with fetched data
    const populateForm = () => {
        const data = customerData.value
        if (data && data.firstName) {
            form.id = data.id || ''
            form.hn = data.hn || ''
            form.title = data.title || 'นาย'
            form.firstName = data.firstName || ''
            form.lastName = data.lastName || ''
            form.nickname = data.nickname || ''
            form.gender = data.gender || 'ชาย'
            form.birthDate = data.birthDate || ''
            form.idCard = data.idCard || ''

            form.address = data.address || ''
            form.province = data.province || ''
            form.district = data.district || ''
            form.subDistrict = data.subDistrict || ''
            form.zipcode = data.zipcode || ''

            form.mobile = data.mobile || ''
            form.homePhone = data.homePhone || ''
            form.email = data.email || ''
            form.lineId = data.lineId || ''
            form.emergencyName = data.emergencyName || ''
            form.emergencyRelation = data.emergencyRelation || '— เลือก —'
            form.emergencyMobile = data.emergencyMobile || ''

            form.leadSource = data.leadSource || 'Facebook / Instagram'
            form.referredBy = data.referredBy || '— ไม่ระบุ —'
            form.customerGroup = data.customerGroup || 'Standard'

            form.drugAllergies = data.drugAllergies ? [...data.drugAllergies] : []
            form.chronicDiseases = data.chronicDiseases ? [...data.chronicDiseases] : []
            form.medicalNotes = data.medicalNotes || ''

            form.pdpaConsent = !!data.pdpaConsent
            form.linePromoConsent = !!data.linePromoConsent
            form.smsNoticeConsent = !!data.smsNoticeConsent
            form.avatarColor = data.avatarColor || 'bg-indigo-100 text-indigo-600'
        }
    }

    // Populate initially when data is loaded
    watch(customerData, () => {
        populateForm()
    }, { immediate: true })

    // Interactive allergies & diseases pools
    const availableAllergies = ref(['Penicillin', 'Lidocaine', 'Sulfa', 'Aspirin', 'Latex', 'Iodine', 'อาหารทะเล'])
    const availableDiseases = ref(['ความดันสูง', 'ความดันต่ำ', 'เบาหวาน', 'หอบหืด', 'ผิวแพ้ง่าย', 'แผลคีลอยด์', 'ตั้งครรภ์/ให้นมบุตร', 'ไทรอยด์'])

    const newAllergyInput = ref('')
    const newDiseaseInput = ref('')
    const showAddAllergy = ref(false)
    const showAddDisease = ref(false)

    // Tag handlers
    const toggleAllergy = (tag: string) => {
        if (!isEditMode.value) return
        const idx = form.drugAllergies.indexOf(tag)
        if (idx > -1) {
            form.drugAllergies.splice(idx, 1)
        } else {
            form.drugAllergies.push(tag)
        }
    }

    const toggleDisease = (tag: string) => {
        if (!isEditMode.value) return
        const idx = form.chronicDiseases.indexOf(tag)
        if (idx > -1) {
            form.chronicDiseases.splice(idx, 1)
        } else {
            form.chronicDiseases.push(tag)
        }
    }

    const addCustomAllergy = () => {
        if (newAllergyInput.value.trim()) {
            const tag = newAllergyInput.value.trim()
            if (!availableAllergies.value.includes(tag)) {
                availableAllergies.value.push(tag)
            }
            form.drugAllergies.push(tag)
            newAllergyInput.value = ''
            showAddAllergy.value = false
        }
    }

    const addCustomDisease = () => {
        if (newDiseaseInput.value.trim()) {
            const tag = newDiseaseInput.value.trim()
            if (!availableDiseases.value.includes(tag)) {
                availableDiseases.value.push(tag)
            }
            form.chronicDiseases.push(tag)
            newDiseaseInput.value = ''
            showAddDisease.value = false
        }
    }

    // Avatar calculation
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

    // Smooth scroll helper
    const scrollToSection = (idStr: string, tabNum: number) => {
        activeTab.value = tabNum
        const element = document.getElementById(idStr)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
    }

    // Enter edit mode
    const enterEditMode = () => {
        isEditMode.value = true
        toast.info('โหมดแก้ไข', 'กำลังเข้าสู่โหมดแก้ไขข้อมูลลูกค้า...')
    }

    // Cancel editing
    const cancelEdit = () => {
        isEditMode.value = false
        populateForm()
        toast.warning('ยกเลิกการแก้ไข', 'คืนค่าข้อมูลล่าสุดเรียบร้อยแล้ว')
    }

    // Save changes
    const saveChanges = async () => {
        if (!form.firstName || !form.lastName) {
            toast.error('ข้อมูลไม่ครบถ้วน', 'กรุณากรอกชื่อและนามสกุลลูกค้า')
            return
        }
        isLoading.value = true
        try {
            await $fetch(`/api/customers/${id}`, {
                method: 'PUT',
                body: form
            })
            isEditMode.value = false
            isLoading.value = false
            toast.success('บันทึกสำเร็จ', 'อัปเดตข้อมูลประวัติคนไข้เรียบร้อยแล้ว')
            refresh()
        } catch (error) {
            isLoading.value = false
            toast.error('เกิดข้อผิดพลาด', 'ไม่สามารถบันทึกข้อมูลการเปลี่ยนแปลงได้')
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
                    <div class="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shrink-0 shadow-lg">
                        <UIcon name="i-heroicons-user" class="w-7 h-7 text-indigo-300" />
                    </div>
                    <div>
                        <h1 class="text-xl md:text-2xl font-extrabold flex items-center gap-3 tracking-tight">
                            ข้อมูลเวชระเบียน: {{ form.title + form.firstName + ' ' + form.lastName }}
                            <span class="text-xs font-bold bg-indigo-500/30 text-white border border-white/20 px-2.5 py-0.5 rounded-full backdrop-blur-md">HN {{ form.hn }}</span>
                        </h1>
                        <p class="text-xs md:text-sm text-indigo-200/80 mt-1 font-medium">ดูประวัติส่วนตัว สัญญาการติดต่อ ประวัติทางสุขภาพ และการยินยอม PDPA</p>
                    </div>
                </div>

                <div class="flex items-center gap-3">
                    <button
                        v-if="!isEditMode"
                        type="button"
                        class="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs md:text-sm px-6 py-2.5 rounded-2xl flex items-center gap-2 shadow-lg transition-all cursor-pointer transform hover:-translate-y-0.5"
                        @click="enterEditMode"
                    >
                        <UIcon name="i-lucide-edit" class="w-4 h-4 text-indigo-300" />
                        <span>แก้ไขประวัติ</span>
                    </button>

                    <button
                        type="button"
                        class="bg-indigo-600/60 hover:bg-indigo-600/80 border border-indigo-500/40 text-white font-bold text-xs px-4 py-2.5 rounded-2xl transition-all cursor-pointer"
                        @click="navigateTo('/customerInfo')"
                    >
                        ย้อนกลับ ➔
                    </button>
                </div>
            </div>
        </div>

        <!-- Loading state -->
        <div v-if="pending && !form.firstName" class="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
            <UIcon name="i-heroicons-arrow-path" class="w-12 h-12 text-indigo-600 animate-spin mb-4" />
            <p class="text-slate-500 font-semibold text-sm">กำลังโหลดข้อมูลประวัติลูกค้า...</p>
        </div>

        <!-- ── Main Grid Layout ── -->
        <div v-else class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
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

                    <div class="text-right hidden sm:block shrink-0 px-2">
                        <span class="text-xs font-black text-slate-400 block">สถานะเวชระเบียน</span>
                        <span class="text-sm font-black text-emerald-500 mt-0.5 block flex items-center gap-1 justify-end">
                            <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
                            สมบูรณ์
                        </span>
                    </div>
                </div>

                <!-- Sections scrolling layout -->
                <div class="space-y-6">
                    <!-- SECTION 01: ข้อมูลพื้นฐาน -->
                    <div id="section-01" class="bg-white rounded-3xl p-6 border border-gray-100 shadow-xl shadow-slate-200/40 relative animate-fade-in">
                        <div class="flex items-center gap-3 mb-6 pb-4 border-b border-gray-50">
                            <div class="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-xl font-black text-sm flex items-center justify-center shrink-0">01</div>
                            <div>
                                <h2 class="text-base md:text-lg font-black text-slate-800 tracking-tight">ข้อมูลพื้นฐานผู้ป่วย</h2>
                                <p class="text-xs font-semibold text-gray-400 mt-0.5">ข้อมูลส่วนตัวและอายุสำหรับการประเมินอาการขั้นพื้นฐาน</p>
                            </div>
                        </div>

                        <!-- General Edit Mode vs View Mode -->
                        <div v-if="isEditMode" class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label class="block text-xs md:text-sm font-bold text-slate-700 mb-1.5">คำนำหน้า <span class="text-rose-500">*</span></label>
                                <select v-model="form.title" class="w-full bg-slate-50 border border-gray-200 rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 focus:bg-white focus:border-indigo-500 outline-none">
                                    <option>นาย</option>
                                    <option>นาง</option>
                                    <option>นางสาว</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-xs md:text-sm font-bold text-slate-700 mb-1.5">ชื่อจริง <span class="text-rose-500">*</span></label>
                                <input v-model="form.firstName" type="text" class="w-full bg-slate-50 border border-gray-200 rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 focus:bg-white focus:border-indigo-500 outline-none" />
                            </div>
                            <div>
                                <label class="block text-xs md:text-sm font-bold text-slate-700 mb-1.5">นามสกุล <span class="text-rose-500">*</span></label>
                                <input v-model="form.lastName" type="text" class="w-full bg-slate-50 border border-gray-200 rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 focus:bg-white focus:border-indigo-500 outline-none" />
                            </div>
                            <div>
                                <label class="block text-xs md:text-sm font-bold text-slate-700 mb-1.5">ชื่อเล่น <span class="text-gray-400 font-bold">(ไม่บังคับ)</span></label>
                                <input v-model="form.nickname" type="text" class="w-full bg-slate-50 border border-gray-200 rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 focus:bg-white focus:border-indigo-500 outline-none" />
                            </div>
                            <div>
                                <label class="block text-xs md:text-sm font-bold text-slate-700 mb-1.5">เพศสภาพ <span class="text-rose-500">*</span></label>
                                <div class="grid grid-cols-2 gap-2">
                                    <button type="button" @click="form.gender = 'ชาย'" class="py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer" :class="form.gender === 'ชาย' ? 'bg-indigo-50 border-indigo-200 text-indigo-600' : 'bg-slate-50 border-gray-200 text-slate-500 hover:bg-slate-100/70'">ชาย</button>
                                    <button type="button" @click="form.gender = 'หญิง'" class="py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer" :class="form.gender === 'หญิง' ? 'bg-rose-50 border-rose-200 text-rose-600' : 'bg-slate-50 border-gray-200 text-slate-500 hover:bg-slate-100/70'">หญิง</button>
                                </div>
                            </div>
                            <div>
                                <label class="block text-xs md:text-sm font-bold text-slate-700 mb-1.5">วัน/เดือน/ปีเกิด <span class="text-rose-500">*</span></label>
                                <input v-model="form.birthDate" type="date" class="w-full bg-slate-50 border border-gray-200 rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 focus:bg-white focus:border-indigo-500 outline-none" />
                            </div>
                            <div class="md:col-span-3">
                                <label class="block text-xs md:text-sm font-bold text-slate-700 mb-1.5">เลขบัตรประชาชน 13 หลัก <span class="text-rose-500">*</span></label>
                                <input v-model="form.idCard" type="text" placeholder="x-xxxx-xxxxx-xx-x" class="w-full bg-slate-50 border border-gray-200 rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 focus:bg-white focus:border-indigo-500 outline-none" />
                                <div v-if="isIdCardValid" class="text-xs font-bold text-emerald-500 mt-1 flex items-center gap-1">
                                    <UIcon name="i-lucide-check-circle" class="w-3.5 h-3.5" />
                                    <span>เลขบัตรประชาชนถูกต้องตามสูตรคำนวณ</span>
                                </div>
                            </div>
                        </div>

                        <!-- Readonly View Mode -->
                        <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div class="bg-slate-50/50 p-4 rounded-2xl border border-slate-100/60">
                                <span class="text-xs font-bold text-slate-400 block mb-1">ชื่อ-นามสกุลจริง</span>
                                <span class="text-sm md:text-base font-black text-slate-800">{{ form.title }} {{ form.firstName }} {{ form.lastName }}</span>
                            </div>
                            <div class="bg-slate-50/50 p-4 rounded-2xl border border-slate-100/60">
                                <span class="text-xs font-bold text-slate-400 block mb-1">ชื่อเล่น</span>
                                <span class="text-sm md:text-base font-black text-slate-800">{{ form.nickname || '—' }}</span>
                            </div>
                            <div class="bg-slate-50/50 p-4 rounded-2xl border border-slate-100/60">
                                <span class="text-xs font-bold text-slate-400 block mb-1">เพศสภาพ</span>
                                <span class="text-sm md:text-base font-black text-slate-800" :class="form.gender === 'หญิง' ? 'text-rose-500' : 'text-indigo-600'">{{ form.gender }}</span>
                            </div>
                            <div class="bg-slate-50/50 p-4 rounded-2xl border border-slate-100/60">
                                <span class="text-xs font-bold text-slate-400 block mb-1">วันเกิด / อายุ</span>
                                <span class="text-sm md:text-base font-black text-slate-800">{{ form.birthDate }} ({{ computedAge }} ปี)</span>
                            </div>
                            <div class="bg-slate-50/50 p-4 rounded-2xl border border-slate-100/60 md:col-span-2">
                                <span class="text-xs font-bold text-slate-400 block mb-1">เลขบัตรประชาชน</span>
                                <span class="text-sm md:text-base font-black text-slate-800 tracking-wider">{{ form.idCard }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- SECTION 02: การติดต่อ -->
                    <div id="section-02" class="bg-white rounded-3xl p-6 border border-gray-100 shadow-xl shadow-slate-200/40 relative animate-fade-in">
                        <div class="flex items-center gap-3 mb-6 pb-4 border-b border-gray-50">
                            <div class="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-xl font-black text-sm flex items-center justify-center shrink-0">02</div>
                            <div>
                                <h2 class="text-base md:text-lg font-black text-slate-800 tracking-tight">ช่องทางการติดต่อ & ที่อยู่</h2>
                                <p class="text-xs font-semibold text-gray-400 mt-0.5">เบอร์โทร, LINE, อีเมล และผู้ติดต่อกรณีฉุกเฉิน</p>
                            </div>
                        </div>

                        <!-- Contact Edit Mode vs View Mode -->
                        <div v-if="isEditMode" class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label class="block text-xs md:text-sm font-bold text-slate-700 mb-1.5">เบอร์โทรหลัก <span class="text-rose-500">*</span></label>
                                <input v-model="form.mobile" type="text" class="w-full bg-slate-50 border border-gray-200 rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 focus:bg-white focus:border-indigo-500 outline-none" />
                            </div>
                            <div>
                                <label class="block text-xs md:text-sm font-bold text-slate-700 mb-1.5">เบอร์โทรสำรอง</label>
                                <input v-model="form.homePhone" type="text" class="w-full bg-slate-50 border border-gray-200 rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 focus:bg-white focus:border-indigo-500 outline-none" />
                            </div>
                            <div>
                                <label class="block text-xs md:text-sm font-bold text-slate-700 mb-1.5">LINE ID</label>
                                <input v-model="form.lineId" type="text" class="w-full bg-slate-50 border border-gray-200 rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 focus:bg-white focus:border-indigo-500 outline-none" />
                            </div>
                            <div>
                                <label class="block text-xs md:text-sm font-bold text-slate-700 mb-1.5">อีเมล</label>
                                <input v-model="form.email" type="text" class="w-full bg-slate-50 border border-gray-200 rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 focus:bg-white focus:border-indigo-500 outline-none" />
                            </div>
                            <div class="md:col-span-2">
                                <label class="block text-xs md:text-sm font-bold text-slate-700 mb-1.5">ที่อยู่ปัจจุบัน</label>
                                <input v-model="form.address" type="text" class="w-full bg-slate-50 border border-gray-200 rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 focus:bg-white focus:border-indigo-500 outline-none" />
                            </div>
                            <div>
                                <label class="block text-xs md:text-sm font-bold text-slate-700 mb-1.5">ผู้ติดต่อกรณีฉุกเฉิน</label>
                                <input v-model="form.emergencyName" type="text" class="w-full bg-slate-50 border border-gray-200 rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 focus:bg-white focus:border-indigo-500 outline-none" />
                            </div>
                            <div>
                                <label class="block text-xs md:text-sm font-bold text-slate-700 mb-1.5">ความสัมพันธ์</label>
                                <select v-model="form.emergencyRelation" class="w-full bg-slate-50 border border-gray-200 rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 focus:bg-white focus:border-indigo-500 outline-none">
                                    <option>— เลือก —</option>
                                    <option>บิดา / มารดา</option>
                                    <option>สามี / ภรรยา</option>
                                    <option>บุตร</option>
                                    <option>ญาติ</option>
                                    <option>เพื่อน</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-xs md:text-sm font-bold text-slate-700 mb-1.5">เบอร์โทรกรณีฉุกเฉิน</label>
                                <input v-model="form.emergencyMobile" type="text" class="w-full bg-slate-50 border border-gray-200 rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 focus:bg-white focus:border-indigo-500 outline-none" />
                            </div>
                        </div>

                        <!-- Readonly View Mode -->
                        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="bg-slate-50/50 p-4 rounded-2xl border border-slate-100/60 flex items-center gap-3">
                                <UIcon name="i-lucide-phone" class="w-5 h-5 text-indigo-500 shrink-0" />
                                <div>
                                    <span class="text-xs font-bold text-slate-400 block">เบอร์โทรหลัก / สำรอง</span>
                                    <span class="text-sm font-black text-slate-800">{{ form.mobile }} <span v-if="form.homePhone" class="text-xs text-gray-400 font-bold">({{ form.homePhone }})</span></span>
                                </div>
                            </div>
                            <div class="bg-slate-50/50 p-4 rounded-2xl border border-slate-100/60 flex items-center gap-3">
                                <UIcon name="i-lucide-message-circle" class="w-5 h-5 text-emerald-500 shrink-0" />
                                <div>
                                    <span class="text-xs font-bold text-slate-400 block">LINE ID</span>
                                    <span class="text-sm font-black text-slate-800">{{ form.lineId || '—' }}</span>
                                </div>
                            </div>
                            <div class="bg-slate-50/50 p-4 rounded-2xl border border-slate-100/60 flex items-center gap-3">
                                <UIcon name="i-lucide-mail" class="w-5 h-5 text-blue-500 shrink-0" />
                                <div>
                                    <span class="text-xs font-bold text-slate-400 block">อีเมล</span>
                                    <span class="text-sm font-black text-slate-800">{{ form.email || '—' }}</span>
                                </div>
                            </div>
                            <div class="bg-slate-50/50 p-4 rounded-2xl border border-slate-100/60 flex items-center gap-3">
                                <UIcon name="i-lucide-map-pin" class="w-5 h-5 text-rose-500 shrink-0" />
                                <div>
                                    <span class="text-xs font-bold text-slate-400 block">ที่อยู่</span>
                                    <span class="text-sm font-black text-slate-800 leading-relaxed">{{ form.address || '—' }}</span>
                                </div>
                            </div>
                            <div class="bg-slate-50/50 p-4 rounded-2xl border border-slate-100/60 flex items-center gap-3 md:col-span-2">
                                <UIcon name="i-lucide-shield-alert" class="w-5 h-5 text-amber-500 shrink-0" />
                                <div>
                                    <span class="text-xs font-bold text-slate-400 block">ผู้ติดต่อฉุกเฉิน</span>
                                    <span class="text-sm font-black text-slate-800">{{ form.emergencyName ? `${form.emergencyName} (${form.emergencyRelation}) — โทร ${form.emergencyMobile}` : '— ไม่ได้ระบุ —' }}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- SECTION 03: ข้อมูลสุขภาพ -->
                    <div id="section-03" class="bg-white rounded-3xl p-6 border border-gray-100 shadow-xl shadow-slate-200/40 relative animate-fade-in">
                        <div class="flex items-center gap-3 mb-6 pb-4 border-b border-gray-50">
                            <div class="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-xl font-black text-sm flex items-center justify-center shrink-0">03</div>
                            <div>
                                <h2 class="text-base md:text-lg font-black text-slate-800 tracking-tight">ข้อมูลความปลอดภัยและสุขภาพ</h2>
                                <p class="text-xs font-semibold text-gray-400 mt-0.5">ประวัติแพ้ยา โรคประจำตัว สิ่งที่ทีมรักษาควรระมัดระวัง</p>
                            </div>
                        </div>

                        <!-- Health Info Fields (Always Interactive Tags pool but clickable only in edit mode) -->
                        <div class="space-y-6">
                            <div>
                                <label class="block text-xs md:text-sm font-bold text-slate-700 mb-2">ประวัติการแพ้ยา / สารเคมี <span v-if="isEditMode" class="text-indigo-500 font-bold">(คลิกเพื่อเปิด/ปิด)</span></label>
                                <div class="flex flex-wrap gap-2">
                                    <button
                                        type="button"
                                        v-for="tag in availableAllergies"
                                        :key="tag"
                                        class="text-xs md:text-sm px-3.5 py-2 rounded-full border font-bold transition-all flex items-center gap-1.5 shadow-sm"
                                        :class="form.drugAllergies.includes(tag) ? 'bg-rose-50 border-rose-200 text-rose-600' : 'bg-white border-gray-200 text-slate-500 hover:bg-slate-50'"
                                        :disabled="!isEditMode"
                                        @click="toggleAllergy(tag)"
                                    >
                                        <UIcon v-if="form.drugAllergies.includes(tag)" name="i-lucide-check" class="w-3.5 h-3.5" />
                                        <span>{{ tag }}</span>
                                    </button>
                                    <button
                                        v-if="isEditMode && !showAddAllergy"
                                        type="button"
                                        class="text-xs md:text-sm px-3.5 py-2 rounded-full border border-gray-200 bg-slate-50 text-slate-500 hover:bg-slate-100 font-bold flex items-center gap-1 cursor-pointer"
                                        @click="showAddAllergy = true"
                                    >
                                        <UIcon name="i-lucide-plus" class="w-3.5 h-3.5" />
                                        <span>เพิ่ม</span>
                                    </button>
                                    <div v-else-if="isEditMode" class="flex items-center gap-1 bg-white border border-indigo-200 rounded-full px-2 py-0.5 shadow-sm">
                                        <input v-model="newAllergyInput" type="text" placeholder="พิมพ์แพ้ยา..." class="bg-transparent text-xs md:text-sm font-semibold px-2 py-0.5 outline-none w-20 text-slate-700" @keyup.enter="addCustomAllergy" />
                                        <button type="button" class="bg-indigo-600 text-white rounded-full p-1 flex items-center justify-center cursor-pointer animate-scale-in" @click="addCustomAllergy">
                                            <UIcon name="i-lucide-check" class="w-3 h-3" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label class="block text-xs md:text-sm font-bold text-slate-700 mb-2">โรคประจำตัว / ภาวะสุขภาพ <span v-if="isEditMode" class="text-indigo-500 font-bold">(คลิกเพื่อเปิด/ปิด)</span></label>
                                <div class="flex flex-wrap gap-2">
                                    <button
                                        type="button"
                                        v-for="tag in availableDiseases"
                                        :key="tag"
                                        class="text-xs md:text-sm px-3.5 py-2 rounded-full border font-bold transition-all flex items-center gap-1.5 shadow-sm"
                                        :class="form.chronicDiseases.includes(tag) ? 'bg-indigo-50 border-indigo-200 text-indigo-600' : 'bg-white border-gray-200 text-slate-500 hover:bg-slate-50'"
                                        :disabled="!isEditMode"
                                        @click="toggleDisease(tag)"
                                    >
                                        <UIcon v-if="form.chronicDiseases.includes(tag)" name="i-lucide-check" class="w-3.5 h-3.5" />
                                        <span>{{ tag }}</span>
                                    </button>
                                    <button
                                        v-if="isEditMode && !showAddDisease"
                                        type="button"
                                        class="text-xs md:text-sm px-3.5 py-2 rounded-full border border-gray-200 bg-slate-50 text-slate-500 hover:bg-slate-100 font-bold flex items-center gap-1 cursor-pointer"
                                        @click="showAddDisease = true"
                                    >
                                        <UIcon name="i-lucide-plus" class="w-3.5 h-3.5" />
                                        <span>เพิ่ม</span>
                                    </button>
                                    <div v-else-if="isEditMode" class="flex items-center gap-1 bg-white border border-indigo-200 rounded-full px-2 py-0.5 shadow-sm">
                                        <input v-model="newDiseaseInput" type="text" placeholder="พิมพ์โรคประจำตัว..." class="bg-transparent text-xs md:text-sm font-semibold px-2 py-0.5 outline-none w-24 text-slate-700" @keyup.enter="addCustomDisease" />
                                        <button type="button" class="bg-indigo-600 text-white rounded-full p-1 flex items-center justify-center cursor-pointer animate-scale-in" @click="addCustomDisease">
                                            <UIcon name="i-lucide-check" class="w-3 h-3" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label class="block text-xs md:text-sm font-bold text-slate-700 mb-1.5">หมายเหตุเพิ่มเติม / สิ่งที่ควรระวัง</label>
                                <textarea
                                    v-model="form.medicalNotes"
                                    rows="3"
                                    :readonly="!isEditMode"
                                    placeholder="เช่น ประวัติเสริมจมูกมา, ชอบอุณหภูมิห้องค่อนข้างอุ่น..."
                                    class="w-full bg-slate-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 focus:bg-white focus:border-indigo-500 outline-none resize-none font-semibold transition-all"
                                    :class="!isEditMode ? 'bg-slate-50/50 border-slate-100/60 text-slate-800' : ''"
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    <!-- SECTION 04: การยินยอม -->
                    <div id="section-04" class="bg-white rounded-3xl p-6 border border-gray-100 shadow-xl shadow-slate-200/40 relative animate-fade-in">
                        <div class="flex items-center gap-3 mb-6 pb-4 border-b border-gray-50">
                            <div class="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-xl font-black text-sm flex items-center justify-center shrink-0">04</div>
                            <div>
                                <h2 class="text-base md:text-lg font-black text-slate-800 tracking-tight">การยินยอมพระราชบัญญัติคุ้มครองข้อมูล (PDPA)</h2>
                                <p class="text-xs font-semibold text-gray-400 mt-0.5">การเก็บข้อมูลและการยินยอมให้ติดต่อรับข่าวสารทางตลาด</p>
                            </div>
                        </div>

                        <div class="space-y-4">
                            <div class="flex items-start justify-between p-3.5 border border-slate-100 rounded-2xl bg-slate-50/30">
                                <div>
                                    <h4 class="text-sm font-bold text-slate-800">ยินยอมให้เก็บข้อมูลส่วนบุคคล (PDPA)</h4>
                                    <p class="text-xs text-gray-400 font-semibold mt-0.5">ลูกค้ายินยอมให้คลินิกเก็บและใช้ข้อมูลเพื่อการรักษาอย่างปลอดภัย</p>
                                </div>
                                <USwitch v-model="form.pdpaConsent" :disabled="!isEditMode" color="primary" class="cursor-pointer" />
                            </div>

                            <div class="flex items-start justify-between p-3.5 border border-slate-100 rounded-2xl bg-slate-50/30">
                                <div>
                                    <h4 class="text-sm font-bold text-slate-800">ส่งโปรโมชั่น & ข่าวสารทาง LINE</h4>
                                    <p class="text-xs text-gray-400 font-semibold mt-0.5">ยินยอมให้แจ้งสิทธิประโยชน์และแพ็กเกจผ่าน LINE OA</p>
                                </div>
                                <USwitch v-model="form.linePromoConsent" :disabled="!isEditMode" color="primary" class="cursor-pointer" />
                            </div>

                            <div class="flex items-start justify-between p-3.5 border border-slate-100 rounded-2xl bg-slate-50/30">
                                <div>
                                    <h4 class="text-sm font-bold text-slate-800">แจ้งเตือนนัดทาง SMS</h4>
                                    <p class="text-xs text-gray-400 font-semibold mt-0.5">ส่ง SMS แจ้งเตือนการยืนยันคิวล่วงหน้า 24 ชั่วโมง</p>
                                </div>
                                <USwitch v-model="form.smsNoticeConsent" :disabled="!isEditMode" color="primary" class="cursor-pointer" />
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Action Footer (Shown only in Edit Mode) -->
                <div v-if="isEditMode" class="bg-white rounded-3xl p-5 border border-gray-100 shadow-xl shadow-slate-200/30 flex items-center justify-between gap-4 animate-scale-in">
                    <button
                        type="button"
                        class="px-6 py-2.5 rounded-2xl hover:bg-slate-50 text-slate-500 hover:text-slate-700 font-bold text-xs md:text-sm cursor-pointer transition-all"
                        @click="cancelEdit"
                    >
                        ยกเลิกการแก้ไข
                    </button>

                    <button
                        type="button"
                        class="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-extrabold text-xs md:text-sm px-8 py-3 rounded-2xl shadow-lg shadow-indigo-500/20 flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0 transition-all"
                        :disabled="isLoading"
                        @click="saveChanges"
                    >
                        <UIcon v-if="isLoading" name="i-heroicons-arrow-path" class="w-4 h-4 animate-spin" />
                        <UIcon v-else name="i-heroicons-check-circle" class="w-4.5 h-4.5" />
                        <span>บันทึกการแก้ไข</span>
                    </button>
                </div>
            </div>

            <!-- ── Right Column: Sticky Patient Summary & Quick Actions ── -->
            <div class="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
                <!-- Patient Live Preview Clinic Card -->
                <div class="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-slate-200/40 overflow-hidden relative">
                    <!-- Top Gradient -->
                    <div class="h-20 bg-gradient-to-tr from-indigo-600 to-indigo-800 p-4 flex items-start justify-between relative overflow-hidden">
                        <span class="text-xs font-black text-indigo-200 uppercase tracking-widest bg-indigo-900/30 px-2.5 py-0.5 rounded-md border border-indigo-400/20 backdrop-blur-md">เวชระเบียนคลินิก</span>
                        <span class="text-xs font-bold text-white/80">CN-{{ form.hn }}</span>
                    </div>

                    <!-- Card Body -->
                    <div class="p-6 pt-0 relative text-center">
                        <!-- Avatar overlapping top header -->
                        <div class="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center font-black text-2xl shadow-md -mt-10 mb-4 mx-auto relative z-10 shrink-0" :class="form.avatarColor || 'bg-indigo-100 text-indigo-600'">
                            {{ avatarInitials }}
                        </div>

                        <h3 class="text-base font-black text-slate-800">
                            {{ form.title }} {{ form.firstName }} {{ form.lastName }}
                        </h3>
                        <p class="text-xs text-gray-400 font-bold mt-1 flex items-center justify-center gap-1.5">
                            <span>เพศ: {{ form.gender }}</span>
                            <span class="text-slate-300">•</span>
                            <span>อายุ: {{ computedAge }} ปี</span>
                        </p>

                        <!-- Divider -->
                        <div class="border-b border-gray-100 my-4"></div>

                        <!-- Clinic Metrics Info -->
                        <div class="grid grid-cols-3 gap-2 text-left mb-4">
                            <div class="bg-slate-50 p-2 rounded-xl border border-slate-100">
                                <span class="text-[9px] font-bold text-gray-400 block uppercase">เข้ารับบริการ</span>
                                <span class="text-sm font-black text-indigo-600 block mt-0.5">14 ครั้ง</span>
                            </div>
                            <div class="bg-slate-50 p-2 rounded-xl border border-slate-100">
                                <span class="text-[9px] font-bold text-gray-400 block uppercase">ยอดใช้จ่าย</span>
                                <span class="text-sm font-black text-emerald-600 block mt-0.5">42.8k ฿</span>
                            </div>
                            <div class="bg-slate-50 p-2 rounded-xl border border-slate-100">
                                <span class="text-[9px] font-bold text-gray-400 block uppercase">พบแพทย์ล่าสุด</span>
                                <span class="text-xs font-black text-slate-700 block mt-1 truncate">หมอโอ๊ค</span>
                            </div>
                        </div>

                        <!-- Sticky summary info lists -->
                        <div class="space-y-3.5 text-left text-xs">
                            <div class="flex items-center gap-2.5">
                                <UIcon name="i-lucide-phone" class="w-4 h-4 text-slate-400" />
                                <span class="font-semibold text-slate-700">{{ form.mobile || '—' }}</span>
                            </div>
                            <div class="flex items-center gap-2.5">
                                <UIcon name="i-lucide-message-circle" class="w-4 h-4 text-slate-400" />
                                <span class="font-semibold text-slate-700">{{ form.lineId || '—' }}</span>
                            </div>
                            <div class="flex items-center gap-2.5">
                                <UIcon name="i-lucide-shield-alert" class="w-4 h-4 text-rose-400" />
                                <span class="font-bold text-rose-500" v-if="form.drugAllergies.length > 0">แพ้ยา: {{ form.drugAllergies.join(', ') }}</span>
                                <span class="font-semibold text-slate-400" v-else>ไม่มีประวัติแพ้ยา</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Quick Clinic Actions -->
                <div class="bg-white rounded-3xl p-6 border border-gray-100 shadow-xl shadow-slate-200/40 space-y-3">
                    <h4 class="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 block">ทางลัดบริการ (Quick Actions)</h4>

                    <button
                        type="button"
                        class="w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs md:text-sm py-3 px-4 rounded-2xl flex items-center justify-between transition-all cursor-pointer"
                        @click="toast.info('นัดหมายล่วงหน้า', `ระบบนัดหมายสำหรับ ${form.firstName} จองเวลาถัดไป...`)"
                    >
                        <span class="flex items-center gap-2">
                            <UIcon name="i-lucide-calendar" class="w-4 h-4" />
                            <span>นัดหมายทรีตเมนต์ถัดไป</span>
                        </span>
                        <UIcon name="i-lucide-chevron-right" class="w-4 h-4" />
                    </button>

                    <button
                        type="button"
                        class="w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs md:text-sm py-3 px-4 rounded-2xl flex items-center justify-between transition-all cursor-pointer"
                        @click="toast.success('ปรึกษาออนไลน์', `เริ่มการจัดห้องเทเลคอนซัลต์ให้กับคนไข้ HN ${form.hn}`)"
                    >
                        <span class="flex items-center gap-2">
                            <UIcon name="i-lucide-video" class="w-4 h-4" />
                            <span>เปิดห้อง Teleconsult ทันที</span>
                        </span>
                        <UIcon name="i-lucide-chevron-right" class="w-4 h-4" />
                    </button>

                    <button
                        type="button"
                        class="w-full bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs md:text-sm py-3 px-4 rounded-2xl flex items-center justify-between transition-all cursor-pointer"
                        @click="toast.info('เวชระเบียนย่อ', 'พิมพ์รายงานเวชระเบียนย่อลงกระดาษ A4 หรือบันทึก PDF')"
                    >
                        <span class="flex items-center gap-2">
                            <UIcon name="i-lucide-printer" class="w-4 h-4" />
                            <span>พิมพ์บันทึกเวชระเบียนย่อ (OPD Card)</span>
                        </span>
                        <UIcon name="i-lucide-chevron-right" class="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
