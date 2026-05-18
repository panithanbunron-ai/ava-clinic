import { mockCustomers } from '../../utils/db'
import { simulateDelay } from '../../utils/delay'

export default defineEventHandler(async event => {
    await simulateDelay(200)
    requireAuth(event)
    const idParam = getRouterParam(event, 'id')
    const id = parseInt(idParam || '1') || 1

    // Find custom mock customer
    const found = mockCustomers.find(c => c.id === id || c.hn === idParam)

    // Return a fully-detailed mock customer structure matching TabGeneral, TabContact, TabHealth, TabAdditional
    if (found) {
        // Parse firstName and lastName from the mockName
        const parts = found.name.split(' ')
        const firstName = parts[0] || ''
        const lastName = parts.slice(1).join(' ') || ''
        const title = found.gender === 'หญิง' ? 'นางสาว' : 'นาย'

        return {
            status: 'success',
            data: {
                id: found.id,
                hn: found.hn,
                title,
                firstName,
                lastName,
                nickname: found.gender === 'หญิง' ? 'จอย' : 'ป๊อป',
                gender: found.gender,
                birthDate: found.gender === 'หญิง' ? '1990-05-12' : '1982-08-20',
                idCard: found.idCard === '1-1004-xxxxx-xx-x' ? '1100201456789' : '3100201234567',
                
                address: found.gender === 'หญิง' ? '99/1 ถนนสุขุมวิท' : '12/4 ซอยพหลโยธิน 32',
                province: 'กรุงเทพมหานคร',
                district: found.gender === 'หญิง' ? 'คลองเตย' : 'จตุจักร',
                subDistrict: found.gender === 'หญิง' ? 'คลองเตย' : 'เสนานิคม',
                zipcode: found.gender === 'หญิง' ? '10110' : '10900',
                
                mobile: found.phone,
                homePhone: found.gender === 'หญิง' ? '02-123-4567' : '',
                email: found.gender === 'หญิง' ? 'pimonpa.j@gmail.com' : 'somsak@gmail.com',
                lineId: found.lineId !== '-' ? found.lineId : '',
                
                emergencyName: found.gender === 'หญิง' ? 'สมเกียรติ จันทร์เพ็ญ' : 'สมใจ ชัดเจน',
                emergencyRelation: found.gender === 'หญิง' ? 'บิดา / มารดา' : 'สามี / ภรรยา',
                emergencyMobile: found.gender === 'หญิง' ? '089-876-5432' : '088-765-4321',
                
                leadSource: 'Facebook / Instagram',
                referredBy: 'พยาบาลจอย',
                customerGroup: found.tags.includes('VIP') ? 'VIP' : 'Standard',
                
                drugAllergies: found.note.includes('แพ้') ? [found.note.replace('แพ้ ', '')] : [] as string[],
                chronicDiseases: found.note.includes('หอบหืด') ? ['หอบหืด'] : (found.note.includes('ความดัน') ? ['ความดันต่ำ'] : []),
                medicalNotes: found.note !== '-' ? `คนไข้ระบุ: ${found.note}` : 'ไม่มีประวัติแพ้ยาหรือโรคประจำตัวร้ายแรง',
                
                pdpaConsent: true,
                linePromoConsent: found.gender === 'หญิง',
                smsNoticeConsent: true,
                createdAt: found.createdAt,
                avatarColor: found.avatarColor
            }
        }
    }

    // Default Fallback details
    return {
        status: 'success',
        data: {
            id: 1,
            hn: 'CN-00184',
            title: 'นางสาว',
            firstName: 'พิมลภา',
            lastName: 'จันทร์เพ็ญ',
            nickname: 'จอย',
            gender: 'หญิง',
            birthDate: '1990-05-12',
            idCard: '1100201456789',
            address: '99/1 ถนนสุขุมวิท',
            province: 'กรุงเทพมหานคร',
            district: 'คลองเตย',
            subDistrict: 'คลองเตย',
            zipcode: '10110',
            mobile: '081-234-5678',
            homePhone: '02-123-4567',
            email: 'pimonpa.j@gmail.com',
            lineId: '@pimonpa',
            emergencyName: 'สมเกียรติ จันทร์เพ็ญ',
            emergencyRelation: 'บิดา / มารดา',
            emergencyMobile: '089-876-5432',
            leadSource: 'Facebook / Instagram',
            referredBy: 'พยาบาลจอย',
            customerGroup: 'VIP',
            drugAllergies: ['Penicillin'],
            chronicDiseases: ['ผิวแพ้ง่าย'],
            medicalNotes: 'คนไข้ระบุ: แพ้ Penicillin',
            pdpaConsent: true,
            linePromoConsent: true,
            smsNoticeConsent: true,
            createdAt: '2024-05-16',
            avatarColor: 'bg-rose-100 text-rose-600'
        }
    }
})
