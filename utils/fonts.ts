
import {  Barrio, Pacifico, Orbitron, Lora, Poppins, Playfair_Display, Oswald, Merriweather, Raleway, Nunito, Happy_Monkey, Rubik_Bubbles, Sour_Gummy, Mystery_Quest, Chewy } from 'next/font/google'

const barrio = Barrio({ subsets: ['latin'], weight: ['400'] })
const lora = Lora({ subsets: ['latin'], weight: ['400', '700'] })
const sourGummy = Sour_Gummy({ subsets: ['latin'], weight: ['400', '700'] })
const pacifico = Pacifico({ subsets: ['latin'], weight: ['400'] })
const orbitron = Orbitron({ subsets: ['latin'], weight: ['400'] })
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] })
const mysteryQuest = Mystery_Quest({ subsets: ['latin'], weight: ['400'] })
const oswald = Oswald({ subsets: ['latin'], weight: ['400', '700'] })
const raleway = Raleway({ subsets: ['latin'], weight: ['400', '700'] })
const nunito = Nunito({ subsets: ['latin'], weight: ['400', '700'] })
const happyMonkey = Happy_Monkey({ subsets: ['latin'], weight: ['400'] })
const rubikBubble = Rubik_Bubbles({ subsets: ['latin'], weight: ['400'] })
const chewy = Chewy({subsets:['latin'], weight:['400']})

export const logoFont =  {name: 'Chewy', className: chewy.className}

export type FontType = {name: string, className: string}

export const fonts: FontType[] = [
  { name: "Mystery Quest", className: mysteryQuest.className },
  { name: "Nunito", className: nunito.className },
  { name: "Barrio", className: barrio.className },
  { name: "Sour Gummy", className: sourGummy.className },
  { name: "Orbitron", className: orbitron.className },
  { name: "Lora", className: lora.className },
  { name: "Pacifico", className: pacifico.className },
  { name: "Poppins", className: poppins.className },
  { name: "Oswald", className: oswald.className },
  { name: "Raleway", className: raleway.className },
  { name: "Happy Monkey", className: happyMonkey.className },
  { name: "Rubik Bubble", className: rubikBubble.className },
]