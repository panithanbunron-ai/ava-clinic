export default defineEventHandler(async event => {
    // Simulate network latency
    await simulateDelay(600)

    // Require authentication to access dashboard data
    requireAuth(event)

    const query = getQuery(event)
    const statusFilter = query.status as string

    let data = [...mockAppointments]

    if (statusFilter) {
        data = data.filter(app => app.status === statusFilter)
    }

    return {
        statusCode: 200,
        message: 'Appointments fetched successfully',
        data: data
    }
})
