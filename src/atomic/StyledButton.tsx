import React, { HTMLProps, PropsWithChildren } from 'react'
import cn from 'classnames'

interface StyledButtonProps
  extends PropsWithChildren,
    HTMLProps<HTMLButtonElement> {
  iconPosition?: 'left' | 'right'
  iconName?: 'arrow-right' | 'arrow-left' | 'plus' | 'check' | 'x'
}

const StyledButton: React.FC<StyledButtonProps> = ({
  className = '',
  iconPosition = 'right',
  iconName = 'plus',
  children,
  ...props
}) => (
  <button
    {...props}
    type='button'
    className={cn(
      className,
      `text-white bg-emerald-500 hover:bg-emerald-600 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center transition-all ${
        children ? 'group' : ''
      }`
    )}
  >
    {iconPosition === 'right' ? children : null}

    {iconName === 'plus' && (
      <svg
        aria-hidden='true'
        className={`w-5 h-5 ml-0 group-hover:ml-5 group-focus:ml-5 transition-all`}
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
      <svg
        className='w-5 h-5 ml-0 group-hover:-ml-1 group-focus:-ml-1 transition-all'
        fill='none'
        viewBox='0 0 24 24'
      >
        <path
          fill='currentColor'
          d='M6.225 4.811a1 1 0 00-1.414 1.414L10.586 12 4.81 17.775a1 1 0 101.414 1.414L12 13.414l5.775 5.775a1 1 0 001.414-1.414L13.414 12l5.775-5.775a1 1 0 00-1.414-1.414L12 10.586 6.225 4.81z'
        />
      </svg>
    )}

    {iconPosition === 'left' ? children : null}
  </button>
)

export default StyledButton
