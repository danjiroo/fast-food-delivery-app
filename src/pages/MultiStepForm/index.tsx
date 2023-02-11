import React from 'react'

import MultiStepFormProvider from './ContextProvider'
import MultiStepFormConsumer from './ContextConsumer'

export * from './ContextProvider'

const MultiStepForm: React.FC = () => (
  <MultiStepFormProvider>
    <MultiStepFormConsumer />
  </MultiStepFormProvider>
)

export default MultiStepForm
