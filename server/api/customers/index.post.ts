export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    
    // Validate request if necessary
    if (!body || !body.firstName) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Bad Request',
            message: 'First name is required'
        });
    }

    // Mock saving the customer to a database
    const newCustomer = {
        id: 'CN-' + Math.floor(10000 + Math.random() * 90000).toString(),
        ...body,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    // Return the created customer
    return {
        success: true,
        message: 'Customer created successfully',
        data: newCustomer
    };
});
