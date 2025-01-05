"use client"
import { AccountCircle, LogoutOutlined } from "@mui/icons-material"
import { IconButton, Menu } from "@mui/material"
import React, { useState } from "react"
import { authLinks } from "utils/routes"
import { LinkType } from "utils/types"
import Button from "./button"
import { useRouter } from "next/router"

type Props = {
  links: LinkType[]
  children?: React.ReactNode[] | React.ReactNode
}

export const PopupMenu = (props: Props) => {
  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const menuOpen = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(null)
  }
  return (
    <div>
      {" "}
      <IconButton
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        id="menu-button"
        aria-controls={open ? "basic-menu" : undefined}
        onClick={handleClick}
      >
        <AccountCircle color="primary" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleClose}
        MenuListProps={{ "aria-labelledby": "menu-button" }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <ul className="p-4 space-y-2">
          {props.links.map((l, i) => (
            <li className="w-full" key={l.path}>
              <Button className="w-full group" href={l.path}>
                <span className="t-button">{l.label}</span>
              </Button>
            </li>
          ))}
          {props.children && props.children}
        </ul>
      </Menu>
    </div>
  )
}

export default PopupMenu
