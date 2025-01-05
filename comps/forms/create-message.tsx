'use client'
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Menu, MenuItem, TextField } from '@mui/material';
import Button from 'comps/button';
import { FileInput } from 'comps/file-input';
import FontSelector from 'comps/font-selector';
import React, { useEffect, useState } from 'react'
import { Roboto, Open_Sans, Lora, Montserrat, Poppins, Playfair_Display, Oswald, Merriweather, Raleway, Nunito, Happy_Monkey, Rubik_Bubbles } from 'next/font/google'
import { GiphyFetch } from '@giphy/js-fetch-api';
import Img, { MediaImgProps } from 'comps/media-img'
import GiphyLogo from '../../assets/Giphy-logo.svg'
import  Gif  from '@mui/icons-material/GifBoxOutlined';

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'] });
const openSans = Open_Sans({ subsets: ['latin'], weight: ['400', '700'] });
const lora = Lora({ subsets: ['latin'], weight: ['400', '700'] });
const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '700'] });
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] });
const playfairDisplay = Playfair_Display({ subsets: ['latin'], weight: ['400', '700'] });
const oswald = Oswald({ subsets: ['latin'], weight: ['400', '700'] });
const merriweather = Merriweather({ subsets: ['latin'], weight: ['400', '700'] });
const raleway = Raleway({ subsets: ['latin'], weight: ['400', '700'] });
const nunito = Nunito({ subsets: ['latin'], weight: ['400', '700'] });
const happyMonkey = Happy_Monkey({ subsets: ['latin'], weight: ['400'] });
const rubikBubble = Rubik_Bubbles({ subsets: ['latin'], weight: ['400'] });


const fonts = [
  { name: "Nunito", className: nunito.className },
  { name: "Roboto", className: roboto.className },
  { name: "Open Sans", className: openSans.className },
  { name: "Lora", className: lora.className },
  { name: "Montserrat", className: montserrat.className },
  { name: "Poppins", className: poppins.className },
  { name: "Playfair Display", className: playfairDisplay.className },
  { name: "Oswald", className: oswald.className },
  { name: "Merriweather", className: merriweather.className },
  { name: "Raleway", className: raleway.className },
  { name: "Happy Monkey", className: happyMonkey.className },
  { name: "Rubik Bubble", className: rubikBubble.className },
];

type Stepper = 'message' | 'gif'

type Props = {}
type MessagePostProps = {
  name: string
  message: string
  media?: MediaImgProps
}

export const CreateMessage = (props: Props) => {  
  const [messagePost, setMessagePost] = useState<MessagePostProps>({name: '', message: "", media: undefined})
  const [step, setStep] = useState<Stepper>('message')
  const [media, setMedia] = useState(null)
  const [font, setFont] = useState("default")
  const [selectedFont, setSelectedFont] = useState(fonts[0]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSelect = (font: typeof fonts[0]) => {
    setSelectedFont(font)
    handleClose()
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!messagePost?.message.trim()) {
      alert("Message cannot be empty!");
      return
    }
    console.log("Message submitted:", { message: messagePost, media, font });
  }

  const handleReset = () => {
    setMessagePost({name: '', message: ''})
    setMedia(null)
    setFont("default")
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name
    const value = e.target.value

    setMessagePost((prev) => ({...prev, [name]: value}))

  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 mx-auto border-solid rounded-md border">
      <div>
        <div className='space-y-2'>
          <label htmlFor="message" className="block font-semibold mb-2">Your Message and font</label>
          <div className="space-y-4">
            <Button
              style={{fontFamily: selectedFont.name}}
              endIcon={<ExpandMore />}
              variant="outlined"
              onClick={handleClick} className="w-full text-left">
              <div className="w-full justify-between"> <span>{selectedFont.name}</span> </div>
            </Button>
            <Menu
              slotProps={{paper:{ style: { width: "90%", maxWidth: "100%", maxHeight:370}}}}
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}>
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
                  <div className='w-full'>{font.name}</div>
                </MenuItem>
              ))}
            </Menu>
          </div>
          <div className='rounded-md border-primary border p-2'>
            <TextField
              variant='standard'
              multiline
              name="message"
              value={messagePost.message}
              onChange={handleTextChange}
              className="w-full p-2"
              rows={8}
              slotProps={{input: { style: {fontFamily: selectedFont.name}}}}
              placeholder="Write your message here..."/>
            <div className='w-[95%] border-t-[0.5px] border border-primary mx-auto' />
            <div className='flex w-full'> <TextField name="name" placeholder="Name" variant='standard' className='p-4 ml-auto' onChange={handleTextChange} value={messagePost.name} slotProps={{input: { style: {fontFamily: selectedFont.name}}}}/></div>
          </div>
        </div>
      </div>
      <div className='space-y-2'>
        <FileInput className='w-full'/>
        <Button color='inherit' fullWidth className='bg-purple-500 text-white space-x-2'><Gif /><span>Add a gif</span></Button>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={handleReset}
          className="px-4 py-2 bg-gray-200 rounded-lg"
        >
        Reset
        </button>
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