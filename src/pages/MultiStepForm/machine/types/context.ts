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
  rowIndex: string
}

export interface Context {
  items: Item[]
  options: Options
  selectedNumberOfPeople?: number
  selectedMeal?: string
  selectedRestaurant?: string
  selectedDishes?: Record<string, Dish>
}
