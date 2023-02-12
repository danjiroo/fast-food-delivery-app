import React from 'react'

import { StyledHeading } from '../../atomic'
import { Item } from '../../pages/MultiStepForm/machine'

interface SelectedCardProps {
  index: number
  dish: Item
}

const GridSelectedDishCard: React.FC<SelectedCardProps> = ({ dish }) => {
  const { name } = dish

  return (
    <div className='flex items-center justify-center w-[32%]'>
      <div className='rounded-lg shadow-md bg-white max-w-sm'>
        <a href='#!'>
          <img
            className='rounded-t-lg'
            src='https://leaveitwithme.com.au/wp-content/uploads/2013/11/dummy-image-square.jpg'
            alt=''
          />
        </a>
        <div className='p-2'>
          <StyledHeading
            level={5}
            className='text-lg text-zinc-500 min-h-0 mb-3 text-ellipsis overflow-hidden whitespace-nowrap'
          >
            {name}
          </StyledHeading>
        </div>
      </div>
    </div>
  )
}

export default GridSelectedDishCard
