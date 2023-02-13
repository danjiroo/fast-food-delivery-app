import React, { useContext } from 'react'

import { MultiStepFormState, MultiStepFormActions } from '../../pages'
import { StyledParagraph, StyledButton, StyledHeading } from '../../atomic'

import SelectedDishes from './SelectedDishes'
import GridDishOptions from './GridDishOptions'

const StepThree: React.FC = () => {
  const { providerState } = useContext(MultiStepFormState)
  const { providerActions } = useContext(MultiStepFormActions)

  if (!providerState || !providerActions) return null

  const {
    options: { dishOptions = [] },
    errorFields,
    selectedDishesViewType = 'list',
  } = providerState.context ?? {}
  const { error = false, errorText = '' } = errorFields ?? {}

  const {
    handleNext,
    handlePrev,
    handleAddDishSelector,
    handleChangeDishViewType,
  } = providerActions

  return (
    <div className='flex flex-col w-full p-5 pb-[10rem] xl:w-3/4'>
      <div>
        <StyledHeading
          level={1}
          className={`text-3xl min-h-0 mb-3 md:text-5xl md:min-h-[55px] ${
            selectedDishesViewType === 'list'
              ? 'text-custom xl:text-8xl xl:min-h-[105px]'
              : 'xl:text-[3rem] xl:min-h-[unset] text-[#04cf77e5]'
          }`}
        >
          Tasty!
        </StyledHeading>
        <StyledParagraph className='text-xl text-zinc-500'>
          Food that gets you going.
        </StyledParagraph>
      </div>

      <div
        className={`mt-8 flex flex-col ${
          selectedDishesViewType === 'list' ? 'lg:mt-12' : 'lg:mt-7'
        }`}
      >
        <div className='w-full mb-2 relative'>
          <StyledParagraph className='text-zinc-400 mb-2 text-ellipsis overflow-hidden whitespace-nowrap'>
            Please Select a Dish
          </StyledParagraph>

          {
            // Decided to hide this since I focused on the list/dropdown view implementation
            false && (
              <div className='absolute top-[3px] right-0 flex gap-1'>
                <StyledButton
                  outline='outline'
                  iconName='list'
                  className={`border-none px-0 py-0 transition-all ${
                    selectedDishesViewType !== 'list' && 'text-gray-300'
                  }`}
                  onClick={() => handleChangeDishViewType('list')}
                />
                <StyledButton
                  outline='outline'
                  iconName='grid'
                  className={`border-none px-0 py-0 transition-all ${
                    selectedDishesViewType !== 'grid' && 'text-gray-300'
                  }`}
                  onClick={() => handleChangeDishViewType('grid')}
                />
              </div>
            )
          }

          <div className='custom-scrollbar pr-2'>
            {selectedDishesViewType === 'list' ? (
              <SelectedDishes />
            ) : (
              <GridDishOptions />
            )}
          </div>
        </div>

        {dishOptions?.length && selectedDishesViewType === 'list' ? (
          <div className='mb-3 text-right pr-2'>
            <StyledButton
              iconName='plus'
              iconPosition='left'
              outline='outline'
              onClick={handleAddDishSelector}
            >
              Add Dish
            </StyledButton>
          </div>
        ) : null}

        <div className='flex w-full items-center gap-2 relative mt-5'>
          {error ? (
            <StyledParagraph className='absolute -top-7 pl-1 text-red-400 mb-2 text-ellipsis overflow-hidden whitespace-nowrap'>
              <small>{errorText}</small>
            </StyledParagraph>
          ) : null}
          <StyledButton
            className='w-full sm:w-[200px] md:w-full lg:w-1/2'
            onClick={handlePrev}
            iconName='arrow-left'
            iconPosition='left'
          >
            Previous
          </StyledButton>
          <StyledButton
            className='w-full sm:w-[200px] md:w-full lg:w-1/2'
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
