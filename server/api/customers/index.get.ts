import { mockCustomers } from '../../utils/db'
import { simulateDelay } from '../../utils/delay'

export default defineEventHandler(async (event) => {
    // Simulate network delay
    await simulateDelay(300)

    // Parse query params for pagination
    const query = getQuery(event)
    const page = parseInt(query.page as string) || 1
    const limit = parseInt(query.limit as string) || 10
    
    // Simulate simple pagination (just returning the mock array)
    // Normally you'd slice the array based on page and limit
    
    return {
        status: 'success',
        data: {
            items: mockCustomers,
            total: 3250, // Fake total to match the UI 
            page,
            limit
        }
    }
})
