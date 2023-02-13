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
          entry: ['removeError'],
          on: {
            NEXT: [
              {
                cond: 'noSelectedMeal',
                actions: ['assignNoSelectedMealError'],
              },
              {
                cond: 'noSelectedNumberOfPeople',
                actions: ['assignNoSelectedNumberOfPeople'],
              },
              {
                cond: 'maxPeopleReached',
                actions: ['assignMaxPeopleReachedError'],
              },
              {
                target: '#step_two',
              },
            ],
            SELECT_MEAL: {
              actions: ['assignSelectedMeal'],
            },
            SET_NUMBER_OF_PEOPLE: [
              {
                cond: 'maxPeopleReached',
                actions: ['assignMaxPeopleReachedError'],
              },
              {
                actions: ['assignNumberOfPeople'],
              },
            ],
          },
        },
        step_two: {
          id: 'step_two',
          entry: ['removeError'],
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
          entry: ['removeError'],
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
            SET_NUMBER_OF_SERVINGS: [
              {
                cond: 'hasZeroServings',
              },
              {
                actions: ['assignServings'],
              },
            ],
            ADD_DISH_SELECTOR: {
              actions: ['addDishSelector'],
            },
            VIEW_TYPE: {
              actions: ['assignDishViewType'],
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
