import {
    mockReportMetrics,
    mockTopServices,
    mockStaffRevenue,
    mockRecentBills
} from '../../utils/db'
import { simulateDelay } from '../../utils/delay'

export default defineEventHandler(async event => {
    await simulateDelay(400)
    requireAuth(event)

    return {
        status: 'success',
        data: {
            metrics: mockReportMetrics,
            topServices: mockTopServices,
            staffRevenue: mockStaffRevenue,
            recentBills: mockRecentBills
        }
    }
})
