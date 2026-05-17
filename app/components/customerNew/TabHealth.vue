<script setup lang="ts">
    import { ref } from 'vue'

    const props = defineProps<{
        form: any
    }>()

    // Allergies & diseases pools
    const availableAllergies = ref(['Penicillin', 'Lidocaine', 'Sulfa', 'Aspirin', 'Latex', 'Iodine', 'อาหารทะเล'])
    const availableDiseases = ref(['ความดันสูง', 'ความดันต่ำ', 'เบาหวาน', 'หอบหืด', 'ผิวแพ้ง่าย', 'แผลคีลอยด์', 'ตั้งครรภ์/ให้นมบุตร', 'ไทรอยด์'])

    const newAllergyInput = ref('')
    const newDiseaseInput = ref('')
    const showAddAllergy = ref(false)
    const showAddDisease = ref(false)

    // Tag handlers
    const toggleAllergy = (tag: string) => {
        const idx = props.form.drugAllergies.indexOf(tag)
        if (idx > -1) {
            props.form.drugAllergies.splice(idx, 1)
        } else {
            props.form.drugAllergies.push(tag)
        }
    }

    const toggleDisease = (tag: string) => {
        const idx = props.form.chronicDiseases.indexOf(tag)
        if (idx > -1) {
            props.form.chronicDiseases.splice(idx, 1)
        } else {
            props.form.chronicDiseases.push(tag)
        }
    }

    const addCustomAllergy = () => {
        if (newAllergyInput.value.trim()) {
            const tag = newAllergyInput.value.trim()
            if (!availableAllergies.value.includes(tag)) {
                availableAllergies.value.push(tag)
            }
            props.form.drugAllergies.push(tag)
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
            props.form.chronicDiseases.push(tag)
            newDiseaseInput.value = ''
            showAddDisease.value = false
        }
    }
</script>

