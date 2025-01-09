import React, {forwardRef} from "react"
import Button, { ButtonProps } from "@mui/material/Button"
import Link from "next/link"

type Props = ButtonProps & { href?: string }

export default forwardRef<HTMLButtonElement, Props>((props, ref) => {
  const btn = (
    <Button
      ref={ref}
      variant={
        !!props.href && !props.variant
          ? "contained"
          : !props.variant
          ? "text"
          : props.variant
      }
      component={!!props.href ? "div" : "button"}
      {...props}
    >
      {props.children}
    </Button>
  )
  return !props.href ? btn : <Link href={props.href}>{btn}</Link>
})
