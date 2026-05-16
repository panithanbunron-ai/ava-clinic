<template>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Bar Chart Fake -->
        <div
            class="bg-white rounded-2xl shadow-sm ring-1 ring-gray-100 p-6 lg:col-span-2 flex flex-col h-80"
        >
            <div class="flex justify-between items-start mb-6">
                <div>
                    <h3 class="font-bold text-gray-900">รายได้รายวัน</h3>
                    <p class="text-xs text-gray-500 mt-1">1 - 14 พ.ค. 2026</p>
                </div>
                <div class="flex items-center gap-4 text-xs font-semibold">
                    <div class="flex items-center gap-1">
                        <span class="w-2.5 h-2.5 rounded-sm bg-indigo-600"></span> ช่วงนี้
                    </div>
                    <div class="flex items-center gap-1">
                        <span class="w-2.5 h-2.5 rounded-sm bg-indigo-200"></span> ช่วงก่อน
                    </div>
                    <div class="flex items-center gap-1">
                        <span class="w-4 h-0.5 bg-emerald-400"></span> เป้า
                    </div>
                </div>
            </div>
            <div class="flex-1 relative flex items-end justify-between px-2 pt-4">
                <!-- Target line -->
                <div
                    class="absolute top-1/2 left-0 w-full border-t-2 border-dashed border-emerald-300 z-0"
                ></div>
                <div
                    class="absolute top-1/2 right-0 -translate-y-1/2 translate-x-full text-[10px] text-emerald-500 font-bold bg-white pl-1 z-10"
                >
                    เป้า 100K
                </div>

                <!-- Fake Bars -->
                <div
                    v-for="i in 14"
                    :key="i"
                    class="relative z-10 flex flex-col items-center gap-1 group cursor-pointer w-8"
                >
                    <!-- Tooltip fake -->
                    <div
                        v-if="i === 12"
                        class="absolute -top-10 bg-gray-900 text-white text-[10px] px-2 py-1 rounded shadow-lg whitespace-nowrap z-20"
                    >
                        <div class="font-bold text-center">12 พ.ค.</div>
                        <div>฿128,400</div>
                    </div>

                    <div class="flex items-end gap-0.5 w-full justify-center">
                        <!-- Before -->
                        <div
                            class="w-2.5 bg-indigo-200 rounded-t-sm"
                            :style="{ height: `${Math.random() * 50 + 20}%` }"
                        ></div>
                        <!-- Current -->
                        <div
                            class="w-2.5 bg-indigo-600 rounded-t-sm transition-all group-hover:bg-indigo-500"
                            :class="{ 'bg-gray-900': i === 12 }"
                            :style="{ height: `${Math.random() * 60 + 30}%` }"
                        ></div>
                    </div>
                    <div class="text-[9px] text-gray-400 font-medium mt-1">ศ {{ i }}</div>
                </div>
            </div>
        </div>

        <!-- Donut Chart Fake -->
        <div class="bg-white rounded-2xl shadow-sm ring-1 ring-gray-100 p-6 flex flex-col h-80">
            <h3 class="font-bold text-gray-900">วิธีชำระเงิน</h3>
            <p class="text-xs text-gray-500 mt-1 mb-6">สัดส่วนยอดรวม 14 วัน</p>

            <div class="flex items-center justify-center flex-1 gap-6">
                <!-- Fake SVG Donut -->
                <div class="relative w-32 h-32 shrink-0">
                    <svg viewBox="0 0 100 100" class="w-full h-full transform -rotate-90">
                        <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="transparent"
                            stroke="#f3f4f6"
                            stroke-width="20"
                        ></circle>
                        <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="transparent"
                            stroke="#4f46e5"
                            stroke-width="20"
                            stroke-dasharray="251.2"
                            stroke-dashoffset="100.48"
                        ></circle>
                        <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="transparent"
                            stroke="#10b981"
                            stroke-width="20"
                            stroke-dasharray="251.2"
                            stroke-dashoffset="200.96"
                        ></circle>
                        <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="transparent"
                            stroke="#f59e0b"
                            stroke-width="20"
                            stroke-dasharray="251.2"
                            stroke-dashoffset="230"
                        ></circle>
                    </svg>
                    <div class="absolute inset-0 flex flex-col items-center justify-center">
                        <div class="text-sm font-extrabold text-gray-900">฿1.24M</div>
                        <div class="text-[9px] text-gray-400 font-bold">รวมทั้งหมด</div>
                    </div>
                </div>

                <div class="flex flex-col justify-center gap-3 w-full">
                    <div class="flex justify-between items-center text-xs">
                        <div class="flex items-center gap-2">
                            <span class="w-2.5 h-2.5 rounded-sm bg-indigo-600"></span>
                            <div>
                                <div class="font-bold text-gray-700">บัตรเครดิต</div>
                                <div class="text-[10px] text-gray-400">60%</div>
                            </div>
                        </div>
                        <div class="font-bold text-gray-900">฿748K</div>
                    </div>
                    <div class="flex justify-between items-center text-xs">
                        <div class="flex items-center gap-2">
                            <span class="w-2.5 h-2.5 rounded-sm bg-emerald-500"></span>
                            <div>
                                <div class="font-bold text-gray-700">QR Transfer</div>
                                <div class="text-[10px] text-gray-400">27%</div>
                            </div>
                        </div>
                        <div class="font-bold text-gray-900">฿337K</div>
                    </div>
                    <div class="flex justify-between items-center text-xs">
                        <div class="flex items-center gap-2">
                            <span class="w-2.5 h-2.5 rounded-sm bg-amber-500"></span>
                            <div>
                                <div class="font-bold text-gray-700">เงินสด</div>
                                <div class="text-[10px] text-gray-400">10%</div>
                            </div>
                        </div>
                        <div class="font-bold text-gray-900">฿124K</div>
                    </div>
                    <div class="flex justify-between items-center text-xs">
                        <div class="flex items-center gap-2">
                            <span class="w-2.5 h-2.5 rounded-sm bg-gray-300"></span>
                            <div>
                                <div class="font-bold text-gray-700">อื่น ๆ</div>
                                <div class="text-[10px] text-gray-400">3%</div>
                            </div>
                        </div>
                        <div class="font-bold text-gray-900">฿37K</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