<template>
    <div id="section-03" class="bg-white rounded-3xl p-6 border border-gray-100 shadow-xl shadow-slate-200/40 relative animate-fade-in">
        <!-- Section Header -->
        <div class="flex items-start justify-between mb-6 pb-4 border-b border-gray-50">
            <div class="flex items-center gap-3">
                <div class="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-xl font-black text-sm flex items-center justify-center shrink-0">
                    03
                </div>
                <div>
                    <h2 class="text-base md:text-lg font-black text-slate-800 tracking-tight">ข้อมูลทางการแพทย์ & ความชอบ</h2>
                    <p class="text-xs font-semibold text-gray-400 mt-0.5">ป้องกันการแพ้และจัดประสบการณ์ให้เหมาะกับลูกค้า</p>
                </div>
            </div>
            <span class="text-xs font-bold text-gray-400 bg-slate-50 px-2 py-0.5 rounded-lg border border-slate-100">ไม่บังคับ</span>
        </div>

        <!-- Medical fields -->
        <div class="space-y-5">
            <!-- ประวัติแพ้ยา / สารเคมี -->
            <div>
                <label class="block text-xs md:text-sm font-bold text-slate-700 mb-2">ประวัติการแพ้ยา / สารเคมี <span class="text-gray-400 font-bold">(ไม่บังคับ)</span></label>
                
                <!-- Interactive Capsule Tags -->
                <div class="flex flex-wrap gap-2 mb-3">
                    <button
                        type="button"
                        v-for="tag in availableAllergies"
                        :key="tag"
                        class="text-xs md:text-sm px-3.5 py-2 rounded-full border font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                        :class="form.drugAllergies.includes(tag) ? 'bg-rose-50 border-rose-200 text-rose-600' : 'bg-white border-gray-200 text-slate-500 hover:bg-slate-50'"
                        @click="toggleAllergy(tag)"
                    >
                        <UIcon v-if="form.drugAllergies.includes(tag)" name="i-lucide-check" class="w-3.5 h-3.5" />
                        <span>{{ tag }}</span>
                    </button>
                    
                    <!-- Toggle Input Field to Add Tag -->
                    <button
                        type="button"
                        v-if="!showAddAllergy"
                        class="text-xs md:text-sm px-3.5 py-2 rounded-full border border-gray-200 bg-slate-50 text-slate-500 hover:bg-slate-100 font-bold flex items-center gap-1 cursor-pointer transition-all"
                        @click="showAddAllergy = true"
                    >
                        <UIcon name="i-lucide-plus" class="w-3.5 h-3.5" />
                        <span>เพิ่ม</span>
                    </button>
                    <div v-else class="flex items-center gap-1 bg-white border border-indigo-200 rounded-full px-2 py-0.5 shadow-sm">
                        <input
                            v-model="newAllergyInput"
                            type="text"
                            placeholder="พิมพ์แพ้ยา..."
                            class="bg-transparent text-xs md:text-sm font-semibold px-2 py-0.5 outline-none w-20 text-slate-700"
                            @keyup.enter="addCustomAllergy"
                        />
                        <button type="button" class="bg-indigo-600 text-white rounded-full p-1 flex items-center justify-center cursor-pointer" @click="addCustomAllergy">
                            <UIcon name="i-lucide-check" class="w-3 h-3" />
                        </button>
                    </div>
                </div>
            </div>

            <!-- โรคประจำตัว / ภาวะสุขภาพ -->
            <div>
                <label class="block text-xs md:text-sm font-bold text-slate-700 mb-2">โรคประจำตัว / ภาวะสุขภาพ <span class="text-gray-400 font-bold">(ไม่บังคับ)</span></label>
                
                <!-- Interactive Capsule Tags -->
                <div class="flex flex-wrap gap-2 mb-3">
                    <button
                        type="button"
                        v-for="tag in availableDiseases"
                        :key="tag"
                        class="text-xs md:text-sm px-3.5 py-2 rounded-full border font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                        :class="form.chronicDiseases.includes(tag) ? 'bg-indigo-50 border-indigo-200 text-indigo-600' : 'bg-white border-gray-200 text-slate-500 hover:bg-slate-50'"
                        @click="toggleDisease(tag)"
                    >
                        <UIcon v-if="form.chronicDiseases.includes(tag)" name="i-lucide-check" class="w-3.5 h-3.5" />
                        <span>{{ tag }}</span>
                    </button>

                    <!-- Toggle Input Field to Add Tag -->
                    <button
                        type="button"
                        v-if="!showAddDisease"
                        class="text-xs md:text-sm px-3.5 py-2 rounded-full border border-gray-200 bg-slate-50 text-slate-500 hover:bg-slate-100 font-bold flex items-center gap-1 cursor-pointer transition-all"
                        @click="showAddDisease = true"
                    >
                        <UIcon name="i-lucide-plus" class="w-3.5 h-3.5" />
                        <span>เพิ่ม</span>
                    </button>
                    <div v-else class="flex items-center gap-1 bg-white border border-indigo-200 rounded-full px-2 py-0.5 shadow-sm">
                        <input
                            v-model="newDiseaseInput"
                            type="text"
                            placeholder="พิมพ์โรคประจำตัว..."
                            class="bg-transparent text-xs md:text-sm font-semibold px-2 py-0.5 outline-none w-24 text-slate-700"
                            @keyup.enter="addCustomDisease"
                        />
                        <button type="button" class="bg-indigo-600 text-white rounded-full p-1 flex items-center justify-center cursor-pointer" @click="addCustomDisease">
                            <UIcon name="i-lucide-check" class="w-3 h-3" />
                        </button>
                    </div>
                </div>
            </div>

            <!-- หมายเหตุเพิ่มเติม / สิ่งที่ควรระวัง -->
            <div>
                <label class="block text-xs md:text-sm font-bold text-slate-700 mb-1.5">หมายเหตุเพิ่มเติม / สิ่งที่ควรระวัง <span class="text-gray-400 font-bold">(ไม่บังคับ)</span></label>
                <textarea
                    v-model="form.medicalNotes"
                    rows="3"
                    placeholder="เช่น แพ้ผลิตภัณฑ์ที่มีน้ำหอม, เคยมีรอยช้ำหลังฉีด, ชอบ/ไม่ชอบบริการแบบใด..."
                    class="w-full bg-slate-50 border border-gray-200 rounded-2xl px-3 py-2 text-sm font-semibold text-slate-700 focus:bg-white focus:border-indigo-500 outline-none resize-none font-semibold"
                ></textarea>
            </div>

            <!-- Dropdowns Grid -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <!-- รู้จักเราจากที่ไหน -->
                <div>
                    <label class="block text-xs md:text-sm font-bold text-slate-700 mb-1.5">รู้จักเราจากที่ไหน <span class="text-gray-400 font-bold">(ไม่บังคับ)</span></label>
                    <select
                        v-model="form.leadSource"
                        class="w-full bg-slate-50 border border-gray-200 rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 focus:bg-white focus:border-indigo-500 outline-none"
                    >
                        <option>Facebook / Instagram</option>
                        <option>TikTok</option>
                        <option>เพื่อนแนะนำ</option>
                        <option>Google Search</option>
                        <option>ป้ายหน้าคลินิก</option>
                    </select>
                </div>

                <!-- พนักงานแนะนำ -->
                <div>
                    <label class="block text-xs md:text-sm font-bold text-slate-700 mb-1.5">พนักงานแนะนำ <span class="text-gray-400 font-bold">(ไม่บังคับ)</span></label>
                    <select
                        v-model="form.referredBy"
                        class="w-full bg-slate-50 border border-gray-200 rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 focus:bg-white focus:border-indigo-500 outline-none"
                    >
                        <option>— ไม่ระบุ —</option>
                        <option>สมใจ รักดี</option>
                        <option>พยาบาลจอย</option>
                        <option>หมอโอ๊ค</option>
                    </select>
                </div>

                <!-- กลุ่มลูกค้า -->
                <div>
                    <label class="block text-xs md:text-sm font-bold text-slate-700 mb-1.5">กลุ่มลูกค้า <span class="text-gray-400 font-bold">(ไม่บังคับ)</span></label>
                    <select
                        v-model="form.customerGroup"
                        class="w-full bg-slate-50 border border-gray-200 rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 focus:bg-white focus:border-indigo-500 outline-none"
                    >
                        <option>Standard</option>
                        <option>VIP</option>
                        <option>VVIP</option>
                        <option>Corporate</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
</template>
