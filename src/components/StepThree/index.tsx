/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useContext, useEffect, useState } from 'react'

import { MultiStepFormState, MultiStepFormActions } from '../../pages'
import {
  StyledParagraph,
  StyledDropdown,
  StyledButton,
  StyledInput,
  Option,
  StyledHeading,
} from '../../atomic'

import { formatSelectOptions } from '../../utils'
import { Dish } from '../../pages/MultiStepForm/machine'

interface DeleteComponent {
  id: number
  showDeleteComponent: boolean
}

const StepThree: React.FC = () => {
  const { providerState } = useContext(MultiStepFormState)
  const { providerActions } = useContext(MultiStepFormActions)

  const [rowDeleteComponent, setRowDeleteComponent] = useState<
    Record<string, DeleteComponent>
  >({})
  const [mappedSelectedDishes, setMappedSelectedDishes] = useState<
    JSX.Element | JSX.Element[] | null
  >(null)

  if (!providerState || !providerActions) return null

  const {
    options: { dishOptions = [] },
    selectedDishes,
  } = providerState.context ?? {}

  const {
    handleSelectDish,
    handleSetNumberOfServings,
    handleNext,
    handlePrev,
    handleAddDishSelector,
    handleRemoveDish,
  } = providerActions

  const handleDishChange = (selectedOption: Option & { index: number }) => {
    handleSelectDish(selectedOption)
  }

  const handleServingsChange = ({ servings = 1, ...rest }: Dish) => {
    handleSetNumberOfServings({
      ...rest,
      servings,
    })
  }

  useEffect(() => {
    const dishes = selectedDishes?.length ? (
      selectedDishes.map((selectedDish, index) => {
        const { id, value, servings } = selectedDish

        return (
          <div
            className='flex items-center justify-between gap-4 mb-3'
            key={id}
          >
            <StyledDropdown
              value={selectedDish}
              className='w-7/12'
              options={formatSelectOptions(dishOptions)}
              onChange={(selectedOption) =>
                handleDishChange({ ...selectedOption, index })
              }
            />

            {!rowDeleteComponent[selectedDish?.id]?.showDeleteComponent ? (
              <StyledInput
                name={value}
                type='number'
                value={servings}
                disabled={!value}
                handleChange={(servings) => {
                  if (servings === 0) {
                    setRowDeleteComponent((prev) => ({
                      ...prev,
                      [selectedDish?.id]: {
                        id: selectedDish?.id,
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
                    const { [selectedDish?.id]: removed, ...rest } =
                      rowDeleteComponent

                    handleRemoveDish(selectedDish)
                    setRowDeleteComponent(rest ?? {})
                  }}
                />
                <StyledButton
                  iconName='x'
                  iconPosition='left'
                  onClick={() => {
                    setRowDeleteComponent((prev) => ({
                      ...prev,
                      [selectedDish?.id]: {
                        ...prev[selectedDish?.id],
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
      })
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

    setMappedSelectedDishes(dishes)
  }, [selectedDishes, dishOptions, rowDeleteComponent])

  return (
    <div className='flex flex-col w-full p-5 xl:w-3/4'>
      <div>
        <StyledHeading
          level={1}
          className='text-custom text-3xl min-h-0 mb-3 md:text-5xl md:min-h-[55px] xl:text-8xl xl:min-h-[105px]'
        >
          Tasty!
        </StyledHeading>
        <StyledParagraph className='text-xl text-zinc-500'>
          Food that gets you going.
        </StyledParagraph>
      </div>

      <div className='mt-8 flex flex-col lg:mt-12'>
        <div className='w-full mb-2'>
          <StyledParagraph className='text-zinc-400 mb-2 text-ellipsis overflow-hidden whitespace-nowrap'>
            Please Select a Dish
          </StyledParagraph>

          <div className='custom-scrollbar pr-2'>{mappedSelectedDishes}</div>
        </div>

        {dishOptions?.length ? (
          <div>
            <StyledButton iconName='plus' onClick={handleAddDishSelector} />
          </div>
        ) : null}

        <div className='flex items-center gap-2 mt-5 w-full'>
          <StyledButton
            className='w-1/2'
            onClick={handlePrev}
            iconName='arrow-left'
            iconPosition='left'
          >
            Previous
          </StyledButton>
          <StyledButton
            className='w-1/2'
            onClick={handleNext}
            iconName='arrow-right'
            iconPosition='right'
          >
            Next
          </StyledButton>
        </div>
      </div>
    </div>
  )
}

export default StepThree
