import React, { useContext } from 'react'

import {
  StepOne,
  StepTwo,
  StepThree,
  StepFour,
  OrderCompleted,
} from '../../components'

import { MultiStepFormState } from './ContextProvider'
import { StyledWizard } from '../../atomic'

const ContextConsumer: React.FC = () => {
  const { providerState } = useContext(MultiStepFormState)

  if (!providerState) return null

  return (
    <div className='sticky top-[10vh] mt-[45vh] z-10 min-h-[calc(100vh-10vh)] h-screen flex left bg-white justify-center w-full md:relative md:top-0 md:mt-0 md:min-h-[unset] md:w-1/2 md:items-center'>
      {providerState.matches('loading') && 'Loading...'}
      {providerState.matches('ready.step_one') && <StepOne />}
      {providerState.matches('ready.step_two') && <StepTwo />}
      {providerState.matches('ready.step_three') && <StepThree />}
      {providerState.matches('ready.step_four') && <StepFour />}
      {providerState.matches('order_completed') && <OrderCompleted />}

      {!providerState.matches('order_completed') ? (
        <StyledWizard stateValue={JSON.stringify(providerState?.value)} />
      ) : null}
    </div>
  )
}

export default ContextConsumer
