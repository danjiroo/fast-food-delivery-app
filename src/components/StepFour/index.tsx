import React, { useContext } from 'react'

import { MultiStepFormState, MultiStepFormActions } from '../../pages'
import { StyledParagraph, StyledHeading, StyledButton } from '../../atomic'
import { capFirstLetterForEachWord } from '../../utils'

const StepFour: React.FC = () => {
  const { providerState } = useContext(MultiStepFormState)
  const { providerActions } = useContext(MultiStepFormActions)

  if (!providerState || !providerActions) return null

  const {
    selectedMeal,
    selectedNumberOfPeople = 1,
    selectedRestaurant,
    selectedDishes,
  } = providerState.context ?? {}
  const { handlePrev, handleConfirm } = providerActions

  const mappedSelectedDishes = Object.entries(selectedDishes ?? {})?.map(
    ([, { id, label, servings }]) => (
      <span className='flex justify-between w-full' key={id}>
        <span className='w-full text-zinc-500'>{label}</span>
        <span className='w-[50px] text-zinc-500 text-right'>x {servings}</span>
      </span>
    )
  )

  return (
    <div className='flex flex-col w-full p-5 pb-[10rem] xl:w-3/4'>
      <div>
        <StyledHeading
          level={1}
          className='text-custom text-3xl min-h-0 mb-3 md:text-5xl md:min-h-[55px] xl:text-8xl xl:min-h-[105px]'
        >
          Summary
        </StyledHeading>
        <StyledParagraph className='text-xl text-zinc-500'>
          Expensive but the best!
        </StyledParagraph>
      </div>

      <div className='mt-8 flex flex-col mb-5 lg:mt-12'>
        <div className='flex gap-2 justify-between mb-3'>
          <StyledHeading level={5} className='text-lg text-zinc-600 w-2/5'>
            Meal
          </StyledHeading>
          <StyledParagraph className='w-3/5 text-zinc-500'>
            {capFirstLetterForEachWord(selectedMeal)}
          </StyledParagraph>
        </div>

        <div className='flex gap-2 justify-between mb-3'>
          <StyledHeading
            level={5}
            className='text-lg text-zinc-600 w-2/5 text-ellipsis overflow-hidden whitespace-nowrap'
          >
            No. of People
          </StyledHeading>
          <StyledParagraph className='w-3/5 text-zinc-500'>
            {selectedNumberOfPeople}
          </StyledParagraph>
        </div>

        <div className='flex gap-2 justify-between mb-3'>
          <StyledHeading level={5} className='text-lg text-zinc-600 w-2/5'>
            Restaurant
          </StyledHeading>
          <StyledParagraph className='w-3/5 text-zinc-500'>
            {selectedRestaurant}
          </StyledParagraph>
        </div>

        <div className='flex justify-between gap-2 mb-3'>
          <StyledHeading level={5} className='text-lg text-zinc-600 w-2/5'>
            Dishes
          </StyledHeading>
          <StyledParagraph className='w-3/5 text-zinc-500'>
            {mappedSelectedDishes}
          </StyledParagraph>
        </div>
      </div>

      <div className='flex w-full items-center gap-2 relative mt-2'>
        <StyledButton
          onClick={handlePrev}
          iconPosition='left'
          iconName='arrow-left'
        >
          Previous
        </StyledButton>
        <StyledButton onClick={handleConfirm} iconName='arrow-right'>
          Confirm
        </StyledButton>
      </div>
    </div>
  )
}

export default StepFour
