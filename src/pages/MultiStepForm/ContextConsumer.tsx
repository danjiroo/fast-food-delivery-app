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
    <div className='h-screen relative flex left justify-center w-full md:w-1/2 md:items-center'>
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
