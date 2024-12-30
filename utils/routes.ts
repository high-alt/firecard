import { CardType, LinkType } from "./types"

export const routes = [
  {
    key: "categories",
    values: [{ key: "birthday card", value: "/categories" }],
  },
]

export const links: LinkType[] = [
  { label: "How it works", path: "/how-it-works", icon: "whatshot_outlined" },
  { label: "Home", path: "/", icon: "add_circle_outlined" },
  {
    label: "Notifications",
    path: "/notifications",
    icon: "add_circle_outlined",
  },
  { label: "Messages", path: "/messages", icon: "add_circle_outlined" },
]

export const authLinks: LinkType[] = [
  { label: "Login", path: "/signin", icon: "info_outlined" },
  { label: "Home", path: "/", icon: "add_circle_outlined" },
  {
    label: "Notifications",
    path: "/notifications",
    icon: "add_circle_outlined",
  },
  { label: "Messages", path: "/messages", icon: "add_circle_outlined" },
]

export const legalLinks: LinkType[] = [
  { label: "Terms of Service", path: "/terms-of-service" },
]

export const appbarLinks: LinkType[] = [
  { label: "Home", path: "/", icon: "HomeIcon" },
  { label: "Create", path: "/create", icon: "DashboardIcon" },
  { label: "Account", path: "/account", icon: "PermIdentity" },
]

export const pubAppbarLinks: LinkType[] = [
  { label: "Home", path: "/", icon: "HomeIcon" },
  { label: "Create", path: "/create", icon: "DashboardIcon" },
  { label: "Account", path: "/account", icon: "PermIdentity" },
]

export const footerLinks: LinkType[] = [
  { label: "Privacy policy", path: "/" },
  { label: "Terms of service", path: "/create" },
]

export const testLinks: LinkType[] = [
  { label: "Receive cash for your gifts", path: "/", icon: "HomeIcon" },
  {
    label: "Enjoy fraud chargeback protection",
    path: "/create",
    icon: "DashboardIcon",
  },
  { label: "Manage your funds your way", path: "/create", icon: "InfoIcon" },
  {
    label: "Preserve two-way anonymity",
    path: "/create",
    icon: "DashboardIcon",
  },
  {
    label: "Express your gratitude with thank you messages",
    path: "/account",
    icon: "PermIdentity",
  },
]

export const testImgs: CardType[] = [
  {
    header: "item 1",
    subheader: "I am a millionaire. I am rich.",
    img: { src: "/gift-basket.png", alt: "" },
  },
  {
    header: "item 1",
    subheader:
      "My income is constantly increasing, and opportunities for wealth are everywhere.",
    img: { src: "/gift-basket.png", alt: "" },
  },
  {
    header: "item 1",
    subheader: "I will release this app.",
    img: { src: "/gift-basket.png", alt: "" },
  },
  {
    header: "item 1",
    subheader: "I am ready for anything",
    img: { src: "/gift-basket.png", alt: "" },
  },
  {
    header: "item 1",
    subheader: "I am a millionaire. I am rich.",
    img: { src: "/gift-basket.png", alt: "" },
  },
]
