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

enum Progress {
  ONE = 'step_one',
  TWO = 'step_two',
  THREE = 'step_three',
  FOUR = 'step_four',
}

const ContextConsumer: React.FC = () => {
  const { providerState } = useContext(MultiStepFormState)
  const { providerActions } = useContext(MultiStepFormActions)

  if (!providerState || !providerActions) return null

  const { items, ...restContext } = providerState?.context ?? {}

  const mappedWizardButtons = [...Array(4)].map((_, index) => (
    <b key={index} className='shadow-md border-2 border-teal-500'></b>
  ))

  const getProgress = () => {
    if (!providerState.matches('ready')) return

    const stringifiedStateValue = JSON.stringify(providerState.value)
      .split('":"')?.[1]
      .replace('"}', '')

    switch (stringifiedStateValue) {
      case Progress.ONE:
        return 'w-0'
      case Progress.TWO:
        return 'w-1/3'
      case Progress.THREE:
        return 'w-2/3'
      case Progress.FOUR:
      default:
        return 'w-3/3'
    }
  }

  return (
    <div className='h-full relative flex left justify-center w-full md:w-1/2 md:items-center'>
      {providerState.matches('loading') && 'Loading...'}
      {providerState.matches('ready.step_one') && <StepOne />}
      {providerState.matches('ready.step_two') && <StepTwo />}
      {providerState.matches('ready.step_three') && <StepThree />}
      {providerState.matches('ready.step_four') && <StepFour />}
      {providerState.matches('order_completed') && <OrderCompleted />}

      <div
        className='wizard-container w-full p-5 xl:w-3/4 bottom-[5rem] sm:bottom-[2.5rem]'
        id='app'
      >
        <div className='wizard-button-container flex justify-between p-5'>
          {mappedWizardButtons}
        </div>
        <div className={cn(getProgress(), 'wizard-bar transition-all')}></div>
      </div>

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
