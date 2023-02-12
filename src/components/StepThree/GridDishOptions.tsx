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
    options: { dishOptions = [] },
  } = providerState.context ?? {}

  const mappedSelectedDishes = dishOptions?.length
    ? dishOptions.map((dish, index) => (
        <GridSelectedDishCard index={index} key={dish?.id} dish={dish} />
      ))
    : 'No meals available.'

  return (
    <>
      <StyledParagraph className='pl-1 text-red-400 mb-2 text-ellipsis overflow-hidden whitespace-nowrap'>
        Under construction. Last minute decision to have a grid view.
      </StyledParagraph>
      <div className='flex flex-wrap gap-2 max-h-[440px] overflow-y-auto pb-5'>
        {mappedSelectedDishes}
      </div>
    </>
  )
}

export default GridDishOptions
