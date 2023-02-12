import { MachineOptions } from 'xstate'

import { Context, MachineEvents } from '../types'
import { actions } from './actions'
import { services } from './services'

export const options: MachineOptions<Context, MachineEvents> = {
  actions,
  services,
  delays: {},
  guards: {
    noSelectedMeal: ({ selectedMeal }: Context) => !selectedMeal,
    maxPeopleReached: ({ selectedNumberOfPeople = 0 }: Context) =>
      selectedNumberOfPeople > 0 && selectedNumberOfPeople < 10,
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
