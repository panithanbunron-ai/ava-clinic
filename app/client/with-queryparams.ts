import { isBoolean, isEmpty } from 'lodash'

export type QueryParams = Record<string, unknown>

const _isEmpty = (v: unknown) => {
    if (isBoolean(v)) return false
    return isEmpty(v)
}

export function withQueryParams(url: string) {
    return (params: QueryParams) =>
        Object.entries(params)
            .reduce((_url, [k, v]) => {
                if (_isEmpty(v)) return _url

                _url.searchParams.append(k, v as string)
                return _url
            }, new URL(url))
            .toString()
}
