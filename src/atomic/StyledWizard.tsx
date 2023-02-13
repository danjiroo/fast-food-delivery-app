import React from 'react'
import cn from 'classnames'

interface WizardProps {
  stateValue: string
}

enum Progress {
  ONE = 'step_one',
  TWO = 'step_two',
  THREE = 'step_three',
  FOUR = 'step_four',
}

const StyledWizard: React.FC<WizardProps> = ({ stateValue }) => {
  const getProgress = () => {
    if (!stateValue.includes('ready')) return

    const stringifiedStateValue = stateValue.split('":"')?.[1].replace('"}', '')

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

  const mappedWizardButtons = [...Array(4)].map((_, index) => (
    <b key={index} className='shadow-md border-2 border-teal-500'></b>
  ))

  return (
    <div
      className='wizard-container fixed w-full p-7 bottom-[0] bg-white md:absolute md:shadow-none md:bottom-[3rem] xl:w-3/4'
      id='app'
    >
      <div className='wizard-button-container flex justify-between p-5'>
        {mappedWizardButtons}
      </div>
      <div className={cn(getProgress(), 'wizard-bar transition-all')}></div>
    </div>
  )
}

export default StyledWizard
