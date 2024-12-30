"use client"
import { ListItem, useMediaQuery } from "@mui/material"
import { usePathname } from "next/navigation"
import React from "react"
import { LinkType } from "utils/types"
import Icon from "@mui/material/Icon"
import Button from "./button"
type Props = LinkType & { className?: string }

export const LinkItem = (props: Props) => {
  const isMobile = useMediaQuery("(max-width:420px)")
  const path = usePathname()
  return (
    <Button
      href={props.path}
      variant="text"
      className={props.className ? props.className : " " + " space-x-1 "}
    >
      <Icon>{props.icon}</Icon>
      <span>{props.label}</span>
    </Button>
  )
}
