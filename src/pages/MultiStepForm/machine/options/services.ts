/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { Sender } from 'xstate'

import { data } from '../../../../utils'

import { ItemsLoadedEvent } from '../types'

export const services: any = {
  loadingItems: () => (send: Sender<ItemsLoadedEvent>) => {
    try {
      // As if this is from an API call
      send({
        type: 'ITEMS_LOADED',
        payload: data?.dishes,
      })
    } catch (error) {
      console.error('Error: Loading Items', error)
    }
  },
}
