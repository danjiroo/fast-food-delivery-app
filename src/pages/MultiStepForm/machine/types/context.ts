export interface Item {
  id: number
  name: string
  restaurant: string
  availableMeals: string[]
}

export interface Options {
  dishOptions: Item[]
  restaurantOptions: string[]
  availableMealOptions: string[]
}

export interface DishOption {
  id: number
  value: string
  label: string
}

export interface Dish extends DishOption {
  servings: number
}

export interface Error {
  error: boolean
  errorText: string
}

// type ErrorSlots = 'meal' | 'restaurant' | 'numberOfPeople' | 'dishes'

export interface Context {
  items: Item[]
  options: Partial<Options>
  selectedNumberOfPeople?: number
  selectedMeal?: string
  selectedRestaurant?: string
  selectedDishes?: Dish[]
  // errorFields: Partial<{
  //   [P in ErrorSlots]: Error
  // }>
  errorFields?: Error
  selectedDishesViewType: 'list' | 'grid'
}
