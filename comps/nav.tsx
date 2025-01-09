"use client"
import React, { useContext, useState } from "react"
import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
  Icon,
  IconButton,
  Menu,
  MenuItem,
  SwipeableDrawer,
  Toolbar,
  useScrollTrigger,
} from "@mui/material"
import { LinkType } from "utils/types"
import Link from "next/link"
import CssBaseline from "@mui/material/CssBaseline"
import { authLinks, legalLinks } from "utils/routes"
import {
  Close,
  Logout,
  LogoutOutlined,
  Menu as MenuIcon,
} from "@mui/icons-material"
import { LinkItem } from "./link-item"
import { usePathname, useRouter } from "next/navigation"
import Button from "./button"
import { Router } from "next/router"
import { UserContext } from "app/app-context"
import PopupMenu from "./popup-menu"
import { logoFont } from "utils/fonts"
import Bee from '../assets/bee.svg'

interface Props {
  links: LinkType[]
}

interface ElevationProps {
  window?: () => Window
  children: React.ReactElement
}

function HideOnScroll(props: ElevationProps) {
  const { children, window } = props

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  })

  return React.cloneElement(children, {
  })
}

const Nav: React.FC<Props> = (props: Props) => {
  const [open, setOpen] = useState(false)
  const user = useContext(UserContext)
  const pathname = usePathname()
  const router = useRouter()

  const links = (className?: string) =>
    props.links.map((l, i) => (
      <li
        key={i}
        className={
          pathname === l.path
            ? "bg-primary/10 rounded-lg "
            : "" + " " + className
        }
      >
        <Button
          className="flex justify-between "
          href={l.path}
          variant="text"
        >
          <span className="mx-4">
            {l.label}
          </span>
        </Button>
      </li>
    ))

  return (
    <>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar component="nav">
          <Toolbar className="justify-between">
            {user?.unique_name ? (
              <>
                <span className="block text-center md:hidden">
                  <p className="break-words t-h4 w-[220px] line-clamp-1 md:w-full">
                    <span className="t-h5 font-[500] text-gray-400">@</span>
                    {user?.unique_name}
                  </p>
                </span>
                <Link className="hidden md:block" href={"/"}>
                  <img src="/logo.png" alt="" className="h-[38px]" />
                </Link>
              </>
            ) : (
              <Link href={"/"}>
                <div className="flex space-x-1">
                  <span style={{fontFamily: logoFont.name}}>bumble</span>
                  <Bee/>
                  <span style={{fontFamily: logoFont.name}}>card</span>
                </div>
              </Link>
            )}
            <div className="hidden md:flex ">
              {links("text-center")}
            </div>
            <div className="flex items-center space-x-2 ">
              <div className="hidden md:block">
                <PopupMenu links={authLinks}>
                  <Button
                    variant="outlined"
                    className="gap-x-2"
                    onClick={() => {
                      router.refresh()
                    }}
                  >
                    <LogoutOutlined />
                    Logout
                  </Button>
                </PopupMenu>
              </div>
            </div>
            <div className="flex items-center space-x-1 md:hidden">
              <IconButton onClick={() => setOpen(true)}>
                <MenuIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <SwipeableDrawer
        anchor="right"
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        open={open}
      >
        <div className="min-w-[320px] space-y-4 px-4 py-4">
          <div className="flex justify-between w-full">
            <Link href={"/"}>
              <img src="/logo.png" alt="" className="h-[38px]" />
            </Link>
            <IconButton onClick={() => setOpen(false)}>
              <Close />
            </IconButton>
          </div>
          <ul className="h-full grow">{links("w-full")}</ul>
          <Button
            variant="outlined"
            onClick={() => user?.logout()}
            className="flex justify-between w-full"
          >
            <Logout />
            <p>Log out</p>
          </Button>
          {legalLinks.map((l, i) => (
            <Button key={l.path} className="gap-x-2" href={l.path}>
              {l.label} <Icon>{l.icon}</Icon>
            </Button>
          ))}
        </div>
      </SwipeableDrawer>
    </>
  )
}

export default Nav

export const Links: LinkType[] = [
  { label: "Me", path: "/Me", icon: "whatshot" },
  { label: "Notifications", path: "/notifications", icon: "dashboard" },
  { label: "Messages", path: "/messages", icon: "add_circle_outlined" },
  { label: "Settings", path: "/settings", icon: "person_outlined" },
]

export const BottomNav: React.FC<Props> = (props: Props) => {
  const [value, setValue] = React.useState("recents")
  const pathname = usePathname()
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }
  return (
    <div className="absolute bottom-0 left-0 w-full shadow-t-md ">
      <BottomNavigation
        className="border-t-[1px] border-gray-200"
        value={value}
        onChange={handleChange}
      >
        {props.links.map((l, i) => (
          <BottomNavigationAction
            key={i}
            icon={
              l.icon && (
                <Link key={i} href={l.path}>
                  <Icon
                    className={
                      l.path === pathname ? "text-primary " : "text-gray-500"
                    }
                  >
                    {l.icon}
                  </Icon>
                </Link>
              )
            }
          />
        ))}
      </BottomNavigation>
    </div>
  )
}
