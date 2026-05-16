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
