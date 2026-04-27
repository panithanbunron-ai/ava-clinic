// TODO: what is standard for error response ? -> P'Kim
export type ClientError = { status: 'fails', code: number, message: string }
export type ClientSuccess<T> = { status: 'success', code: number, data: T }
export type ClientResp<T> = ClientError | ClientSuccess<T>

// TODO: remove later
export function isClientSuccessResp<DT>(
    resp: unknown
): resp is ClientSuccess<DT> {
    return (resp as ClientSuccess<DT>).data !== undefined
}

// TODO: remove later
export function isClientFailResp(resp: unknown): resp is ClientError {
    return (resp as ClientError).message !== undefined
}
