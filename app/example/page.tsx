import Button from 'comps/button'
import React from 'react'
import AddIcon from '@mui/icons-material/AddCircleOutlined'
import { CreateMessageForm } from 'comps/forms/create-message'
import MasonryGrid from 'comps/masonry-grid'

type Props = {}

export default(props: Props) => {
  
  return (
    <div className='space-y-8 bg-white relative '>
      <div className='p-4 space-y-4'>
        <h1 className='t-balance'>Example page</h1>
        <div className='w-full rounded-md border p-2 md:flex md:justify-center'>
          <Button fullWidth className='space-x-2'><AddIcon /> <span>Create a message</span></Button>
        </div>
      </div>
      <CreateMessageForm />
      <MasonryGrid />
    </div>
  )
}