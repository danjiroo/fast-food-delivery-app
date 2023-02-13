import React, { useContext } from 'react'

import { MultiStepFormState, MultiStepFormActions } from '../../pages'
import {
  StyledParagraph,
  StyledDropdown,
  StyledButton,
  Option,
  StyledHeading,
} from '../../atomic'
import { formatSelectOptions } from '../../utils'

const StepTwo: React.FC = () => {
  const { providerState } = useContext(MultiStepFormState)
  const { providerActions } = useContext(MultiStepFormActions)

  if (!providerState || !providerActions) return null

  const {
    options: { restaurantOptions = [] },
    selectedRestaurant,
    errorFields,
  } = providerState.context ?? {}
  const { error = false, errorText = '' } = errorFields ?? {}

  const { handleSelectRestaurant, handleNext, handlePrev } = providerActions

  const handleRestaurantChange = (selectedOption: Option) => {
    handleSelectRestaurant(selectedOption)
  }

  return (
    <div className='flex flex-col w-full p-5 pb-[10rem] xl:w-3/4'>
      <div>
        <StyledHeading
          level={1}
          className='text-custom text-3xl min-h-0 mb-3 md:text-5xl md:min-h-[55px] xl:text-8xl xl:min-h-[105px]'
        >
          Diner?
        </StyledHeading>
        <StyledParagraph className='text-xl text-zinc-500'>
          Then look no further!
        </StyledParagraph>
      </div>

      <div className='mt-8 flex mb-5 lg:mt-12'>
        <div className='w-full xl:w-full'>
          <StyledParagraph className='text-zinc-400 mb-2 text-ellipsis overflow-hidden whitespace-nowrap'>
            Please Select a Restaurant
          </StyledParagraph>
          <StyledDropdown
            value={selectedRestaurant}
            options={formatSelectOptions(restaurantOptions)}
            onChange={handleRestaurantChange}
          />
        </div>
      </div>
      {/* <div className='flex w-full items-center gap-2 relative mt-2'> */}
      <div className='flex w-full items-center gap-2 mt-5 fixed bottom-[4rem] left-0 right-0 px-5 py-4 pb-0 bg-white md:relative md:bottom-[unset] md:p-0'>
        {error ? (
          <StyledParagraph className='absolute -top-7 pl-1 text-red-400 mb-2 text-ellipsis overflow-hidden whitespace-nowrap'>
            <small>{errorText}</small>
          </StyledParagraph>
        ) : null}
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
  )
}

export default StepTwo
