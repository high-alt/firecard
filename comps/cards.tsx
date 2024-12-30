"use client"

import React from "react"
import Button from "./button"
import {
  ChevronRight,
  ShoppingBagOutlined,
  Whatshot,
} from "@mui/icons-material"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { testLinks } from "utils/routes"
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline"
import { LinkType, MediaType } from "utils/types"
import Img, { MediaImgProps } from "./media-img"

export type CardProps = {
  layout?: "basic" | "price"
  onClick?: () => void
  img: MediaImgProps
  header: string | React.ReactElement
  subheader: string | React.ReactElement
  className?: string
  btn?: { label: string; href?: string }
  children?: React.ReactNode | React.ReactNode[]
}

export const Card = (props: CardProps) => {
  const { layout = "basic" } = props
  const router = useRouter()
  return (
    <div
      onClick={props.onClick}
      className={
        layout === "basic"
          ? "pb-4 space-y-2 flex flex-col items-center h-full w-full overflow-hidden rounded-[16px] "
          : "cursor-pointer pb-4 space-y-2 flex flex-col items-center h-full w-full overflow-hidden rounded-[16px] " +
            props.className
      }
    >
      <Img
        secondaryProps={{
          className:
            layout === "basic" || layout === "price"
              ? "hover:border-solid rounded-[16px]"
              : undefined,
        }}
        {...props.img}
      />
      <div className="flex flex-col w-full h-full p-4 my-auto  mb-2 rounded-[16px] space-y-4">
        <div className="flex flex-col text-gray-700 cursor-pointer grow">
          <h2 className={"cursor-pointer t-h5 hover:text-black-light"}>
            {props.header}
          </h2>
          <p className="line-clamp-2">{props.subheader}</p>
        </div>
      </div>
      {props.btn && (
        <div className="flex w-full px-4 py-2 space-x-2">
          <Button className="w-full space-x-2" variant="outlined">
            <ShoppingBagOutlined /> <p>Add to cart</p>
          </Button>
        </div>
      )}
    </div>
  )
}

export const PricingCard = (props: CardProps & { price: number }) => {
  const router = useRouter()
  return (
    <div
      onClick={props.onClick}
      className={
        "cursor-pointer pb-4 space-y-2 flex flex-col items-center h-full w-full overflow-hidden rounded-[16px] " +
        props.className
      }
    >
      <Img
        secondaryProps={{ className: "hover:border-solid rounded-[16px]" }}
        {...props.img}
      />
      <div className="flex flex-col w-full h-full p-4 my-auto  mb-2 rounded-[16px] space-y-4">
        <div className="flex flex-col text-gray-700 cursor-pointer grow">
          <h2 className={"cursor-pointer t-h5 hover:text-black-light"}>
            {props.header}
          </h2>
          <p className="line-clamp-2">{props.subheader}</p>
        </div>
        <p className="text-[1.25rem] font-[600]">
          <span className="text-[0.75rem]">$</span>
          {props.price.toFixed(2)}
        </p>
      </div>
      <div className="flex w-full px-4 py-2 space-x-2">
        <Button className="w-full space-x-2" variant="outlined">
          <ShoppingBagOutlined /> <p>Add to cart</p>
        </Button>
      </div>
    </div>
  )
}

export const FeatureCard = (props: CardProps & { price: number }) => {
  const router = useRouter()
  return (
    <div
      onClick={props.onClick}
      className="cursor-pointer bg-white pb-2 flex flex-col items-center h-full w-full overflow-hidden rounded-[16px] "
    >
      <Img
        secondaryProps={{ className: "hover:border-solid rounded-[16px]" }}
        {...props.img}
      />
      <div className="flex flex-col w-full h-full px-2 my-auto  space-y-[0.5rem]">
        <p className="text-[1.25rem] font-[600]">
          <span className="text-[0.75rem]">$</span>
          {props.price.toFixed(2)}
        </p>
        <h2 className={"cursor-pointer t-h5 hover:text-black-light"}>
          {props.header}
        </h2>
      </div>
    </div>
  )
}

type PromoCardType = CardProps & { reverse?: boolean }

