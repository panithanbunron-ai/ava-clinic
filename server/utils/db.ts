export const mockUsers = [
  { id: 1, name: 'จิตราภรณ์ (Admin)', role: 'admin', email: 'admin@avaclinic.com' },
  { id: 2, name: 'ผู้บริหาร (Superadmin)', role: 'superadmin', email: 'super@avaclinic.com' },
  { id: 3, name: 'สมใจ รักดี', role: 'admin', email: 'somjai@avaclinic.com' },
  { id: 4, name: 'หมอโอ๊ค', role: 'doctor', email: 'oak@avaclinic.com' },
  { id: 5, name: 'พยาบาลจอย', role: 'nurse', email: 'joy@avaclinic.com' }
]

export const mockAppointments = [
  { id: 1, time: '09:00', customer: 'คุณนลินี แสงทอง', service: 'Botox Aestox 50u', status: 'สำเร็จ', badgeColor: 'success' },
  { id: 2, time: '10:30', customer: 'คุณวิไลพร มั่นคง', service: 'Meso Fat Face', status: 'กำลังรอ', badgeColor: 'info' },
  { id: 3, time: '14:00', customer: 'คุณธนภูมิ ยิ่งใหญ่', service: 'Pico Laser Full Face', status: 'นัดหมาย', badgeColor: 'neutral' },
  { id: 4, time: '15:30', customer: 'คุณสมศักดิ์ ชัดเจน', service: 'IV Drip', status: 'นัดหมาย', badgeColor: 'neutral' },
  { id: 5, time: '16:00', customer: 'คุณวารี มีสุข', service: 'HIFU Full Face', status: 'ยกเลิก', badgeColor: 'error' }
]
