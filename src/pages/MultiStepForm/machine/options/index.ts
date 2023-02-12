/* eslint-disable arrow-body-style */
import { MachineOptions } from 'xstate'

import { Context, SetNumberOfPeopleEvent } from '../types'
import { actions } from './actions'
import { services } from './services'

export const options: MachineOptions<Context, any> = {
  actions,
  services,
  delays: {},
  guards: {
    noSelectedMeal: ({ selectedMeal }: Context) => !selectedMeal,
    noSelectedNumberOfPeople: ({ selectedNumberOfPeople = 0 }) =>
      selectedNumberOfPeople <= 0,
    maxPeopleReached: (_, { payload }: SetNumberOfPeopleEvent) => payload > 10,
    noSelectedRestaurant: ({ selectedRestaurant }: Context) =>
      !selectedRestaurant,
    noSelectedDish: ({ selectedDishes = [] }: Context) => {
      const trimmedSelectedDishes = selectedDishes?.filter(
        (dish) => dish.id !== 0
      )

      return !trimmedSelectedDishes.length
    },
    notEnoughDishForPeople: ({
      selectedDishes = [],
      selectedNumberOfPeople = 0,
    }: Context) => {
      let totalNumberOfDishes = 0

      const trimmedSelectedDishes = selectedDishes?.filter(
        (dish) => dish.id !== 0
      )

      trimmedSelectedDishes.forEach((dish) => {
        totalNumberOfDishes += dish.servings
      })

      return totalNumberOfDishes < selectedNumberOfPeople
    },
  },
}
