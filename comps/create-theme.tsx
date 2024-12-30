"use client"
import { useMemo, useRef, useState } from "react"
import Button from "./button"
import { TextInput } from "./text-input"
import { SubmitHandler, useForm } from "react-hook-form"
import { HexColorPicker } from "react-colorful"
import { Card } from "./cards"
import { links, testImgs } from "utils/routes"

type FormValues = {
  name: string
  color: string
}
type CreateThemeType = {
  coverProps: {
    header: { title: string; className: string }

    to?: { title: string; className: string }
    from?: { title: string; className: string }
  }
}
export const CreateTheme = () => {
  const [color, setColor] = useState("#b32aa9")
  const [twColor, settwColor] = useState("bg-[#b32aa9]")
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()

  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data)
  console.log(errors)

  return (
    <div className="grid h-full grid-cols-1 ">
      <div className="px-2 py-4 space-y-2 bg-white rounded-md">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full px-4 pb-4 mx-auto space-y-4 bg-white rounded-md"
        >
          <p className="text-center t-h3">Theme config</p>
          <TextInput
            {...register("name", { required: true, maxLength: 100 })}
            header="Name"
          />
          <HexColorPicker color={color} onChange={setColor} />
          <div>Current color is {color}</div>
          <input
            className="hidden"
            value={color}
            {...register("color", { required: true, maxLength: 100 })}
          />
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  )
}
