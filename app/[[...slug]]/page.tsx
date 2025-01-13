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
      <div className="space-y-10 lg-cont h-screen">
        <h2 className="t-h2 text-primary text-center">Cards that connect, no matter the distance.</h2>
        <PromoCard className="bg-secondary"
          reverse
          header={<>this is a header</>}
          subheader={
            <p>
            Lorem ipsum, more dolor sit amet consectetur adipisicing elit.
            Repellat reprehenderit non possimus nam, iste libero maxime a
            asperiores aut nisi? derit non possimus nam, iste libero maxime
            a asper asperiores
            </p>
          }
          img={{
            src: "/gift-basket.png",
            alt: "",
          }}
        />
      </div>
      <div className="space-y-10 h-screen lg-cont ">
        <PromoCard
          header={<>this is a header</>}
          headerProps={{className:'bg-black text-secondary-light'}}
          subheader={
            <p>
            Lorem ipsum, more dolor sit amet consectetur adipisicing elit.
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
      </div>
      {/* <MasonryGrid/> */}
    </div>
  )
}