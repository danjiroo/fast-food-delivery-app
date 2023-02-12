import React from 'react'

import { MultiStepForm } from './pages'

const App: React.FC = () => (
  <div className='h-screen w-screen flex flex-col overflow-hidden md:flex-row'>
    <div className='w-full h-[20vh] bg-banner bg-center md:h-full md:w-1/2'></div>
    <MultiStepForm />
  </div>
)

export default App
