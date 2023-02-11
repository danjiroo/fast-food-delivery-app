export * from './context'
export * from './events'
export * from './states'

export interface IRecord<D = unknown> {
  [key: string]: D | unknown
}
