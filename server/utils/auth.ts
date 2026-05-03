import { H3Event } from 'h3'

export const requireAuth = (event: H3Event, allowedRoles?: string[]) => {
  const authHeader = getHeader(event, 'Authorization')
  
  // Check if token is present
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized: Missing or invalid token' })
  }

  const token = authHeader.split(' ')[1]
  
  // Mock token decoding (In a real app, verify JWT signature here)
  let userRole = ''
  if (token === 'mock-admin-token') userRole = 'admin'
  if (token === 'mock-superadmin-token') userRole = 'superadmin'

  if (!userRole) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized: Invalid token' })
  }

  // RBAC Check
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    throw createError({ statusCode: 403, statusMessage: 'Forbidden: You do not have permission to access this resource' })
  }

  return { role: userRole }
}
