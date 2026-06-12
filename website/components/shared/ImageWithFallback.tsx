'use client'
import { useState } from 'react'
import Image, { ImageProps } from 'next/image'
import { cn } from '@/lib/utils'

interface ImageWithFallbackProps extends Omit<ImageProps, 'src'> {
  src: string
  fallbackClassName?: string
}

export default function ImageWithFallback({
  src,
  alt,
  className,
  fallbackClassName,
  ...props
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false)

  if (error) {
    return (
      <div className={cn('bg-gradient-to-br from-brand-navy to-brand-steel flex items-center justify-center', fallbackClassName ?? className)}>
        <span className="text-white/30 text-xs font-medium text-center px-2">{alt}</span>
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
      {...props}
    />
  )
}
