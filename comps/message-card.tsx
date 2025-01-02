"use client"
import React, { useState } from 'react'
import { CardProps } from './cards'
import Img, { MediaImgProps } from './media-img'

export type MessageCardProps = {
  name?: string
  message?: string
  media?: MediaImgProps
  onClick?: ()=> void
  className?: string
}

export const MessageCard = (props: MessageCardProps) => {
  const [message, setMessage] = useState<MessageCardProps>({})

  return (<div onClick={props.onClick} className={"cursor-pointer pb-2 space-y-2 flex flex-col items-center w-full overflow-hidden rounded-[16px] "  + props.className}
  >{props.media &&
    <Img
      secondaryProps={{className:"hover:border-solid rounded-[16px]"}}
      {...props.media}
    />}
    <div className=" w-full p-4 my-auto bg-red-200 mb-2 rounded-[16px] space-y-4">
      <div className="text-gray-700 cursor-pointer space-y-2">
        <p>{props.message}</p>
        <span className={"flex w-full justify-end cursor-pointer t-sm "}>
          {props.name}
        </span>
      </div>
    </div>
  </div>
  )
}