export const PromoCard = (props: PromoCardType) => {
  return (
    <div className="relative w-full h-auto p-8 lg:p-0 lg:flex lg:justify-between rounded-[32px] overflow-hidden bg-secondary/10">
      <div
        className={`w-full flex flex-col my-auto items-center lg:w-[50%]   lg:p-0 h-full ${
          props.reverse ? "order-2" : "order-1"
        }`}
      >
        <section className="space-y-8 lg:mx-[64px] max-w-[340px] rounded-lg">
          <h2 className={"t-h3 "}>{props.header}</h2>
          {props.subheader}
          <Button
            href="/login"
            className="hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            Learn More
          </Button>
        </section>
      </div>
      <div
        className={`hidden lg:block w-full lg:w-[50%] relative ${
          props.reverse ? "order-1" : "order-2"
        }`}
      >
        <div
          className={`absolute inset-0 bg-[url('/gift-basket.png')] bg-cover opacity-5`}
        ></div>
        <div className={`absolute inset-0 bg-primary opacity-5`}></div>
        <div className="lg:m-[64px] ">
          <Img {...props.img} />
        </div>
      </div>
    </div>
  )
}

type ListCardProps = CardProps & { links?: LinkType[] }

export const ListCard = (props: ListCardProps) => {
  const { links } = props
  const ls = !!props.links ? props.links : testLinks
  return (
    <div className="group w-full rounded-[16px] py-4  h-full ">
      <h2 className="mx-4 t-h3">How it works</h2>
      <div className="flex flex-col p-4 space-y-[24px]">
        <ul className="space-y-8">
          {ls.map((l, i) => (
            <li key={i} className="flex space-x-2">
              <CheckCircleOutlineIcon className="text-green-500" />
              <h2 className={"t-h5 "}>{l.label}</h2>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export type PriceCardProps = {
  price: string
  priceInfo?: string
  btnProps?: {
    href: string
    label: string
    onClick?: () => void
  }
  subheader?: string
  offers: string[]
}

export const PriceCard = (props: PriceCardProps) => {
  return (
    <div className="rounded-[16px] bg-white  p-4  space-y-5 shadow-md w-[280px] h-full">
      <p className="underline t-h4 decoration-primary underline-offset-8">
        Pro
      </p>
      <div>
        <p className="t-h3 ">${props.price}/m</p>
        <p className="t-sm ">{props.subheader}</p>
      </div>
      <div className="space-y-2">
        <p className="t-h4"> {props.subheader}</p>
        <ul className="ml-2 space-y-1 text-black t-sm">
          {props.offers.map((o, i) => (
            <li key={i}>
              <p>{o}</p>
            </li>
          ))}
        </ul>
      </div>
      {(props.btnProps?.href || props.btnProps?.onClick) && (
        <Button variant="outlined" onClick={props.btnProps.onClick}>
          {props.btnProps?.label}
        </Button>
      )}
    </div>
  )
}

export const FlexCard = (props: CardProps) => {
  return (
    <Link href={props.btn?.href ?? ""} passHref onClick={props.onClick}>
      <div
        className={
          "flex justify-between p-4 items-center hover:opacity-80" +
          " " +
          props.className
        }
      >
        <div className="mr-2 overflow-hidden rounded-full h-[64px] w-[64px]">
          <Img {...props.img} />
        </div>
        <div className="w-full h-full p-4 mb-2 space-y-4">
          <div className="flex flex-col text-gray-700 cursor-pointer grow">
            <h2 className={"cursor-pointer t-h5 group-hover:text-black-light"}>
              {props.header}
            </h2>
            <p className="md:line-clamp-4 line-clamp-2">{props.subheader}</p>
          </div>
        </div>
        {props.children}
      </div>
    </Link>
  )
}

export const MessageCard = (props: CardProps) => {
  return(<div
    onClick={props.onClick}
    className={"cursor-pointer bg-white pb-4 space-y-2 flex flex-col items-center h-full w-full overflow-hidden rounded-[16px] "  + props.className}
  >
    <Img
      secondaryProps={{className:"hover:border-solid rounded-[16px]"}}
      {...props.img}
    />
    <div className="flex flex-col w-full h-full p-4 my-auto  mb-2 rounded-[16px] space-y-4">
      <div className="flex flex-col text-gray-700 cursor-pointer">
        <h2 className={"cursor-pointer t-h5 hover:text-black-light"}>
          {props.header}
        </h2>
        <p>{props.subheader}</p>
      </div>
    </div>
  </div>)
}
