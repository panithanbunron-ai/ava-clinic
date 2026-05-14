<script setup lang="ts">
    defineProps<{ form: any }>()
</script>

<template>
    <div class="space-y-10 max-w-4xl mx-auto">
        <!-- Basic Health -->
        <div class="space-y-6">
            <div class="border-b border-gray-100 pb-3">
                <h2 class="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <UIcon
                        name="i-heroicons-clipboard-document-list"
                        class="w-5 h-5 text-blue-500"
                    />
                    ข้อมูลพื้นฐาน
                </h2>
                <p class="text-xs text-gray-400 mt-1">กรุ๊ปเลือดและสิทธิการรักษาพยาบาล</p>
            </div>

            <div
                class="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-2xl p-6 ring-1 ring-gray-200 shadow-sm"
            >
                <UFormGroup label="กรุ๊ปเลือด (Blood Type)" class="font-bold text-gray-800">
                    <div class="grid grid-cols-4 gap-3 mt-2">
                        <button
                            v-for="bg in ['A', 'B', 'AB', 'O']"
                            :key="bg"
                            type="button"
                            class="py-3 rounded-xl text-base font-black transition-all shadow-sm"
                            :class="
                                form.bloodGroup === bg
                                    ? 'bg-gradient-to-b from-red-500 to-red-600 text-white shadow-red-500/30 scale-105'
                                    : 'bg-white ring-1 ring-gray-200 text-gray-600 hover:bg-red-50 hover:text-red-500 hover:ring-red-200'
                            "
                            @click="form.bloodGroup = bg"
                        >
                            {{ bg }}
                        </button>
                    </div>
                    <div class="grid grid-cols-2 gap-3 mt-3">
                        <button
                            v-for="r in ['Rh+', 'Rh-']"
                            :key="r"
                            type="button"
                            class="py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm"
                            :class="
                                form.rh === r
                                    ? 'bg-blue-600 text-white shadow-blue-500/30 scale-105'
                                    : 'bg-white ring-1 ring-gray-200 text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:ring-blue-200'
                            "
                            @click="form.rh = r"
                        >
                            {{ r }}
                        </button>
                    </div>
                </UFormGroup>

                <UFormGroup label="สิทธิการรักษา (Treatment Right)" class="font-bold text-gray-800">
                    <div class="grid grid-cols-2 gap-3 mt-2">
                        <button
                            v-for="right in ['เงินสด', 'ประกันสังคม', 'บัตรทอง', 'ประกันชีวิต']"
                            :key="right"
                            type="button"
                            class="py-3 px-2 rounded-xl text-sm font-bold transition-all shadow-sm h-full flex items-center justify-center"
                            :class="
                                form.treatmentRight === right
                                    ? 'bg-emerald-500 text-white shadow-emerald-500/30 scale-105'
                                    : 'bg-white ring-1 ring-gray-200 text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 hover:ring-emerald-200'
                            "
                            @click="form.treatmentRight = right"
                        >
                            {{ right }}
                        </button>
                    </div>
                </UFormGroup>
            </div>
        </div>

        <!-- Allergy -->
        <div class="space-y-6 pt-4 relative">
            <div
                class="absolute right-0 top-0 px-4 py-1.5 bg-red-100 text-red-700 text-xs font-black rounded-full border border-red-200 flex items-center gap-1.5 shadow-sm animate-pulse"
            >
                <UIcon name="i-heroicons-exclamation-triangle-solid" class="w-4 h-4" />
                สำคัญต่อความปลอดภัย
            </div>
            <div class="border-b border-gray-100 pb-3">
                <h2 class="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <UIcon name="i-heroicons-shield-exclamation" class="w-5 h-5 text-red-500" />
                    ประวัติการแพ้
                </h2>
                <p class="text-xs text-gray-400 mt-1">
                    ข้อมูลการแพ้ยาและแพ้อาหาร (จำเป็นต้องระบุหากมี)
                </p>
            </div>

            <div class="bg-red-50/30 rounded-2xl p-6 ring-1 ring-red-100 shadow-sm space-y-6">
                <UFormGroup label="แพ้ยา (Drug Allergy)" class="font-bold text-red-800">
                    <div
                        class="flex flex-wrap items-center gap-2 p-2 bg-white ring-1 ring-gray-200 rounded-xl min-h-[56px] focus-within:ring-2 focus-within:ring-red-400 focus-within:ring-offset-1 transition-shadow shadow-inner"
                    >
                        <div
                            v-for="drug in form.drugAllergies"
                            :key="drug"
                            class="flex items-center px-3 py-1.5 bg-gradient-to-r from-red-500 to-rose-500 text-white font-semibold rounded-lg text-sm shadow-sm"
                        >
                            <UIcon
                                name="i-heroicons-beaker"
                                class="w-3.5 h-3.5 mr-1.5 opacity-80"
                            />
                            {{ drug }}
                            <button
                                @click="
                                    form.drugAllergies = form.drugAllergies.filter(
                                        (d: string) => d !== drug
                                    )
                                "
                                class="ml-2 hover:bg-white/20 rounded-full p-0.5 transition-colors"
                            >
                                <UIcon name="i-heroicons-x-mark" class="w-3.5 h-3.5" />
                            </button>
                        </div>
                        <input
                            type="text"
                            placeholder="พิมพ์ชื่อยาแล้วกด Enter..."
                            class="flex-1 outline-none bg-transparent text-sm min-w-[200px] p-2 text-gray-700 font-medium placeholder-gray-400"
                            @keydown.enter.prevent="
                                if (($event.target as HTMLInputElement).value) {
                                    form.drugAllergies.push(
                                        ($event.target as HTMLInputElement).value
                                    )
                                    ;($event.target as HTMLInputElement).value = ''
                                }
                            "
                        />
                    </div>
                </UFormGroup>

                <UFormGroup label="แพ้อาหาร (Food Allergy)" class="font-bold text-orange-800">
                    <div class="flex flex-wrap gap-3 mt-2">
                        <button
                            v-for="food in ['กุ้ง', 'นม', 'ถั่ว', 'ไข่']"
                            :key="food"
                            type="button"
                            class="px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center shadow-sm"
                            :class="
                                form.foodAllergies.includes(food)
                                    ? 'bg-amber-500 text-white shadow-amber-500/30 scale-105'
                                    : 'bg-white ring-1 ring-gray-200 text-gray-600 hover:bg-amber-50 hover:text-amber-600 hover:ring-amber-200'
                            "
                            @click="
                                form.foodAllergies.includes(food)
                                    ? (form.foodAllergies = form.foodAllergies.filter(
                                          (f: string) => f !== food
                                      ))
                                    : form.foodAllergies.push(food)
                            "
                        >
                            <UIcon
                                v-if="form.foodAllergies.includes(food)"
                                name="i-heroicons-check-circle"
                                class="w-4 h-4 mr-1.5"
                            />
                            {{ food }}
                        </button>
                        <button
                            type="button"
                            class="px-5 py-2.5 rounded-xl border-2 border-dashed border-gray-300 text-gray-500 font-bold text-sm hover:bg-gray-50 hover:border-gray-400 transition-colors bg-white/80"
                        >
                            + ระบุอาหารอื่น
                        </button>
                    </div>
                </UFormGroup>
            </div>
        </div>

        <!-- Disease & Notes -->
        <div class="space-y-6 pt-4">
            <div class="border-b border-gray-100 pb-3">
                <h2 class="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <UIcon name="i-heroicons-heart" class="w-5 h-5 text-rose-500" />
                    โรคประจำตัวและหมายเหตุ
                </h2>
                <p class="text-xs text-gray-400 mt-1">ข้อมูลสุขภาพอื่นๆ ที่แพทย์และพยาบาลควรทราบ</p>
            </div>

            <div
                class="bg-slate-900 rounded-3xl p-8 shadow-xl shadow-slate-900/20 space-y-8 relative overflow-hidden"
            >
                <!-- Abstract dark background decorations -->
                <div
                    class="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"
                ></div>
                <div
                    class="absolute bottom-0 left-0 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"
                ></div>

                <UFormGroup class="relative z-10">
                    <template #label>
                        <span class="text-slate-300 font-bold text-base flex items-center gap-2">
                            <UIcon name="i-heroicons-squares-plus" class="w-5 h-5 text-blue-400" />
                            โรคประจำตัว (Chronic Diseases)
                        </span>
                    </template>
                    <div class="flex flex-wrap gap-3 mt-4 mb-5">
                        <button
                            type="button"
                            class="px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm"
                            :class="
                                form.chronicDiseases.length === 0
                                    ? 'bg-slate-700 text-white ring-1 ring-slate-600 shadow-lg'
                                    : 'bg-slate-800/80 text-slate-400 ring-1 ring-slate-700/50 hover:bg-slate-700 hover:text-slate-200'
                            "
                            @click="form.chronicDiseases = []"
                        >
                            ไม่มีโรคประจำตัว
                        </button>

                        <button
                            v-for="disease in [
                                'ความดันสูง',
                                'เบาหวาน',
                                'หัวใจ',
                                'ไทรอยด์',
                                'หอบหืด'
                            ]"
                            :key="disease"
                            type="button"
                            class="px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center shadow-sm backdrop-blur-sm"
                            :class="
                                form.chronicDiseases.includes(disease)
                                    ? 'bg-blue-500 text-white shadow-blue-500/20 scale-105'
                                    : 'bg-slate-800/80 text-slate-300 ring-1 ring-slate-700/50 hover:bg-slate-700 hover:text-white hover:ring-slate-600'
                            "
                            @click="
                                form.chronicDiseases.includes(disease)
                                    ? (form.chronicDiseases = form.chronicDiseases.filter(
                                          (d: string) => d !== disease
                                      ))
                                    : form.chronicDiseases.push(disease)
                            "
                        >
                            <UIcon
                                v-if="form.chronicDiseases.includes(disease)"
                                name="i-heroicons-check-circle"
                                class="w-4 h-4 mr-1.5"
                            />
                            {{ disease }}
                        </button>
                    </div>

                    <div class="relative mt-2">
                        <div
                            class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
                        >
                            <UIcon
                                name="i-heroicons-pencil-square"
                                class="h-5 w-5 text-slate-500"
                            />
                        </div>
                        <input
                            placeholder="โรคอื่นๆ — พิมพ์รายละเอียดเพิ่มเติม..."
                            class="block w-full pl-12 pr-4 py-3.5 bg-slate-800/80 text-white rounded-xl border border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-inner font-medium transition-colors placeholder-slate-500 backdrop-blur-sm"
                        />
                    </div>
                </UFormGroup>

                <UFormGroup class="relative z-10">
                    <template #label>
                        <span class="text-slate-300 font-bold text-base flex items-center gap-2">
                            <UIcon
                                name="i-heroicons-document-text"
                                class="w-5 h-5 text-emerald-400"
                            />
                            หมายเหตุทางการแพทย์
                            <span class="text-xs font-medium text-slate-500 ml-1 font-normal"
                                >(เห็นเฉพาะแพทย์และพยาบาล)</span
                            >
                        </span>
                    </template>
                    <textarea
                        v-model="form.medicalNotes"
                        placeholder="ตัวอย่าง: กำลังตั้งครรภ์ 12 สัปดาห์, ใส่เครื่องกระตุ้นหัวใจ, เพิ่งผ่านการผ่าตัดเมื่อเดือนที่แล้ว..."
                        rows="4"
                        class="mt-3 block w-full p-4 bg-slate-800/80 text-white rounded-xl border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 shadow-inner font-medium transition-colors placeholder-slate-500 resize-none backdrop-blur-sm leading-relaxed"
                    ></textarea>
                </UFormGroup>
            </div>
        </div>
    </div>
</template>
