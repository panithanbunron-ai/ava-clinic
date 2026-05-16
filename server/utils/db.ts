export const mockUsers = [
    { id: 1, name: 'จิตราภรณ์ (Admin)', role: 'admin', email: 'admin@avaclinic.com' },
    { id: 2, name: 'ผู้บริหาร (Superadmin)', role: 'superadmin', email: 'super@avaclinic.com' },
    { id: 3, name: 'สมใจ รักดี', role: 'admin', email: 'somjai@avaclinic.com' },
    { id: 4, name: 'หมอโอ๊ค', role: 'doctor', email: 'oak@avaclinic.com' },
    { id: 5, name: 'พยาบาลจอย', role: 'nurse', email: 'joy@avaclinic.com' }
]

export const mockAppointments = [
    {
        id: 1,
        time: '09:00',
        customer: 'คุณนลินี แสงทอง',
        service: 'Botox Aestox 50u',
        status: 'สำเร็จ',
        badgeColor: 'success'
    },
    {
        id: 2,
        time: '10:30',
        customer: 'คุณวิไลพร มั่นคง',
        service: 'Meso Fat Face',
        status: 'กำลังรอ',
        badgeColor: 'info'
    },
    {
        id: 3,
        time: '14:00',
        customer: 'คุณธนภูมิ ยิ่งใหญ่',
        service: 'Pico Laser Full Face',
        status: 'นัดหมาย',
        badgeColor: 'neutral'
    },
    {
        id: 4,
        time: '15:30',
        customer: 'คุณสมศักดิ์ ชัดเจน',
        service: 'IV Drip',
        status: 'นัดหมาย',
        badgeColor: 'neutral'
    },
    {
        id: 5,
        time: '16:00',
        customer: 'คุณวารี มีสุข',
        service: 'HIFU Full Face',
        status: 'ยกเลิก',
        badgeColor: 'error'
    }
]

export const mockCustomers = [
    {
        id: 1,
        hn: 'CN-00184',
        name: 'พิมลภา จันทร์เพ็ญ',
        age: 35,
        gender: 'หญิง',
        idCard: '1-1004-xxxxx-xx-x',
        phone: '081-234-5678',
        lineId: '@pimonpa',
        note: 'แพ้ Penicillin',
        tags: ['VIP'],
        createdAt: '2024-05-16',
        avatarColor: 'bg-rose-100 text-rose-600'
    },
    {
        id: 2,
        hn: 'CN-00185',
        name: 'สมศักดิ์ ชัดเจน',
        age: 42,
        gender: 'ชาย',
        idCard: '3-1005-xxxxx-xx-x',
        phone: '089-987-6543',
        lineId: '-',
        note: '-',
        tags: ['ลูกค้าใหม่'],
        createdAt: '2024-05-16',
        avatarColor: 'bg-blue-100 text-blue-600'
    },
    {
        id: 3,
        hn: 'CN-00186',
        name: 'วารี มีสุข',
        age: 28,
        gender: 'หญิง',
        idCard: '1-1006-xxxxx-xx-x',
        phone: '082-345-6789',
        lineId: '@waree_m',
        note: 'ความดันต่ำ',
        tags: [],
        createdAt: '2024-05-15',
        avatarColor: 'bg-emerald-100 text-emerald-600'
    },
    {
        id: 4,
        hn: 'CN-00187',
        name: 'นลินี แสงทอง',
        age: 31,
        gender: 'หญิง',
        idCard: '2-1007-xxxxx-xx-x',
        phone: '083-456-7890',
        lineId: 'nalinee.s',
        note: 'ประวัติหอบหืด',
        tags: ['VIP'],
        createdAt: '2024-05-14',
        avatarColor: 'bg-purple-100 text-purple-600'
    },
    {
        id: 5,
        hn: 'CN-00188',
        name: 'ธนภูมิ ยิ่งใหญ่',
        age: 45,
        gender: 'ชาย',
        idCard: '1-1008-xxxxx-xx-x',
        phone: '084-567-8901',
        lineId: '-',
        note: '-',
        tags: [],
        createdAt: '2024-05-12',
        avatarColor: 'bg-amber-100 text-amber-600'
    },
    {
        id: 6,
        hn: 'CN-00189',
        name: 'วิไลพร มั่นคง',
        age: 39,
        gender: 'หญิง',
        idCard: '3-1009-xxxxx-xx-x',
        phone: '085-678-9012',
        lineId: '@wilaiporn',
        note: 'แพ้อาหารทะเล',
        tags: ['ลูกค้าใหม่'],
        createdAt: '2024-05-10',
        avatarColor: 'bg-cyan-100 text-cyan-600'
    },
    {
        id: 7,
        hn: 'CN-00190',
        name: 'ประเสริฐ ดีเลิศ',
        age: 50,
        gender: 'ชาย',
        idCard: '3-1010-xxxxx-xx-x',
        phone: '086-789-0123',
        lineId: 'prasert_d',
        note: '-',
        tags: [],
        createdAt: '2024-05-09',
        avatarColor: 'bg-indigo-100 text-indigo-600'
    },
    {
        id: 8,
        hn: 'CN-00191',
        name: 'ดาริกา สวยสด',
        age: 25,
        gender: 'หญิง',
        idCard: '1-1011-xxxxx-xx-x',
        phone: '087-890-1234',
        lineId: '@darika',
        note: '-',
        tags: ['VIP'],
        createdAt: '2024-05-08',
        avatarColor: 'bg-pink-100 text-pink-600'
    }
]

