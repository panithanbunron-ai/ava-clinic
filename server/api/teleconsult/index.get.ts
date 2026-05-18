import {
    mockTeleconsultSummary,
    mockTeleconsultSchedule,
    mockTeleconsultWaitingRoom,
    mockTeleconsultDoctors
} from '../../utils/db'
import { simulateDelay } from '../../utils/delay'

export default defineEventHandler(async event => {
    await simulateDelay(400)
    requireAuth(event)

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
