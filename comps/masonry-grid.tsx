"use client"
import { Masonry } from "@mui/lab"
import { Card, PriceCard } from "./cards"
import { MessageCard, MessageCardProps } from "./message-card"
import { fonts } from "utils/fonts"

const testMessageCardArray: MessageCardProps[] = [
  {name: "Emma", message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis laudantium reprehenderit quia sed hic, architecto asperiores cum deleniti nihil voluptates? adipisicing elit. Perspiciatis laudantium reprehenderit quia sed hic, architecto asperiores cum adipisicing elit. Perspiciatis laudantium reprehenderit quia sed hic, architecto asperiores cum ", media:{src:"/hny.webp", alt:''},font: fonts[6] }, 
  
  {name: "Aaron", message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis laudantium reprehenderit quia sed hic, architecto asperiores cum deleniti nihil voluptates?", media:{src:"/cybergift.png", alt:''},font: fonts[2] }, 

  {name: "Caroline", message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis laudantium reprehenderit quia sed hic, architecto asperiores cum deleniti nihil voluptates?", media:{src:"/tiktok-icon.svg", alt:''},font: fonts[0] },

  {name: "Steven", message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis laudantium reprehenderit quia sed hic, architecto asperiores cum deleniti nihil voluptates? consectetur adipisicing elit. Perspiciatis laudantium reprehenderit quia sed hic, architecto asperiores cum deleniti nihil voluptates? Perspiciatis laudantium reprehenderit q", media:{src:"/cybergift.png", alt:''},font: fonts[0] },

  {name: "Daniel", message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis laudantium reprehenderit quia sed hic, architecto asperiores cum deleniti nihil voluptates? Perspiciatis laudantium reprehenderit quia sed hic, architecto asperiores cum deleniti nihil voluptates? Perspiciatis laudantium reprehenderit quia sed hic, architecto asperiores cum deleniti nihil voluptates?", media:{src:"/cybergift.png", alt:''},font: fonts[4] },

  {name: "chicken", message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis laudantium reprehenderit quia sed hic, architecto asperiores cum deleniti nihil voluptates?", media:{src:"/maradona.gif", alt:''}, font: fonts[3] },

  {name: "chicken", message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis laudantium reprehenderit quia sed hic, architecto asperiores cum deleniti nihil voluptates?", font: fonts[0]}
]

export default () =>{
  return(
    <div className='p-4' style={{backgroundImage: 'url(/bg-1.jpg)'}}>
      <Masonry columns={{xs:1, md:3, lg:4}} spacing={6}>
        {testMessageCardArray.map((t, index) => <MessageCard key={index} {...t} />)}
      </Masonry>
    </div>
  )
}