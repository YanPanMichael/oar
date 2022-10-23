import Oar from './oar'
import { isClient } from './utils/base'
import { OarInstance, Global } from './types'

const win: Global | undefined = isClient() ? window : undefined
const oar: OarInstance = win && win.oar ? win.oar : Oar

export * from './types'
export default oar
