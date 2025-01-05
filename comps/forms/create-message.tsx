'use client'
import ExpandMore from '@mui/icons-material/ExpandMore'
import { Menu, MenuItem, TextField } from '@mui/material'
import Button from 'comps/button'
import { FileInput } from 'comps/file-input'
import React, { useEffect, useState } from 'react'
import { GiphyFetch } from '@giphy/js-fetch-api'
import Img, { MediaImgProps } from 'comps/media-img'
import  Gif  from '@mui/icons-material/GifBoxOutlined'
import { fonts, FontType } from 'utils/fonts'

type Stepper = 'message' | 'gif'

type Props = {}
type MessagePostProps = {
  name: string
  message: string
  media?: MediaImgProps
  font: FontType
}

export const CreateMessageForm = (props: Props) => {  
  const [messagePost, setMessagePost] = useState<MessagePostProps>({name: '', message: "", media: undefined, font: fonts[0]})
  const [step, setStep] = useState<Stepper>('message')
  const [media, setMedia] = useState(null)
  const [font, setFont] = useState("default")
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSelect = (font: FontType) => {
    setMessagePost((prev) => ({...prev, font: {name:font.name, className:font.className}}))
    handleClose()
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!messagePost?.message.trim()) {
      alert("Message cannot be empty!")
      return
    }
    console.log("Message submitted:", { message: messagePost, media, font })
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name
    const value = e.target.value

    setMessagePost((prev) => ({...prev, [name]: value}))

  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 mx-auto border-solid rounded-md border">
      {(() => {
        switch (step) {
          case 'message':
            return (
              <div className="space-y-4">
                <div className="space-y-2 group">
                  <label htmlFor="message" className="block font-semibold mb-2 ">Choose a font</label>
                  <div className="space-y-4">
                    <Button
                      style={{ fontFamily: messagePost.font.name }}
                      endIcon={<ExpandMore />}
                      variant="outlined"
                      onClick={handleClick}
                      className="w-full text-left"
                    >
                      <div className="w-full justify-between">
                        <span>{messagePost.font.name}</span>
                      </div>
                    </Button>
                    <Menu
                      slotProps={{
                        paper: {
                          style: { width: "90%", maxWidth: "100%", maxHeight: 370 },
                        },
                      }}
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      {fonts.map((font) => (
                        <MenuItem
                          key={font.name}
                          onClick={() => handleSelect(font)}
                          className={`${font.className}`}
                          style={{
                            fontFamily: font.name,
                            padding: "10px 20px",
                          }}
                        >
                          <div className="w-full">{font.name}</div>
                        </MenuItem>
                      ))}
                    </Menu>
                  </div>
                </div>
                <div className='group space-y-2'>
                  <label className='font-semibold group-focus-within:text-primary-dark'>Your message and name</label>
                  <div className="rounded-md border-primary border p-2">
                    <TextField
                      variant="standard"
                      multiline
                      name="message"
                      value={messagePost.message}
                      onChange={handleTextChange}
                      className="w-full p-2"
                      rows={8}
                      slotProps={{
                        input: { style: { fontFamily: messagePost.font.name } },
                      }}
                      placeholder="Write your message here..."
                    />
                    <div className="w-[95%] border-t-[0.5px] border border-primary mx-auto" />
                    <div className="flex w-full">
                      <TextField
                        name="name"
                        placeholder="Name"
                        variant="standard"
                        className="p-4 ml-auto"
                        onChange={handleTextChange}
                        value={messagePost.name}
                        slotProps={{
                          input: { style: { fontFamily: messagePost.font.name } },
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )
          case 'gif':
            return <div></div>
          default:
            return null
        }
      })()}
      <div className="space-y-2">
        <FileInput className="w-full" />
        <Button onClick={()=> setStep('gif')}
          color="inherit"
          fullWidth
          className="bg-purple-500 text-white space-x-2"
        >
          <Gif />
          <span>Add a gif</span>
        </Button>
      </div>
  
      <div className="flex justify-between">
        <Button
          type="button"
          onClick={() => setStep('message')}
          disabled={step === 'message'}
        >
          Back
        </Button>
        <Button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Submit
        </Button>
      </div>
    </form>
  )
}