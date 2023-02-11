import React, { useContext } from 'react'

import { MultiStepFormState, MultiStepFormActions } from '../../pages'
import {
  StyledParagraph,
  StyledDropdown,
  StyledInput,
  StyledButton,
  Option,
  StyledHeading,
} from '../../atomic'
import { formatSelectOptions } from '../../utils'

const StepOne: React.FC = () => {
  const { providerState } = useContext(MultiStepFormState)
  const { providerActions } = useContext(MultiStepFormActions)

  if (!providerState || !providerActions) return null

  const {
    options: { availableMealOptions = [] },
    selectedMeal,
    selectedNumberOfPeople = 1,
  } = providerState.context ?? {}

  const { handleSelectMeal, handleSetNumberOfPeople, handleNext } =
    providerActions

  const handleMealChange = (selectedOption: Option) => {
    handleSelectMeal(selectedOption)
  }

  const handleNumberOfPeopleChange = (input: number | string) => {
    console.log('input', input)
    handleSetNumberOfPeople(input)
  }

  return (
    <div className='flex flex-col w-full p-5 xl:w-3/4'>
      <div>
        <StyledHeading
          level={1}
          className='text-custom text-3xl min-h-0 mb-3 md:text-5xl md:min-h-[55px] xl:text-8xl xl:min-h-[105px]'
        >
          Hungry?
        </StyledHeading>
        <StyledParagraph className='text-xl text-zinc-500'>
          Your belly knows best!
        </StyledParagraph>
      </div>
      <div className='mt-8 flex gap-3 mb-5 justify-between sm:gap-12 lg:mt-12'>
        <div className='w-7/12 sm:w-5/12'>
          <StyledParagraph className='text-zinc-400 mb-2 text-ellipsis overflow-hidden whitespace-nowrap'>
            Please Select a Meal
          </StyledParagraph>
          <StyledDropdown
            value={selectedMeal}
            options={formatSelectOptions(availableMealOptions)}
            onChange={handleMealChange}
          />
        </div>

        <div className='w-[140px]'>
          <StyledParagraph className='text-zinc-400 mb-2 text-ellipsis overflow-hidden whitespace-nowrap'>
            No. of People
          </StyledParagraph>
          <StyledInput
            name='numberOfPeople'
            type='number'
            value={selectedNumberOfPeople}
            handleChange={handleNumberOfPeopleChange}
            min={1}
            max={10}
          />
        </div>
      </div>

      <StyledButton
        iconName='arrow-right'
        iconPosition='right'
        className='w-[200px] xl:w-full'
        onClick={handleNext}
      >
        Proceed
      </StyledButton>
    </div>
  )
}

export default StepOne
