import { PriceCard, PromoCard } from "comps/cards"
import Hero from "comps/hero"

export default function Home(){
  return(
    <div className="pb-[64px] space-y-12 bg-slate-50 md:bg-transparent">
      <Hero
        header="🎉 Stylish Greeting Cards, Made Just for You! 🎉"
        subheader={
          "Send custom-designed greeting cards with personalized messages, GIFs, photos, and videos—all in one sleek, digital package."
        }
        img={{ src: "/gift-basket.png", alt: "" }}
      />
      <div className="space-y-10 lg-cont">
        <PromoCard
          reverse
          header={<>this is a header</>}
          subheader={
            <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Repellat reprehenderit non possimus nam, iste libero maxime a
            asperiores aut nisi? derit non possimus nam, iste libero maxime
            a asper asperiores
            </p>
          }
          img={{
            src: "/gift-basket.png",
            alt: "",
            caption: "this si acaption",
          }}
        />
        <div className=" bg-black/5">
          <h1 className="text-center t-h1">Pricing</h1>
          <div className="grid grid-cols-1 px-2 py-4 mx-auto place-items-center">
            <PriceCard
              price="US$6.99"
              priceInfo="pause or cancel anytime"
              btnProps={{
                label: "Get started now",
                href: "/subscription",
              }}
              subheader="Included in standard"
              offers={["One task at a time", "Bug fixes"]}
            />
          </div>
        </div>
      </div>
      {/* <MasonryGrid/> */}
    </div>
  )
}