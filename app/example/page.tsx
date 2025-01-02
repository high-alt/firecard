import { Masonry } from '@mui/lab'
import { MessageCard, MessageCardProps } from 'comps/message-card'
import { BottomNav } from 'comps/nav'
import { Pg } from 'comps/pg'
import React from 'react'
import { links } from 'utils/routes'

type Props = {}
const heights = [150, 30, 90, 70, 110, 150, 130, 80, 50, 90, 100, 150, 30, 50, 80]

const testMessageCardArray: MessageCardProps[] = [
  {name: "chicken", message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis laudantium reprehenderit quia sed hic, architecto asperiores cum deleniti nihil voluptates? adipisicing elit. Perspiciatis laudantium reprehenderit quia sed hic, architecto asperiores cum adipisicing elit. Perspiciatis laudantium reprehenderit quia sed hic, architecto asperiores cum ", media:{src:"/cybergift.png", alt:''} }, 
  
  {name: "chicken", message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis laudantium reprehenderit quia sed hic, architecto asperiores cum deleniti nihil voluptates?", media:{src:"/cybergift.png", alt:''} }, 

  {name: "chicken", message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis laudantium reprehenderit quia sed hic, architecto asperiores cum deleniti nihil voluptates?", media:{src:"/tiktok-icon.svg", alt:''} },

  {name: "chicken", message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis laudantium reprehenderit quia sed hic, architecto asperiores cum deleniti nihil voluptates? consectetur adipisicing elit. Perspiciatis laudantium reprehenderit quia sed hic, architecto asperiores cum deleniti nihil voluptates? Perspiciatis laudantium reprehenderit q", media:{src:"/cybergift.png", alt:''} },

  {name: "chicken", message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis laudantium reprehenderit quia sed hic, architecto asperiores cum deleniti nihil voluptates? Perspiciatis laudantium reprehenderit quia sed hic, architecto asperiores cum deleniti nihil voluptates? Perspiciatis laudantium reprehenderit quia sed hic, architecto asperiores cum deleniti nihil voluptates?", media:{src:"/cybergift.png", alt:''} },

  {name: "chicken", message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis laudantium reprehenderit quia sed hic, architecto asperiores cum deleniti nihil voluptates?", media:{src:"/maradona.gif", alt:''} },

  {name: "chicken", message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis laudantium reprehenderit quia sed hic, architecto asperiores cum deleniti nihil voluptates?"}
]
export default(props: Props) => {
  return (
    <div className='space-y-8 bg-white px-4'>
      <h1 className='t-balance'>Example page</h1>
      <div className='w-full justify-center'>
        <Masonry columns={{xs:1, md:3, lg:4}} spacing={6}>
          {testMessageCardArray.map((t, index) => (
            <MessageCard  key={index} {...t} />
          ))}
        </Masonry>
      </div>
    </div>
  )
}