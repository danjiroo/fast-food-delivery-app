import React, { useContext } from 'react'

import { MultiStepFormState, MultiStepFormActions } from '../../pages'
import { StyledParagraph, StyledButton, StyledHeading } from '../../atomic'

import SelectedDishes from './SelectedDishes'

const StepThree: React.FC = () => {
  const { providerState } = useContext(MultiStepFormState)
  const { providerActions } = useContext(MultiStepFormActions)

  if (!providerState || !providerActions) return null

  const {
    options: { dishOptions = [] },
  } = providerState.context ?? {}

  const { handleNext, handlePrev, handleAddDishSelector } = providerActions

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

          <div className='custom-scrollbar pr-2'>
            <SelectedDishes />
          </div>
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
