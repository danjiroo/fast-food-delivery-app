import { Dish, DishOption, Item } from './context'

export interface NextEvent {
  type: 'NEXT'
}

export interface PrevEvent {
  type: 'PREV'
}

export interface SelectMealEvent {
  type: 'SELECT_MEAL'
  payload: DishOption
}

export interface SetNumberOfPeopleEvent {
  type: 'SET_NUMBER_OF_PEOPLE'
  payload: number
}

export interface SelectRestaurantEvent {
  type: 'SELECT_RESTAURANT'
  payload: DishOption
}

export interface SelectDishEvent {
  type: 'SELECT_DISH'
  payload: Dish & {
    rowIndex: string
  }
}
export interface RemoveDishEvent {
  type: 'REMOVE_DISH'
  payload: Dish & {
    rowIndex: string
  }
}

export interface SetNumberOfServings {
  type: 'SET_NUMBER_OF_SERVINGS'
  payload: Dish
}

export interface ItemsLoadedEvent {
  type: 'ITEMS_LOADED'
  payload: Item[]
}

export interface AddDishSelectorEvent {
  type: 'ADD_DISH_SELECTOR'
}

export interface UpdateMealOptionsEvent {
  type: 'UPDATE_MEAL_OPTIONS'
  payload: string[]
}

export interface UpdateRestaurantOptionsEvent {
  type: 'UPDATE_RESTAURANT_OPTIONS'
  payload: string[]
}

export interface UpdateDishOptionsEvent {
  type: 'UPDATE_DISH_OPTIONS'
  payload: Item[]
}

export type MachineEvents =
  | NextEvent
  | PrevEvent
  | SelectMealEvent
  | SetNumberOfPeopleEvent
  | SelectRestaurantEvent
  | SelectDishEvent
  | ItemsLoadedEvent
  | SetNumberOfServings
  | AddDishSelectorEvent
  | UpdateMealOptionsEvent
  | UpdateRestaurantOptionsEvent
  | UpdateDishOptionsEvent
  | RemoveDishEvent
