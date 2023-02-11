/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActionFunctionMap, assign } from 'xstate'

import {
  Context,
  ItemsLoadedEvent,
  MachineEvents,
  SelectDishEvent,
  SelectMealEvent,
  SelectRestaurantEvent,
  SetNumberOfPeopleEvent,
  SetNumberOfServings,
  UpdateDishOptionsEvent,
  UpdateMealOptionsEvent,
  UpdateRestaurantOptionsEvent,
} from '../types'

export const actions: ActionFunctionMap<Context, MachineEvents | any> = {
  assignItems: assign({
    items: ({ items = [] }, { payload }: ItemsLoadedEvent) => [
      ...items,
      ...payload,
    ],
  }),

  assignMealOptions: assign({
    options: ({ options }, { payload }: ItemsLoadedEvent) => {
      const meals: string[] = []

      payload?.forEach((item) =>
        item?.availableMeals.forEach((i) => meals.push(i))
      )

      const uniqueAvailableMeals = [...new Set(meals)]

      return {
        ...options,
        availableMealOptions: uniqueAvailableMeals,
      }
    },
  }),

  assignRestaurantOptions: assign({
    options: ({ options }, { payload }: UpdateRestaurantOptionsEvent) => ({
      ...(options ?? {}),
      restaurantOptions: payload,
    }),
  }),

  assignDishOptions: assign({
    options: ({ options }, { payload }: UpdateDishOptionsEvent) => ({
      ...(options ?? {}),
      dishOptions: payload,
    }),
  }),

  assignSelectedMeal: assign({
    selectedMeal: (_, { payload }: SelectMealEvent) => payload?.value,
    selectedRestaurant: (
      { selectedMeal, selectedRestaurant },
      { payload }: SelectMealEvent
    ) => {
      // clicking previous, if meal is change and has already selected a restaurant
      if (selectedRestaurant && selectedMeal !== payload?.value) {
        return ''
      }

      return selectedRestaurant
    },
    options: ({ options, items = [] }, { payload }: SelectMealEvent) => {
      const filteredRestaurants = items
        ?.filter((item) => item.availableMeals?.includes(payload.value))
        ?.map((item) => item.restaurant)

      return {
        ...options,
        restaurantOptions: [...new Set(filteredRestaurants)],
      }
    },
  }),

  assignNumberOfPeople: assign({
    selectedNumberOfPeople: (_, { payload }: SetNumberOfPeopleEvent) => payload,
  }),

  assignSelectedRestaurant: assign({
    selectedRestaurant: (_, { payload }: SelectRestaurantEvent) =>
      payload.value,
    selectedDishes: (
      { selectedRestaurant, selectedDishes = {} },
      { payload }: SelectRestaurantEvent
    ) => {
      // clicking previous, if restaurant is change and has already selected a restaurant
      if (
        Object.keys(selectedDishes)?.length &&
        selectedRestaurant !== payload.value
      ) {
        return {}
      }

      return selectedDishes
    },
    options: (
      { options, items = [], selectedMeal = '' },
      { payload }: SelectRestaurantEvent
    ) => {
      const filteredDishes = items?.filter(
        (item) =>
          item.availableMeals?.includes(selectedMeal) &&
          item.restaurant === payload.value
      )

      return {
        ...options,
        dishOptions: [...new Set(filteredDishes)],
      }
    },
  }),

  assignDish: assign({
    selectedDishes: ({ selectedDishes = {} }, { payload }: SelectDishEvent) => {
      const { id, rowIndex } = payload ?? {}

      let restOfDishes = selectedDishes

      // if (selectedDishes[id]) {
      //   console.log('debug EXISTING SELECTED ALREADY! DISH', id)
      //   return restOfDishes
      // }

      if (selectedDishes['pending']) {
        const { ['pending']: removed, ...rest } = selectedDishes
        restOfDishes = rest ?? {}
      }

      return {
        ...restOfDishes,
        [rowIndex]: {
          ...payload,
          servings: 1,
        },
      }
    },

    options: (
      { items = [], options, selectedDishes = {} },
      { payload }: SelectDishEvent
    ) => {
      const { rowIndex } = payload ?? {}
      const { dishOptions = [] } = options ?? {}

      const currentDish = selectedDishes[rowIndex]

      const reAddOption = items.find((item) => item.id === currentDish?.id)

      const filteredDishOptions = dishOptions.filter(
        (dish) => dish?.id !== payload?.id
      )

      if (reAddOption) {
        filteredDishOptions.push(reAddOption)
      }

      return {
        ...options,
        dishOptions: filteredDishOptions ?? [],
      }
    },
  }),

  removeDish: assign({
    selectedDishes: ({ selectedDishes = {} }, { payload }: SelectDishEvent) => {
      const { rowIndex } = payload ?? {}

      const { [rowIndex]: removed, ...rest } = selectedDishes

      return rest ?? {}
    },

    options: (
      { items = [], options, selectedDishes = {} },
      { payload }: SelectDishEvent
    ) => {
      const { rowIndex } = payload ?? {}
      const { dishOptions = [] } = options ?? {}

      const currentDish = selectedDishes[rowIndex]

      const reAddOption = items.find((item) => item.id === currentDish?.id)

      const filteredDishOptions = dishOptions.filter(
        (dish) => dish?.id !== payload?.id
      )

      if (reAddOption) {
        filteredDishOptions.push(reAddOption)
      }

      return {
        ...options,
        dishOptions: filteredDishOptions ?? [],
      }
    },
  }),

  assignServings: assign({
    selectedDishes: (
      { selectedDishes = {} },
      { payload }: SetNumberOfServings
    ) => ({
      ...selectedDishes,
      [payload.rowIndex]: {
        ...selectedDishes[payload.rowIndex],
        servings: payload.servings,
      },
    }),
  }),

  addDishSelector: assign({
    selectedDishes: ({ selectedDishes = {} }) => ({
      ...selectedDishes,
      pending: {
        id: 0,
        label: 'Select an option',
        value: '',
        servings: 0,
        rowIndex: '',
      },
    }),
  }),
}
