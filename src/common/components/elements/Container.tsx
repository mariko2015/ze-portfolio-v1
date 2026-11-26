import { HTMLAttributes } from 'react'

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  withMarginTop?: boolean
}

export default function Container({ children, className = '', withMarginTop = true, ...others }: ContainerProps) {
  return (
    <div
      data-testid="container"
      className={`mb-10 w-full ${withMarginTop ? 'mt-6' : ''} p-4 md:p-8 lg:max-w-4xl ${className}`}
      {...others}
    >
      {children}
    </div>
  )
}
