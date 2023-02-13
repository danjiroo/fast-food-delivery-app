import React, { HTMLProps, PropsWithChildren } from 'react'
import cn from 'classnames'

interface StyledButtonProps
  extends PropsWithChildren,
    HTMLProps<HTMLButtonElement> {
  iconPosition?: 'left' | 'right'
  outline?: 'solid' | 'outline'
  iconName?:
    | 'arrow-right'
    | 'arrow-left'
    | 'plus'
    | 'check'
    | 'x'
    | 'trash'
    | 'grid'
    | 'list'
    | 'chevron-double-up'
    | 'chevron-double-down'
}

const StyledButton: React.FC<StyledButtonProps> = ({
  className = '',
  iconPosition = 'right',
  iconName = 'plus',
  outline = 'solid',
  children,
  ...props
}) => (
  <button
    {...props}
    type='button'
    className={cn(
      className,
      `focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center transition-all ${
        children ? 'group' : ''
      } ${
        outline === 'outline'
          ? 'text-emerald-500 border-emerald-500 hover:border-emerald-600 hover:text-emerald-600 border-2 px-2 py-2'
          : 'text-white bg-emerald-500 hover:bg-emerald-600'
      }`
    )}
  >
    {iconPosition === 'right' ? children : null}

    {iconName === 'plus' && (
      <svg
        aria-hidden='true'
        className={`w-5 h-5 mr-1`}
        fill='currentColor'
        viewBox={`0 0 580 1000`}
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='M550 450c20 0 30 16.667 30 50s-10 50-30 50H340v210c0 20-16.667 30-50 30s-50-10-50-30V550H30c-20 0-30-16.667-30-50s10-50 30-50h210V240c0-20 16.667-30 50-30s50 10 50 30v210h210' />
      </svg>
    )}

    {iconName === 'arrow-right' && (
      <svg
        aria-hidden='true'
        className={`w-5 h-5 ml-3 group-hover:ml-5 group-focus:ml-5 transition-all`}
        fill='currentColor'
        viewBox={`0 0 16 16`}
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          fillRule='evenodd'
          d='M1 8a.5.5 0 01.5-.5h11.793l-3.147-3.146a.5.5 0 01.708-.708l4 4a.5.5 0 010 .708l-4 4a.5.5 0 01-.708-.708L13.293 8.5H1.5A.5.5 0 011 8z'
        />
      </svg>
    )}

    {iconName === 'arrow-left' && (
      <svg
        aria-hidden='true'
        className='w-5 h-5 mr-3 group-hover:-ml-1 group-focus:-ml-1 transition-all'
        fill='currentColor'
        viewBox='0 0 16 16'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          fillRule='evenodd'
          d='M15 8a.5.5 0 00-.5-.5H2.707l3.147-3.146a.5.5 0 10-.708-.708l-4 4a.5.5 0 000 .708l4 4a.5.5 0 00.708-.708L2.707 8.5H14.5A.5.5 0 0015 8z'
        />
      </svg>
    )}

    {iconName === 'check' && (
      <svg
        className='w-5 h-5 ml-0 group-hover:-ml-1 group-focus:-ml-1 transition-all'
        fill='currentColor'
        viewBox='0 0 16 16'
      >
        <path d='M10.97 4.97a.75.75 0 011.07 1.05l-3.99 4.99a.75.75 0 01-1.08.02L4.324 8.384a.75.75 0 111.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 01.02-.022z' />
      </svg>
    )}

    {iconName === 'x' && (
      <svg className='w-5 h-5 mr-2 ' fill='none' viewBox='0 0 24 24'>
        <path
          fill='currentColor'
          d='M6.225 4.811a1 1 0 00-1.414 1.414L10.586 12 4.81 17.775a1 1 0 101.414 1.414L12 13.414l5.775 5.775a1 1 0 001.414-1.414L13.414 12l5.775-5.775a1 1 0 00-1.414-1.414L12 10.586 6.225 4.81z'
        />
      </svg>
    )}

    {iconName === 'trash' && (
      <svg
        className='w-5 h-5 ml-0 group-hover:-ml-1 group-focus:-ml-1 transition-all'
        viewBox='0 0 16 16'
        fill='currentColor'
      >
        <path d='M2.5 1a1 1 0 00-1 1v1a1 1 0 001 1H3v9a2 2 0 002 2h6a2 2 0 002-2V4h.5a1 1 0 001-1V2a1 1 0 00-1-1H10a1 1 0 00-1-1H7a1 1 0 00-1 1H2.5zm3 4a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7a.5.5 0 01.5-.5zM8 5a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7A.5.5 0 018 5zm3 .5v7a.5.5 0 01-1 0v-7a.5.5 0 011 0z' />
      </svg>
    )}

    {iconName === 'grid' && (
      <svg
        className='w-5 h-5 ml-0 group-hover:-ml-1 group-focus:-ml-1 transition-all'
        fill='currentColor'
        viewBox='0 0 16 16'
      >
        <path d='M1 2.5A1.5 1.5 0 012.5 1h3A1.5 1.5 0 017 2.5v3A1.5 1.5 0 015.5 7h-3A1.5 1.5 0 011 5.5v-3zm8 0A1.5 1.5 0 0110.5 1h3A1.5 1.5 0 0115 2.5v3A1.5 1.5 0 0113.5 7h-3A1.5 1.5 0 019 5.5v-3zm-8 8A1.5 1.5 0 012.5 9h3A1.5 1.5 0 017 10.5v3A1.5 1.5 0 015.5 15h-3A1.5 1.5 0 011 13.5v-3zm8 0A1.5 1.5 0 0110.5 9h3a1.5 1.5 0 011.5 1.5v3a1.5 1.5 0 01-1.5 1.5h-3A1.5 1.5 0 019 13.5v-3z' />
      </svg>
    )}

    {iconName === 'list' && (
      <svg
        className='w-5 h-5 ml-0 group-hover:-ml-1 group-focus:-ml-1 transition-all'
        viewBox='0 0 512 512'
        fill='currentColor'
      >
        <path d='M0 96c0-35.3 28.7-64 64-64h384c35.3 0 64 28.7 64 64v320c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zm64 0v64h64V96H64zm384 0H192v64h256V96zM64 224v64h64v-64H64zm384 0H192v64h256v-64zM64 352v64h64v-64H64zm384 0H192v64h256v-64z' />
      </svg>
    )}

    {iconName === 'chevron-double-up' && (
      <svg
        fill='currentColor'
        viewBox='0 0 16 16'
        className='w-5 h-5 ml-0 group-hover:-ml-1 group-focus:-ml-1 transition-all'
      >
        <path
          fillRule='evenodd'
          d='M7.646 2.646a.5.5 0 01.708 0l6 6a.5.5 0 01-.708.708L8 3.707 2.354 9.354a.5.5 0 11-.708-.708l6-6z'
        />
        <path
          fillRule='evenodd'
          d='M7.646 6.646a.5.5 0 01.708 0l6 6a.5.5 0 01-.708.708L8 7.707l-5.646 5.647a.5.5 0 01-.708-.708l6-6z'
        />
      </svg>
    )}

    {iconName === 'chevron-double-down' && (
      <svg
        fill='currentColor'
        viewBox='0 0 16 16'
        className='w-5 h-5 ml-0 group-hover:-ml-1 group-focus:-ml-1 transition-all'
      >
        <path
          fillRule='evenodd'
          d='M1.646 6.646a.5.5 0 01.708 0L8 12.293l5.646-5.647a.5.5 0 01.708.708l-6 6a.5.5 0 01-.708 0l-6-6a.5.5 0 010-.708z'
        />
        <path
          fillRule='evenodd'
          d='M1.646 2.646a.5.5 0 01.708 0L8 8.293l5.646-5.647a.5.5 0 01.708.708l-6 6a.5.5 0 01-.708 0l-6-6a.5.5 0 010-.708z'
        />
      </svg>
    )}

    {iconPosition === 'left' ? children : null}
  </button>
)

export default StyledButton
