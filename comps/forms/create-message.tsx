'use client'
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Menu, MenuItem, TextField } from '@mui/material';
import Button from 'comps/button';
import { FileInput } from 'comps/file-input';
import FontSelector from 'comps/font-selector';
import React, { useState } from 'react'
import { Roboto, Open_Sans, Lora, Montserrat, Poppins, Playfair_Display, Oswald, Merriweather, Raleway, Nunito, Happy_Monkey } from 'next/font/google'

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
];

type Props = {}

export const CreateMessage = (props: Props) => {  const [message, setMessage] = useState("");
  const [media, setMedia] = useState(null); // For uploaded files
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
    event.preventDefault();
    if (!message.trim()) {
      alert("Message cannot be empty!");
      return;
    }
    console.log("Message submitted:", { message, media, font });
  }

  const handleReset = () => {
    setMessage("")
    setMedia(null)
    setFont("default")
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 mx-auto border-solid rounded-md border">
      <div className='space-y-2'>
        <label htmlFor="message" className="block font-semibold mb-2">
        Your Message and font
        </label>
        <div className="space-y-4">
          <Button
            endIcon={<ExpandMore />}
            variant="outlined"
            onClick={handleClick} className="w-full text-left">
            <div className="w-full justify-between"> <span>{selectedFont.name}</span> </div>
          </Button>
          <Menu
            slotProps={{paper:{ style: {
              width: "90%",
              maxWidth: "100%",
              maxHeight:370
            }}
            }}
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
        <TextField
          multiline
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-2 border rounded-lg"
          rows={8}
          slotProps={{input: { style: {fontFamily: selectedFont.name,}}, inputLabel:{style: {fontFamily: selectedFont.name}}}}
          placeholder="Write your message here..."
        ></TextField>
      </div>
      <FileInput className='w-full'/>
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