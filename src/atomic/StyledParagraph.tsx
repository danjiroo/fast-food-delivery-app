import React, { HTMLProps, PropsWithChildren } from 'react'
import cn from 'classnames'

interface StyledParagraphProps
  extends PropsWithChildren,
    HTMLProps<HTMLParagraphElement> {}

const StyledParagraph: React.FC<StyledParagraphProps> = ({
  className = '',
  children,
}) => <p className={cn(className, 'text-black')}>{children}</p>

export default StyledParagraph
