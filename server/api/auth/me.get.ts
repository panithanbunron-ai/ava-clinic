export default defineEventHandler(async event => {
    await simulateDelay(400)

    // This will throw 401/403 if invalid
    const { role } = requireAuth(event)

    // Find user based on token role (mocking decoded token payload)
    const user = mockUsers.find(u => u.role === role)

    if (!user) {
        throw createError({ statusCode: 404, statusMessage: 'Not Found: User not found' })
    }

    return {
        statusCode: 200,
        message: 'Profile fetched successfully',
        data: user
    }
})
