import React, { HTMLProps } from 'react'
import cn from 'classnames'

interface StyledHeadingProps extends HTMLProps<HTMLHeadElement> {
  level: 1 | 2 | 3 | 4 | 5 | 6
  children: React.ReactNode
}

const StyledHeading: React.FC<StyledHeadingProps> = ({
  level,
  className = '',
  children,
}) => {
  const HtmlTag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

  return (
    <HtmlTag className={cn(className, 'text-white text-4xl font-bold')}>
      {children}
    </HtmlTag>
  )
}

export default StyledHeading
