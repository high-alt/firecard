import React from "react"
import { Card } from "./cards"
import Button from "./button"
import { footerLinks, links, pubAppbarLinks } from "utils/routes"

type Props = {}

export const Footer = (props: Props) => {
  return (
    <footer className="h-full py-8 bg-accent/5">
      <div className="grid grid-cols-1 px-8 lg:grid-cols-3 gap-y-16 lg:gap-x-20 lg-cont ">
        <div className="space-y-2">
          <h5 className="t-h5">Social Media</h5>
          {links.map((l, i) => {
            const Icon = l.icon ? l.icon : null
            return (
              <div key={i}>
                <Button variant="text" className="gap-x-2">
                  {" "}
                  {Icon && <Icon />} {l.label}
                </Button>
              </div>
            )
          })}
        </div>
        <div className="space-y-2">
          <h5 className="t-h5">Terms of Service</h5>
          {footerLinks.map((l, i) => {
            const Icon = l.icon ? l.icon : null
            return (
              <div key={i}>
                <Button variant="text" className="text-xs gap-x-2">
                  {" "}
                  {Icon && <Icon />} {l.label}
                </Button>
              </div>
            )
          })}
        </div>
        <div className="space-y-2">
          <h5 className="t-h5">Lorem Ipsum</h5>
          {pubAppbarLinks.map((l, i) => {
            const Icon = l.icon ? l.icon : null
            return (
              <div key={i}>
                <Button variant="text" className="gap-x-2">
                  {" "}
                  {Icon && <Icon />} {l.label}
                </Button>
              </div>
            )
          })}
        </div>
      </div>
    </footer>
  )
}
