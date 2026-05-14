export default defineEventHandler(async event => {
    await simulateDelay(800)

    // Only superadmins and admins can view users list
    requireAuth(event, ['admin', 'superadmin'])

    const query = getQuery(event)
    const page = parseInt(query.page as string) || 1
    const limit = parseInt(query.limit as string) || 10
    const search = (query.search as string)?.toLowerCase() || ''

    let filteredUsers = [...mockUsers]

    // Filtering
    if (search) {
        filteredUsers = filteredUsers.filter(
            u =>
                u.name.toLowerCase().includes(search) ||
                u.email.toLowerCase().includes(search) ||
                u.role.toLowerCase().includes(search)
        )
    }

    // Pagination
    const startIndex = (page - 1) * limit
    const paginatedUsers = filteredUsers.slice(startIndex, startIndex + limit)

    return {
        statusCode: 200,
        message: 'Users fetched successfully',
        meta: {
            total: filteredUsers.length,
            page,
            limit,
            totalPages: Math.ceil(filteredUsers.length / limit)
        },
        data: paginatedUsers
    }
})
