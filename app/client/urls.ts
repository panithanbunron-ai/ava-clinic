const txaHostURL = () => import.meta.env.VITE_TXA_APIHOST
const txsHostURL = () => import.meta.env.VITE_TXS_APIHOST
const APIPrefixPath = 'api/v1'

export const baseTxsURL = `${txsHostURL()}/${APIPrefixPath}`
export const baseTxaURL = `${txaHostURL()}/${APIPrefixPath}`
