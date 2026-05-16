import { mockTeleconsultSummary, mockTeleconsultSchedule, mockTeleconsultWaitingRoom, mockTeleconsultDoctors } from '../../utils/db'
import { simulateDelay } from '../../utils/delay'

export default defineEventHandler(async (event) => {
    // Simulate network delay
    await simulateDelay(400)

    return {
        status: 'success',
        data: {
            summary: mockTeleconsultSummary,
            schedule: mockTeleconsultSchedule,
            waitingRoom: mockTeleconsultWaitingRoom,
            doctors: mockTeleconsultDoctors
        }
    }
})
