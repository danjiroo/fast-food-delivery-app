import { AnyStateNodeDefinition, StateNodeDefinition } from 'xstate'
import { Context, MachineEvents } from '..'

export interface ReadyStateSchema {
  states: {
    step_one: StateNodeDefinition<
      Context,
      AnyStateNodeDefinition,
      MachineEvents
    >
    step_two: StateNodeDefinition<
      Context,
      AnyStateNodeDefinition,
      MachineEvents
    >
    step_three: StateNodeDefinition<
      Context,
      AnyStateNodeDefinition,
      MachineEvents
    >
    step_four: StateNodeDefinition<
      Context,
      AnyStateNodeDefinition,
      MachineEvents
    >
  }
}

export interface StateSchema {
  states: {
    loading: StateNodeDefinition<Context, AnyStateNodeDefinition, MachineEvents>
    ready: StateNodeDefinition<Context, ReadyStateSchema, MachineEvents>
    done: StateNodeDefinition<Context, AnyStateNodeDefinition, MachineEvents>
  }
}
