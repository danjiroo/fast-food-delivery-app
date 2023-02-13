/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { Dispatch } from 'react'

import { StyledDropdown, Option, StyledInput, StyledButton } from '../../atomic'
import { Dish, Item } from '../../pages/MultiStepForm/machine'
import { formatSelectOptions } from '../../utils'
import { DeleteComponent } from './SelectedDishes'

interface SelectedDishProps {
  index: number
  selectedDish: Dish
  dishOptions: Item[]
  rowDeleteComponent: Record<string, DeleteComponent>
  handleRemoveDish: (selectedOption: Option) => void
  handleDishChange: (selectedOption: Option & { index: number }) => void
  handleServingsChange: (selectedOption: Dish) => void
  setRowDeleteComponent: Dispatch<Record<string, DeleteComponent> | any>
}

const SelectedDish: React.FC<SelectedDishProps> = ({
  index,
  selectedDish,
  dishOptions,
  rowDeleteComponent,
  handleDishChange,
  handleRemoveDish,
  handleServingsChange,
  setRowDeleteComponent,
}) => {
  const { id, value, servings } = selectedDish

  return (
    <div className='flex items-center justify-between gap-4 mb-2' key={id}>
      <StyledDropdown
        value={selectedDish}
        className='w-7/12'
        options={formatSelectOptions(dishOptions)}
        onChange={(selectedOption) =>
          handleDishChange({ ...selectedOption, index })
        }
      />

      {!rowDeleteComponent[id]?.showDeleteComponent ? (
        <StyledInput
          name={value}
          type='number'
          value={servings}
          //   disabled={!value}
          handleChange={(servings) => {
            if (servings === 0) {
              setRowDeleteComponent((prev: any) => ({
                ...prev,
                [id]: {
                  id,
                  showDeleteComponent: true,
                },
              }))
            }

            handleServingsChange({ ...selectedDish, servings })
          }}
        />
      ) : (
        <div className='flex gap-2 w-[180px] justify-end'>
          <StyledButton
            iconName='trash'
            className='bg-red-400 hover:bg-red-500'
            onClick={() => {
              const { [id]: removed, ...rest } = rowDeleteComponent

              handleRemoveDish(selectedDish)
              setRowDeleteComponent(rest ?? {})
            }}
          />
          <StyledButton
            iconName='x'
            iconPosition='left'
            onClick={() => {
              setRowDeleteComponent((prev: any) => ({
                ...prev,
                [id]: {
                  ...prev[id],
                  showDeleteComponent: false,
                },
              }))

              handleServingsChange({ ...selectedDish, servings: 1 })
            }}
          >
            Cancel
          </StyledButton>
        </div>
      )}
    </div>
  )
}

export default SelectedDish
