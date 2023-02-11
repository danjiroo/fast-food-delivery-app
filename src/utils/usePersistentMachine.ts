/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable indent */
import { useEffect } from 'react'
import {
  AnyEventObject,
  State,
  Sender,
  StateConfig,
  createMachine,
  MachineOptions,
  StateNodeConfig,
  AnyStateNodeDefinition,
} from 'xstate'
import { useMachine } from '@xstate/react'

interface SpawnParams {
  config: any
  context: any
  options: any
}

export const spawn = ({ config, context, options }: SpawnParams) => {
  const machineConfig = {
    ...config,
    context,
  }

  return createMachine(machineConfig, options)
}

interface UsePandoParams<TContext> {
  config: StateNodeConfig<TContext, AnyStateNodeDefinition, AnyEventObject>
  options: MachineOptions<TContext, AnyEventObject>
  context: Record<string, unknown>
}

export const usePersistentMachine = <TContext>(
  machine: UsePandoParams<TContext>
): [State<TContext, AnyEventObject>, Sender<AnyEventObject>, () => void] => {
  const key = machine?.config?.id ?? `idless-machine:${new Date().getTime()}`

  // Attempt to get stored state config from localstorage
  const configString = localStorage.getItem(key)
  let config: StateConfig<TContext, AnyEventObject> | undefined = undefined
  try {
    if (configString) {
      config = JSON.parse(configString) as StateConfig<TContext, AnyEventObject>
    }
  } catch (e: any) {
    console.error(e.message)
  }

  const createdMachine = spawn(machine)

  // Create Machine and Pass Fetched State Config to be rehydrated.
  const [state, send] = useMachine(createdMachine, {
    // @ts-ignore
    state: config?.done ? undefined : config,
    ...machine?.options,
  })

  // Effect: On State Change, Freeze and store current state as configString
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state))
  }, [state])

  return [
    state as any,
    send,
    () => {
      localStorage.removeItem(key)
    },
  ]
}
