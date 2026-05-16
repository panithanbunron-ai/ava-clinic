import {
    mockReportMetrics,
    mockTopServices,
    mockStaffRevenue,
    mockRecentBills
} from '../../utils/db'
import { simulateDelay } from '../../utils/delay'

export default defineEventHandler(async event => {
    // Simulate network delay
    await simulateDelay(400)

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
