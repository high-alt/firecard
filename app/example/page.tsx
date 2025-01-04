import { Masonry } from '@mui/lab'
import { AppBar, Modal, Toolbar } from '@mui/material'
import Button from 'comps/button'
import { MessageCard, MessageCardProps } from 'comps/message-card'
import { BottomNav } from 'comps/nav'
import { Pg } from 'comps/pg'
import React from 'react'
import { links } from 'utils/routes'
import SendIcon from '@mui/icons-material/Send'
import AddIcon from '@mui/icons-material/AddCircleOutlined'
import { CreateMessage } from 'comps/forms/create-message'

type Props = {}
const heights = [150, 30, 90, 70, 110, 150, 130, 80, 50, 90, 100, 150, 30, 50, 80]

const testMessageCardArray: MessageCardProps[] = [
  {name: "chicken", message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis laudantium reprehenderit quia sed hic, architecto asperiores cum deleniti nihil voluptates? adipisicing elit. Perspiciatis laudantium reprehenderit quia sed hic, architecto asperiores cum adipisicing elit. Perspiciatis laudantium reprehenderit quia sed hic, architecto asperiores cum ", media:{src:"/hny.webp", alt:''} }, 
  
  {name: "chicken", message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis laudantium reprehenderit quia sed hic, architecto asperiores cum deleniti nihil voluptates?", media:{src:"/cybergift.png", alt:''} }, 

  {name: "chicken", message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis laudantium reprehenderit quia sed hic, architecto asperiores cum deleniti nihil voluptates?", media:{src:"/tiktok-icon.svg", alt:''} },

  {name: "chicken", message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis laudantium reprehenderit quia sed hic, architecto asperiores cum deleniti nihil voluptates? consectetur adipisicing elit. Perspiciatis laudantium reprehenderit quia sed hic, architecto asperiores cum deleniti nihil voluptates? Perspiciatis laudantium reprehenderit q", media:{src:"/cybergift.png", alt:''} },

  {name: "chicken", message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis laudantium reprehenderit quia sed hic, architecto asperiores cum deleniti nihil voluptates? Perspiciatis laudantium reprehenderit quia sed hic, architecto asperiores cum deleniti nihil voluptates? Perspiciatis laudantium reprehenderit quia sed hic, architecto asperiores cum deleniti nihil voluptates?", media:{src:"/cybergift.png", alt:''} },

  {name: "chicken", message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis laudantium reprehenderit quia sed hic, architecto asperiores cum deleniti nihil voluptates?", media:{src:"/maradona.gif", alt:''} },

  {name: "chicken", message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis laudantium reprehenderit quia sed hic, architecto asperiores cum deleniti nihil voluptates?"}
]
export default(props: Props) => {
  return (
    <div className='space-y-8 bg-white px-4 relative '>
      <h1 className='t-balance'>Example page</h1>
      <div className='w-full rounded-md shadow-sm bg-primary-light flex justify-center'>
        <div className='px-4 flex justify-center bg-white space-x-2'>
          <Button className='space-x-2'><AddIcon /> <span>Create a message</span></Button>
          <Button variant='outlined'>Create a message</Button>
        </div>
      </div>
      <CreateMessage />
      <div className='flex w-full justify-center p-4' style={{backgroundImage: 'url(/bg-1.jpg)'}}>
        <Masonry columns={{xs:1, md:3, lg:4}} spacing={6}>
          {testMessageCardArray.map((t, index) => (
            <MessageCard  key={index} {...t} />
          ))}
        </Masonry>
      </div>
    </div>
  )
}