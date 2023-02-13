import React, { useState, useContext } from 'react'

import { MultiStepFormState, MultiStepFormActions } from '../../pages'
import { StyledDropdown, Option } from '../../atomic'
import { formatSelectOptions } from '../../utils'
import { Dish } from '../../pages/MultiStepForm/machine'

import SelectedDish from './SelectedDish'

export interface DeleteComponent {
  id: number
  showDeleteComponent: boolean
}

const SelectedDishes: React.FC = () => {
  const { providerState } = useContext(MultiStepFormState)
  const { providerActions } = useContext(MultiStepFormActions)

  if (!providerState || !providerActions) return null

  const [rowDeleteComponent, setRowDeleteComponent] = useState<
    Record<string, DeleteComponent>
  >({})

  const {
    options: { dishOptions = [] },
    selectedDishes,
  } = providerState.context ?? {}

  const { handleSelectDish, handleRemoveDish, handleSetNumberOfServings } =
    providerActions

  const handleDishChange = (selectedOption: Option & { index: number }) => {
    handleSelectDish(selectedOption)
  }

  const handleServingsChange = ({ servings = 0, ...rest }: Dish) => {
    handleSetNumberOfServings({
      ...rest,
      servings,
    })
  }

  const dishProps = {
    dishOptions,
    rowDeleteComponent,
    handleRemoveDish,
    handleDishChange,
    handleServingsChange,
    setRowDeleteComponent,
  }

  const mappedSelectedDishes = selectedDishes?.length ? (
    selectedDishes.map((selectedDish, index) => (
      <SelectedDish
        index={index}
        key={selectedDish?.id}
        selectedDish={selectedDish}
        {...dishProps}
      />
    ))
  ) : (
    <div className='flex items-center gap-4'>
      <StyledDropdown
        className='w-full'
        options={formatSelectOptions(dishOptions)}
        onChange={(selectedOption) =>
          handleDishChange({ ...selectedOption, index: 0 })
        }
      />
    </div>
  )

  return <>{mappedSelectedDishes}</>
}

export default SelectedDishes
