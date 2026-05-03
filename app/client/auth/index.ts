import type { ClientResp } from '../types'
import type { UserRole } from '~/stores/auth'

export type LoginRespData = {
    token: string
    user: {
        id: number
        name: string
        role: UserRole
        email: string
    }
}

export async function loginApi(email: string, password: string): Promise<ClientResp<LoginRespData>> {
    try {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })

        const json = await res.json()
        
        if (res.status !== 200) {
            return { status: 'fails', code: res.status, message: json?.statusMessage ?? 'error' }
        }
        
        return { status: 'success', code: res.status, data: json.data }
    } catch (e) {
        return { status: 'fails', code: 500, message: 'Internal Client Error' }
    }
}

export async function meApi(token: string): Promise<ClientResp<LoginRespData['user']>> {
    try {
        const res = await fetch('/api/auth/me', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        const json = await res.json()
        
        if (res.status !== 200) {
            return { status: 'fails', code: res.status, message: json?.statusMessage ?? 'error' }
        }
        
        return { status: 'success', code: res.status, data: json.data }
    } catch (e) {
        return { status: 'fails', code: 500, message: 'Internal Client Error' }
    }
}