export const mockReportMetrics = {
    revenue: {
        value: 1247500,
        trend: '+18.4%',
        avg: 89107
    },
    bills: {
        value: 412,
        trend: '+12%',
        diff: 368
    },
    avgPerBill: {
        value: 3027,
        trend: '+5.8%'
    },
    newCustomers: {
        value: 86,
        trend: '-3.2%'
    }
}

export const mockTopServices = [
    { id: 1, name: 'Filler Juvederm', revenue: 342000, bills: 42, avg: 8143, progress: 85 },
    { id: 2, name: 'Laser Treatment', revenue: 268500, bills: 68, avg: 3949, progress: 65 },
    { id: 3, name: 'Botox 50 Units', revenue: 198000, bills: 36, avg: 5500, progress: 50 },
    { id: 4, name: 'Acne Course', revenue: 156200, bills: 28, avg: 5579, progress: 40 },
    { id: 5, name: 'Vitamin Drip', revenue: 98400, bills: 76, avg: 1295, progress: 25 }
]

export const mockStaffRevenue = [
    {
        id: 1,
        initial: 'PM',
        name: 'พิมลภา จันทร์เพ็ญ',
        revenue: 542000,
        bills: 186,
        progress: 90,
        color: 'bg-rose-100 text-rose-600',
        barColor: 'bg-indigo-600'
    },
    {
        id: 2,
        initial: 'TD',
        name: 'ธนดล สวัสดี',
        revenue: 398000,
        bills: 142,
        progress: 65,
        color: 'bg-emerald-100 text-emerald-600',
        barColor: 'bg-indigo-500'
    },
    {
        id: 3,
        initial: 'NK',
        name: 'นันทกานต์ ภู่กัน',
        revenue: 216000,
        bills: 68,
        progress: 35,
        color: 'bg-blue-100 text-blue-600',
        barColor: 'bg-indigo-400'
    },
    {
        id: 4,
        initial: 'CK',
        name: 'เฉลิม คงสกุล',
        revenue: 91000,
        bills: 16,
        progress: 15,
        color: 'bg-amber-100 text-amber-600',
        barColor: 'bg-indigo-300'
    }
]

export const mockRecentBills = [
    {
        id: 'INV-0412',
        customer: 'สิรินทร์ รัตนา',
        initial: 'SR',
        color: 'bg-rose-100 text-rose-600',
        service: 'Filler Juvederm',
        amount: 28000,
        payment: 'บัตรเครดิต',
        paymentColor: 'bg-purple-100 text-purple-700',
        time: '14:12 น.'
    },
    {
        id: 'INV-0411',
        customer: 'นภาพร แสงมณี',
        initial: 'NP',
        color: 'bg-blue-100 text-blue-600',
        service: 'Laser, Botox 50u',
        amount: 12500,
        payment: 'QR Transfer',
        paymentColor: 'bg-emerald-100 text-emerald-700',
        time: '14:05 น.'
    },
    {
        id: 'INV-0410',
        customer: 'ธวัชชัย ดีเลิศ',
        initial: 'TD',
        color: 'bg-emerald-100 text-emerald-600',
        service: 'Acne Course',
        amount: 5500,
        payment: 'QR Transfer',
        paymentColor: 'bg-emerald-100 text-emerald-700',
        time: '13:48 น.'
    },
    {
        id: 'INV-0409',
        customer: 'วิชัย สุขเกษม',
        initial: 'WS',
        color: 'bg-amber-100 text-amber-600',
        service: 'Vitamin Drip',
        amount: 3200,
        payment: 'เงินสด',
        paymentColor: 'bg-amber-100 text-amber-700',
        time: '13:30 น.'
    },
    {
        id: 'INV-0408',
        customer: 'กนกวรรณ ขวัญใจ',
        initial: 'KK',
        color: 'bg-purple-100 text-purple-600',
        service: 'Facial Treatment',
        amount: 1500,
        payment: 'บัตรเครดิต',
        paymentColor: 'bg-purple-100 text-purple-700',
        time: '12:55 น.'
    }
]
