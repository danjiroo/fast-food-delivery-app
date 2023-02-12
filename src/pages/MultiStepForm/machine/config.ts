import { MachineConfig } from 'xstate'

import { Context, StateSchema, MachineEvents } from './types'

export const config: MachineConfig<Context, StateSchema, MachineEvents> = {
  id: 'multi-step-form-machine',
  initial: 'loading',
  states: {
    loading: {
      id: 'loading',
      invoke: {
        id: 'loading-items',
        src: 'loadingItems',
      },
      on: {
        ITEMS_LOADED: {
          actions: ['assignItems', 'assignMealOptions'],
          target: '#ready',
        },
      },
    },
    ready: {
      id: 'ready',
      initial: 'step_one',
      states: {
        step_one: {
          id: 'step_one',
          on: {
            NEXT: [
              {
                cond: 'noSelectedMeal',
                actions: ['assignNoSelectedMealError'],
              },
              {
                target: '#step_two',
              },
            ],
            SELECT_MEAL: {
              actions: ['assignSelectedMeal'],
            },
            SET_NUMBER_OF_PEOPLE: [
              // {
              //   // Although I already handled this in the component
              //   cond: 'maxPeopleReached',
              //   actions: ['assignNumberOfPeople', 'assignMaxPeopleReached'],
              // },
              {
                actions: ['assignNumberOfPeople'],
              },
            ],
          },
        },
        step_two: {
          id: 'step_two',
          on: {
            NEXT: [
              {
                cond: 'noSelectedRestaurant',
                actions: ['assignNoSelectedRestaurantError'],
              },
              {
                target: '#step_three',
              },
            ],
            PREV: '#step_one',
            UPDATE_RESTAURANT_OPTIONS: {
              actions: ['assignRestaurantOptions'],
            },
            SELECT_RESTAURANT: {
              actions: ['assignSelectedRestaurant'],
            },
          },
        },
        step_three: {
          id: 'step_three',
          on: {
            NEXT: [
              {
                cond: 'noSelectedDish',
                actions: ['assignNoSelectedDishError'],
              },
              {
                cond: 'notEnoughDishForPeople',
                actions: ['assignNotEnoughDishForPeopleError'],
              },
              {
                actions: ['trimSelectedDishes'],
                target: '#step_four',
              },
            ],
            PREV: '#step_two',
            UPDATE_DISH_OPTIONS: {
              actions: ['assignDishOptions'],
            },
            SELECT_DISH: {
              actions: ['assignDish'],
            },
            REMOVE_DISH: {
              actions: ['removeDish'],
            },
            SET_NUMBER_OF_SERVINGS: {
              actions: ['assignServings'],
            },
            ADD_DISH_SELECTOR: {
              actions: ['addDishSelector'],
            },
          },
        },
        step_four: {
          id: 'step_four',
          on: {
            PREV: '#step_three',
            CONFIRM: '#order_completed',
          },
        },
      },
    },
    order_completed: {
      id: 'order_completed',
      entry: ['logResult'],
      on: {
        RESET: {
          actions: ['resetContext'],
          target: '#loading',
        },
      },
    },
    done: {
      id: 'done',
    },
  },
}
