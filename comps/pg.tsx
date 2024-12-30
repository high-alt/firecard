'use client'
import React from 'react'
import { Footer } from './footer'
import { LinkType } from 'utils/types'
import Nav, { BottomNav } from './nav'
import { links } from 'utils/routes'
import Cookies from 'js-cookie'

type Props = {
	children: React.ReactNode | React.ReactNode[]
	sidebarLinks?: LinkType[]
	className?: string
}

export const Pg = (props: Props) => {
  const [value, setValue] = React.useState(0)
  const [auth, setAuth] = React.useState(true)
  const token = Cookies.get('token')
  return (
    <>
      <div className={'cont ' + props.className ?? ''}>
        {props.children}
        {!!token && <BottomNav links={links} />}
      </div>
    </>
  )
}
