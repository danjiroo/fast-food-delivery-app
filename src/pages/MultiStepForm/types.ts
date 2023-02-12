import { AnyEventObject, State } from 'xstate'

import { Option } from '../../atomic'

import { Context, MachineEvents, StateSchema, Dish, Item } from './machine'

export interface ActionsProps {
  handleNext: () => void
  handlePrev: () => void
  handleConfirm: () => void
  handleReset: () => void
  handleSelectMeal: (option: Option) => void
  handleSetNumberOfPeople: (numberOfPeople: number | unknown) => void
  handleSelectRestaurant: (option: Option) => void
  handleSelectDish: (option: Option) => void
  handleSetNumberOfServings: (dish: Dish) => void
  handleAddDishSelector: () => void
  handleUpdateRestaurantOptions: (options: string[]) => void
  handleUpdateDishOptions: (options: Pick<Item, 'id' | 'name'>[]) => void
  handleRemoveDish: (option: Option) => void
  handleChangeDishViewType: (type: 'list' | 'grid') => void
}

export type MultiStepFormStateType = {
  providerState: State<Context, MachineEvents | AnyEventObject, StateSchema>
}

export type MultiStepFormActionsType = {
  providerActions: ActionsProps
}
