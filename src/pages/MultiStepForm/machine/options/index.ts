import { MachineOptions } from 'xstate'

import { Context, MachineEvents } from '../types'
import { actions } from './actions'
import { services } from './services'

export const options: MachineOptions<Context, MachineEvents> = {
  actions,
  services,
  delays: {},
  guards: {},
}
