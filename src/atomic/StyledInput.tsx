import React, { useState, ChangeEvent, HTMLProps, useEffect } from 'react'
import cn from 'classnames'

interface StyledInputProps
  extends HTMLProps<Omit<HTMLInputElement, 'onChange'>> {
  type: string
  placeholder?: string
  value: number
  handleChange: (input: number) => void
}

const StyledInput: React.FC<StyledInputProps> = ({
  type,
  placeholder,
  value,
  className = '',
  handleChange,
  ...rest
}) => {
  const [inputValue, setInputValue] = useState<number>(value)

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(parseInt(event.target.value))
    handleChange(parseInt(event.target.value))
  }

  const handleIncrement = () => {
    if (rest.disabled) return

    // allow clicking until input is 10 (+ 1) to show the maximum error text
    // but wont be saved, and keeps the context at 10
    // still can click on continue since it wasn't incremented to 11 and so on
    setInputValue(Number(inputValue))
    handleChange(Number(inputValue) + 1)
  }

  const handleDecrement = () => {
    if (rest.disabled) return

    value > 0 && setInputValue(Number(inputValue))
    value > 0 && handleChange(Number(inputValue) - 1)
  }

  useEffect(() => {
    setInputValue(value)
  }, [value])

  return (
    <div className={cn(className, 'flex items-center gap-2')}>
      {type === 'number' && (
        <svg
          viewBox='0 0 1024 1024'
          fill={`${rest.disabled || inputValue < 1 ? '#ddd' : 'gray'}`}
          className={`cursor-pointer h-[2.3em] w-[40px] hover:fill-green-300 hover:border-green-300 border-2 rounded-lg transition-all ${
            rest.disabled || inputValue < 1
              ? 'border-gray-100 fill-gray-100 hover:fill-gray-100  hover:border-gray-100'
              : ''
          }`}
          onClick={handleDecrement}
        >
          <path d='M872 474H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h720c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z' />
        </svg>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        className={`px-4 py-2 w-[50px] text-center rounded-lg border border-gray-400 bg-white leading-tight focus:outline-none focus:shadow-outline ${
          rest.disabled
            ? 'border-gray-100 text-gray-200'
            : 'border-gray-400 text-gray-700 '
        }`}
        {...rest}
      />
      {type === 'number' && (
        <svg
          fill={`${rest.disabled || inputValue >= 10 ? '#ddd' : 'gray'}`}
          viewBox='0 0 16 16'
          className={`cursor-pointer h-[2.3em] w-[40px] hover:fill-green-300 hover:border-green-300 border-2 rounded-lg transition-all ${
            rest.disabled || inputValue >= 10
              ? 'border-gray-100 fill-gray-100 hover:fill-gray-100  hover:border-gray-100'
              : ''
          }`}
          onClick={handleIncrement}
        >
          <path d='M8 4a.5.5 0 01.5.5v3h3a.5.5 0 010 1h-3v3a.5.5 0 01-1 0v-3h-3a.5.5 0 010-1h3v-3A.5.5 0 018 4z' />
        </svg>
      )}
    </div>
  )
}

export default StyledInput
