
import {  Barrio, Pacifico, Orbitron, Lora, Poppins, Playfair_Display, Oswald, Merriweather, Raleway, Nunito, Happy_Monkey, Rubik_Bubbles } from 'next/font/google'

const barrio = Barrio({ subsets: ['latin'], weight: ['400'] })
const lora = Lora({ subsets: ['latin'], weight: ['400', '700'] })
const pacifico = Pacifico({ subsets: ['latin'], weight: ['400'] })
const orbitron = Orbitron({ subsets: ['latin'], weight: ['400'] })
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] })
const playfairDisplay = Playfair_Display({ subsets: ['latin'], weight: ['400', '700'] })
const oswald = Oswald({ subsets: ['latin'], weight: ['400', '700'] })
const merriweather = Merriweather({ subsets: ['latin'], weight: ['400', '700'] })
const raleway = Raleway({ subsets: ['latin'], weight: ['400', '700'] })
const nunito = Nunito({ subsets: ['latin'], weight: ['400', '700'] })
const happyMonkey = Happy_Monkey({ subsets: ['latin'], weight: ['400'] })
const rubikBubble = Rubik_Bubbles({ subsets: ['latin'], weight: ['400'] })

export type FontType = {name: string, className: string}

export const fonts: FontType[] = [
  { name: "Nunito", className: nunito.className },
  { name: "Barrio", className: barrio.className },
  { name: "Orbitron", className: orbitron.className },
  { name: "Lora", className: lora.className },
  { name: "Pacifico", className: pacifico.className },
  { name: "Poppins", className: poppins.className },
  { name: "Playfair Display", className: playfairDisplay.className },
  { name: "Oswald", className: oswald.className },
  { name: "Merriweather", className: merriweather.className },
  { name: "Raleway", className: raleway.className },
  { name: "Happy Monkey", className: happyMonkey.className },
  { name: "Rubik Bubble", className: rubikBubble.className },
]