import React, { useEffect, useRef, useState } from 'react'
import cn from 'classnames'

import { capFirstLetterForEachWord } from '../utils'
import { Dish } from '../pages/MultiStepForm/machine'

export interface Option {
  id?: number
  label: string
  value: Dish | string
}

interface StyledDropdownProps {
  options: Option[]
  value?: Dish | string
  className?: string
  onChange: (selectedOption: Option) => void
}

const StyledDropdown: React.FC<StyledDropdownProps> = ({
  options,
  value,
  className = '',
  onChange,
}) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const selectRef = useRef<HTMLDivElement>(null)

  const handleSelectOption = (option: Option) => {
    setSelectedOption(option)
    setIsOpen(false)
    onChange(option)
  }

  useEffect(() => {
    if (value) {
      if (typeof value == 'object') {
        setSelectedOption(value)

        return
      }

      setSelectedOption({
        label: capFirstLetterForEachWord(value),
        value,
      })
    }
  }, [value])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!selectRef.current?.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <div className={cn(className, 'relative')}>
      <div
        ref={selectRef}
        className='flex items-center w-full h-10 px-4 py-2 rounded-lg border border-gray-400 bg-white cursor-pointer focus:outline-none'
        onClick={() => options?.length && setIsOpen(!isOpen)}
      >
        <span
          className={`${
            !selectedOption?.value ? 'text-zinc-300' : 'text-gray-700'
          }  text-ellipsis overflow-hidden whitespace-nowrap`}
        >
          {selectedOption ? selectedOption.label : 'Select an option'}
        </span>
        {options?.length ? (
          <div className='ml-auto'>
            <svg
              fill='currentColor'
              viewBox='0 0 16 16'
              height='1em'
              width='1em'
            >
              {isOpen ? (
                <path
                  fillRule='evenodd'
                  d='M7.646 4.646a.5.5 0 01.708 0l6 6a.5.5 0 01-.708.708L8 5.707l-5.646 5.647a.5.5 0 01-.708-.708l6-6z'
                />
              ) : (
                <path
                  fillRule='evenodd'
                  d='M1.646 4.646a.5.5 0 01.708 0L8 10.293l5.646-5.647a.5.5 0 01.708.708l-6 6a.5.5 0 01-.708 0l-6-6a.5.5 0 010-.708z'
                />
              )}
            </svg>
          </div>
        ) : null}
      </div>
      {isOpen && options?.length ? (
        <ul className='absolute w-full mt-1 bg-white rounded-lg shadow-xl overflow-auto z-10'>
          {options.map((option, index) => (
            <li
              key={index}
              className='px-4 py-2 cursor-pointer text-zinc-700 hover:bg-emerald-400 hover:text-white'
              onClick={() => handleSelectOption(option)}
            >
              {option?.label}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

export default StyledDropdown
