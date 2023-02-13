/* eslint-disable indent */
import React, { useContext } from 'react'

import { MultiStepFormState, MultiStepFormActions } from '../../pages'
import { StyledParagraph } from '../../atomic'

import GridSelectedDishCard from './GridSelectedDishCard'

export interface DeleteComponent {
  id: number
  showDeleteComponent: boolean
}

const GridDishOptions: React.FC = () => {
  const { providerState } = useContext(MultiStepFormState)
  const { providerActions } = useContext(MultiStepFormActions)

  if (!providerState || !providerActions) return null

  const {
    options: { dishOptionsFixed = [] },
  } = providerState.context ?? {}

  const mappedSelectedDishes = dishOptionsFixed?.length
    ? dishOptionsFixed.map((dish, index) => (
        <GridSelectedDishCard index={index} key={dish?.id} dish={dish} />
      ))
    : 'No meals available.'

  return (
    <>
      <StyledParagraph className='pl-1 text-red-400 mb-2 text-ellipsis overflow-hidden whitespace-nowrap'>
        Under construction. Last minute decision to have a grid view.
      </StyledParagraph>
      <div className='flex flex-wrap justify-between gap-2 max-h-[440px] overflow-x-hidden overflow-y-auto pb-[5rem]'>
        {mappedSelectedDishes}
      </div>
    </>
  )
}

export default GridDishOptions
