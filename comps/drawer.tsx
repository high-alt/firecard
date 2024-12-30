"use client"
import * as React from "react"
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles"
import MuiDrawer from "@mui/material/Drawer"
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import tw, { colours } from "../tailwind.config"
import { usePathname } from "next/navigation"
import { Icon, useMediaQuery } from "@mui/material"
import { links } from "utils/routes"
import { LinkItem } from "./link-item"
import { ArrowCircleLeftOutlined, Menu } from "@mui/icons-material"
import Nav from "./nav"
import Button from "./button"

const drawerWidth = 240

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  backgroundColor: colours.white.DEFAULT,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
})

const closedMixin = (theme: Theme): CSSObject => ({
  backgroundColor: colours.white.DEFAULT,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(8)} + 1px)`,
  [theme.breakpoints.down("sm")]: {
    display: "hidden",
    // width: `calc(${theme.spacing(12)} + 1px)`,
  },
})

export const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}))

export default function DrawerNav() {
  const isMobile = useMediaQuery("(max-width:420px)")

  const [open, setOpen] = React.useState(true)

  const handleDrawerOpen = () => {
    setOpen(!open)
  }

  return (
    <>
      <Nav links={links} />
      {!isMobile && (
        <div className="hidden md:block">
          <Drawer variant="permanent" open={open}>
            <div className="flex justify-center w-full py-2 border-b border-b-black/12">
              <IconButton onClick={handleDrawerOpen}>
                {open ? <ArrowCircleLeftOutlined /> : <Menu />}
              </IconButton>
            </div>
            <ul className="h-full py-2 space-x-2 lg:min-h-[580px]">
              {links.map((l) => (
                <Button key={l.path} className="gap-x-2" href={l.path}>
                  {l.label} <Icon>{l.icon}</Icon>
                </Button>
              ))}
            </ul>
          </Drawer>
        </div>
      )}
    </>
  )
}
