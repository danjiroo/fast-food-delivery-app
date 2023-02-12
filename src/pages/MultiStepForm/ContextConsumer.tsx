/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import cn from 'classnames'

import {
  StepOne,
  StepTwo,
  StepThree,
  StepFour,
  OrderCompleted,
} from '../../components'

import { MultiStepFormActions, MultiStepFormState } from './ContextProvider'
import { StyledWizard } from '../../atomic'

const ContextConsumer: React.FC = () => {
  const { providerState } = useContext(MultiStepFormState)
  const { providerActions } = useContext(MultiStepFormActions)

  if (!providerState || !providerActions) return null

  const { items, ...restContext } = providerState?.context ?? {}

  return (
    <div className='h-full relative flex left justify-center w-full md:w-1/2 md:items-center'>
      {!providerState.matches('order_completed') ? (
        <StyledWizard stateValue={JSON.stringify(providerState?.value)} />
      ) : null}

      {providerState.matches('loading') && 'Loading...'}
      {providerState.matches('ready.step_one') && <StepOne />}
      {providerState.matches('ready.step_two') && <StepTwo />}
      {providerState.matches('ready.step_three') && <StepThree />}
      {providerState.matches('ready.step_four') && <StepFour />}
      {providerState.matches('order_completed') && <OrderCompleted />}

      {/* <pre
        style={{
          position: 'relative',
          zIndex: 1,
          marginTop: '2rem',
          background: '#333',
          fontSize: '11px',
          color: '#fff',
          padding: '1rem',
        }}
      >
        {JSON.stringify(
          {
            selectedDishes: restContext.selectedDishes,
            dishOptions: restContext?.options?.dishOptions,
          },
          null,
          2
        )}
      </pre> */}
    </div>
  )
}

export default ContextConsumer
