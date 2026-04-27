import type { ClientResp } from '../types'
// import { baseTxsURL } from '../urls'

type RespData = {
    id: string
    name: string
    username: number
    email: number
    address: {
        street: string
        suite: string
        city: string
        zipcode: string
        geo: {
            lat: string
            lng: string
        }
    }
    phone: number
    website: number
    company: {
        name: string
        catchPhrase: string
        bs: string
    }
}

export async function playerInfo(
): Promise<ClientResp<RespData[]>> {
    // const endpoint = `${baseTxsURL}/front/player/info`
    const endpoint = `https://jsonplaceholder.typicode.com/users`
    const res = await fetch(endpoint)

    const json = await res.json()
    if (res.status !== 200) {
        return { status: 'fails', code: res.status, message: json?.message ?? 'error' }
    }
    return { status: 'success', code: res.status, data: json }
}
