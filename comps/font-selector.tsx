'use client'
import { ChangeEvent, useState } from "react"
import { Roboto, Open_Sans, Lora, Montserrat, Poppins, Playfair_Display, Oswald, Merriweather, Raleway, Nunito, Happy_Monkey } from 'next/font/google'
import { Button, Menu, MenuItem } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

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

export default function FontSelector() {
  const [selectedFont, setSelectedFont] = useState(fonts[0]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (font: typeof fonts[0]) => {
    setSelectedFont(font);
    handleClose();
  };
  return (
    <div className="space-y-4">
      <Button
        variant="outlined"
        onClick={handleClick} className="w-full">
        <div className="w-full justify-between"> <span>{selectedFont.name}</span> <ExpandMore /> </div>
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{ style: { maxHeight: 300, width: "250px" } }}
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
            {font.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}
