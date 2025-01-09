"use client"
import Button from "./button"
import { ChevronRight } from "@mui/icons-material"
import Img, { MediaImgProps } from "./media-img"

type Props = {
  header: string
  eyebrow?: string | null
  subheader?: string | null
  img?: MediaImgProps
}

export default (props: Props) => {
  return (
    <section
      className={
        "lg:flex min-h-auto overflow-hidden h-full max-w-[1800px] mx-auto relative w-full text-0"
      }
    >
      <div className="w-full flex flex-col my-auto items-center lg:w-[50%] h-full p-4">
        <section className="max-w-[500px] space-y-8 ">
          <h2 className={"t-balance text-primary-dark"}>{props.header}</h2>
          <p>{props.subheader}</p>
          <div className="md:space-x-4">
            <Button href="#desc">
              Create a Bumblecard
            </Button>
            <Button variant="outlined" href="#desc">View example</Button>
          </div>
        </section>
      </div>
      <div className={`lg:w-[50%] relative`}>
        <div className={`absolute inset-0 lg:bg-primary/10 `}></div>
        <div className="lg:m-[64px] ">
          {props.img && <Img {...props.img} />}
        </div>
      </div>
    </section>
  )
}
