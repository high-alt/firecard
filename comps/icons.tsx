import { SvgIconProps } from '@mui/material'
import React from 'react'

type FancyIconProps = {
	Icon1: React.ComponentType<SvgIconProps>
	Icon2: React.ComponentType<SvgIconProps>
	iconSize?: string
}

export const FancyIcon: React.FC<FancyIconProps> = ({
  Icon1,
  Icon2,
  iconSize = '24px',
}) => {
  return (
    <div className={`h-[280px] relative w-full text-center `}>
      <Icon1
        className={`text-[88px]  hover:scale-105 hover:shadow-2xl transition-transform absolute top-1/3 left-1/3 rounded-lg p-2   transform -rotate-6 -translate-x-8 -translate-y-4 transition-icons border-gray-600 border  bg-gray-100 text-gray-600`}
      />
      <Icon2
        className={`text-[88px] hover:scale-105 hover:shadow-2xl transition-transform absolute p-2 top-1/3 left-1/3 shadow-lg  rounded-md transform rotate-6 translate-x-8 translate-y-4 border-gray-600 border bg-gray-100 text-gray-600`}
      />
    </div>
  )
}
