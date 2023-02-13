/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { PropsWithChildren, createContext } from 'react'

import { usePersistentMachine } from '../../utils'

import { config, options } from './machine'
import {
  ActionsProps,
  MultiStepFormActionsType,
  MultiStepFormStateType,
} from './types'

export const MultiStepFormState = createContext<
  Partial<MultiStepFormStateType>
>({})
export const MultiStepFormActions = createContext<
  Partial<MultiStepFormActionsType>
>({})

const MultiStepFormProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const machine = React.useMemo(
    () => ({
      config,
      options,
      context: {
        selectedNumberOfPeople: 1,
      },
    }),
    []
  )

  // I got a type issue with the hook I created
  // @ts-ignore
  const [state, send] = usePersistentMachine(machine)

  if (!state) return null

  const actions: ActionsProps = {
    handleNext: () => send('NEXT'),
    handlePrev: () => send('PREV'),
    handleConfirm: () => send('CONFIRM'),
    handleReset: () => send('RESET'),
    handleSelectMeal: (payload) =>
      send({
        type: 'SELECT_MEAL',
        payload,
      }),
    handleSetNumberOfPeople: (payload) =>
      send({
        type: 'SET_NUMBER_OF_PEOPLE',
        payload,
      }),
    handleSelectRestaurant: (payload) =>
      send({
        type: 'SELECT_RESTAURANT',
        payload,
      }),
    handleSelectDish: (payload) =>
      send({
        type: 'SELECT_DISH',
        payload,
      }),
    handleSetNumberOfServings: (payload) => {
      send({
        type: 'SET_NUMBER_OF_SERVINGS',
        payload,
      })
    },
    handleAddDishSelector: () => send('ADD_DISH_SELECTOR'),
    handleUpdateRestaurantOptions: (payload) => {
      send({
        type: 'UPDATE_RESTAURANT_OPTIONS',
        payload,
      })
    },
    handleUpdateDishOptions: (payload) => {
      send({
        type: 'UPDATE_DISH_OPTIONS',
        payload,
      })
    },
    handleRemoveDish: (payload) =>
      send({
        type: 'REMOVE_DISH',
        payload,
      }),
    handleChangeDishViewType: (payload) =>
      send({
        type: 'VIEW_TYPE',
        payload,
      }),
  }

  return (
    <MultiStepFormState.Provider
      value={{
        providerState: state,
      }}
    >
      <MultiStepFormActions.Provider
        value={{
          providerActions: actions,
        }}
      >
        {children}
      </MultiStepFormActions.Provider>
    </MultiStepFormState.Provider>
  )
}
export default MultiStepFormProvider
