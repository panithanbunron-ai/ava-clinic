import { mockCustomers } from '../../utils/db'
import { simulateDelay } from '../../utils/delay'

export default defineEventHandler(async event => {
    await simulateDelay(300)
    requireAuth(event)

    // Parse query params for pagination
    const query = getQuery(event)
    const page = parseInt(query.page as string) || 1
    const limit = parseInt(query.limit as string) || 10

    // Simulate simple pagination (just returning the mock array)
    // Normally you'd slice the array based on page and limit

    // TODO (production): filter by search query before slicing
    const total = mockCustomers.length
    const items = mockCustomers.slice((page - 1) * limit, page * limit)

    return {
        status: 'success',
        data: {
            items,
            total,
            page,
            limit
        }
    }
})
