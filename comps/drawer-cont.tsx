"use client"
import React, { useState } from "react"
import { links } from "utils/routes"
import {
  Icon,
  IconButton,
  SwipeableDrawer,
  Toolbar,
  styled,
  useMediaQuery,
} from "@mui/material"
import { ArrowCircleLeftOutlined, Menu } from "@mui/icons-material"
import { Drawer } from "./drawer"
import { LinkItem } from "./link-item"
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar"
import { LinkType } from "utils/types"
import Link from "next/link"
import Button from "./button"

const drawerWidth = 240

type Props = {
  children: React.ReactNode | React.ReactNode[]
  sidebarLinks?: LinkType[]
  header?: string
  className?: string
}

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const AppBarMobile = styled(MuiAppBar)<AppBarProps>()

export const DrawerCont = (props: Props) => {
  const [value, setValue] = React.useState(0)
  const [auth, setAuth] = React.useState(true)
  const [open, setOpen] = React.useState(true)
  const isMobile = useMediaQuery("(max-width:420px)")

  const handleDrawerOpen = () => {
    setOpen(!open)
  }
  const navRoutes = (
    <ul className="h-full space-x-2">
      {links.map((l) => (
        <Button key={l.path} className="gap-x-2" href={l.path}>
          {l.label} <Icon>{l.icon}</Icon>
        </Button>
      ))}
    </ul>
  )
  return (
    <div className="flex px-4 pt-[6rem]">
      {!isMobile && (
        <>
          <AppBar position="fixed" open={open}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: 5,
                  ...(open && { display: "none" }),
                }}
              >
                <Menu />
              </IconButton>
              <Link href={"/"}>
                <img src="/logo.png" alt="" className="h-[38px]" />
              </Link>
              {props.header && <p>{props.header}</p>}
            </Toolbar>
          </AppBar>
          <Drawer variant={"permanent"} open={open}>
            <div className="flex justify-end px-2 w-full py-2 border-b border-b-black/12 min-h-[64px]">
              <IconButton onClick={handleDrawerOpen}>
                {open && <ArrowCircleLeftOutlined />}
              </IconButton>
            </div>
            <div className="flex items-center py-4 mx-auto space-x-2 text-center">
              <picture>
                <img
                  alt=""
                  src="/gift-basket.png"
                  className="w-[48px] rounded-full"
                />
              </picture>
              <span className="font-[600]">
                <span className="t-h6 font-[500] text-gray-400">@</span>
                mcChicken
              </span>
            </div>
            {navRoutes}
          </Drawer>
        </>
      )}
      {isMobile && (
        <>
          <AppBarMobile position="fixed">
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: 5,
                }}
              >
                <Menu />
              </IconButton>
              {props.header && <p>{props.header}</p>}
            </Toolbar>
          </AppBarMobile>
          <SwipeableDrawer
            onOpen={handleDrawerOpen}
            onClose={handleDrawerOpen}
            open={open}
          >
            {navRoutes}
          </SwipeableDrawer>
        </>
      )}
      {props.children}
    </div>
  )
}
