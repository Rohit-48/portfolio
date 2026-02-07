'use client'

import React from 'react'

interface RetroCardProps {
  children: React.ReactNode
  className?: string
  bgColor?: string
  noShadow?: boolean
  onClick?: () => void
  delay?: number
}

export const RetroCard: React.FC<RetroCardProps> = ({
  children,
  className = '',
  bgColor = 'bg-white',
  noShadow = false,
  onClick,
  delay = 0,
}) => {
  return (
    <div
      onClick={onClick}
      style={{
        animationDelay: `${delay * 1000}ms`,
      }}
      className={` ${bgColor} rounded-2xl border-4 border-black ${noShadow ? '' : 'shadow-[4px_4px_0px_0px_black]'} animate-fade-in-up relative overflow-hidden ${onClick ? 'cursor-pointer hover:-translate-x-0.5 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_#232323] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_#232323]' : ''} transition-all duration-200 ${className} `}
    >
      {children}
    </div>
  )
}
