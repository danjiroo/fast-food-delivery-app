import React from 'react'

import { MultiStepForm } from './pages'

const App: React.FC = () => (
  <div className='h-screen w-screen flex flex-col overflow-x-hidden scroll-smooth md:flex-row md:overflow-hidden'>
    <div className='fixed w-full h-[45vh] bg-banner bg-center md:relative md:h-full md:w-1/2'></div>
    <MultiStepForm />
  </div>
)

export default App
