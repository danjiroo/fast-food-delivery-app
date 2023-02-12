import React, { useContext } from 'react'

import { MultiStepFormActions } from '../../pages'
import { StyledHeading, StyledParagraph, StyledButton } from '../../atomic'

const OrderCompleted: React.FC = () => {
  const { providerActions } = useContext(MultiStepFormActions)

  if (!providerActions) return null

  const { handleReset } = providerActions

  return (
    <div className='flex flex-col w-full p-5 xl:w-3/4'>
      <div>
        <StyledHeading
          level={1}
          className='text-custom text-3xl min-h-0 mb-3 md:text-5xl md:min-h-[55px] xl:text-8xl xl:min-h-[105px]'
        >
          Thank you!
        </StyledHeading>
        <StyledParagraph className='text-xl text-zinc-500'>
          We hope you love it. Wanna order again?
        </StyledParagraph>
      </div>

      <div className='flex w-full items-center gap-2 relative mt-12'>
        <StyledButton
          className='w-[200px]'
          onClick={handleReset}
          iconName='arrow-left'
          iconPosition='left'
        >
          Order Again
        </StyledButton>
      </div>
    </div>
  )
}

export default OrderCompleted
