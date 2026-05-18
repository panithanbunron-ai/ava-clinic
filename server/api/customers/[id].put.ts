import { simulateDelay } from '../../utils/delay'

export default defineEventHandler(async event => {
    await simulateDelay(300)
    requireAuth(event)
    const body = await readBody(event)
    const idParam = getRouterParam(event, 'id')

    if (!body || !body.firstName) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Bad Request',
            message: 'First name is required'
        })
    }

    // Return the updated customer details
    return {
        success: true,
        message: `Customer ${idParam} updated successfully`,
        data: {
            ...body,
            updatedAt: new Date().toISOString()
        }
    }
})
