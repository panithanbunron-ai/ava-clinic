export default defineEventHandler(async (event) => {
  await simulateDelay(500)

  const body = await readBody(event)
  const { email, password } = body

  // Mock validation
  if (!email || !password) {
    throw createError({ statusCode: 400, statusMessage: 'Bad Request: Missing credentials' })
  }

  // In a real app, hash password and check DB
  let token = ''
  let user = null

  if (email === 'admin@avaclinic.com' && password === 'password') {
    token = 'mock-admin-token'
    user = mockUsers.find(u => u.role === 'admin')
  } else if (email === 'super@avaclinic.com' && password === 'password') {
    token = 'mock-superadmin-token'
    user = mockUsers.find(u => u.role === 'superadmin')
  } else {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized: Invalid email or password' })
  }

  return {
    statusCode: 200,
    message: 'Login successful',
    data: {
      token,
      user
    }
  }
})
