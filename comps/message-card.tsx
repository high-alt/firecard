"use client"
import React, { useState } from 'react'
import { CardProps } from './cards'
import Img, { MediaImgProps } from './media-img'
import { fonts, FontType } from 'utils/fonts'

export type MessageCardProps = {
  name: string
  message: string
  media?: MediaImgProps
  onClick?: ()=> void
  className?: string
  font: FontType
}

export const MessageCard = (props: MessageCardProps) => {
  const [message, setMessage] = useState<MessageCardProps>({name:"", message:'', font: fonts[0]})

  return (
    <div onClick={props.onClick} className={"flex flex-col items-center overflow-hidden "  + props.className}
    >{props.media &&
    <Img
      {...props.media}
    />}
      <div className=" w-full p-4 mb-2 space-y-4 bg-white">
        <div className="text-gray-700 cursor-pointer space-y-2">
          <p style={{fontFamily: props.font.name}}>{props.message}</p>
          <span className={"flex w-full justify-end cursor-pointer t-sm "} style={{fontFamily: props.font.name}}>
            {props.name}
          </span>
        </div>
      </div>
    </div>
  )
}