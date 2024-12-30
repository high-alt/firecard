import {
  HTMLInputTypeAttribute,
  forwardRef,
  useCallback,
  useRef,
  useState,
} from "react"
import Button from "./button"
import { CloseRounded, UploadFile } from "@mui/icons-material"
import Img from "./media-img"
import { IconButton } from "@mui/material"
import { HttpVerb, addMedia } from "app/api"

type Props = JSX.IntrinsicElements["input"] & {}

export const FileInput = (props: Props) => {
  const [file, setFile] = useState<File>()
  const [img, setImg] = useState<string>()

  const ref = useRef<HTMLInputElement>(null)

  const fileChange = () => {
    ref.current?.click()
  }

  const handleChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event?.target?.files?.[0]

      if (!!file) {
        setFile(file)

        const reader = new FileReader()

        reader.onloadend = () => {
          setImg(reader.result as string)
        }

        reader.readAsDataURL(file)
        const res = await addMedia(file, {
          verb: HttpVerb.PUT,
          contentType: file.type,
        })

        return res
      }
    },
    []
  )

  return (
    <div className="relative space-y-4 group">
      {file && img && (
        <>
          <IconButton className="absolute top-8 right-2 ">
            <CloseRounded />
          </IconButton>
          <Img
            className="w-[180px] cursor-pointer"
            secondaryProps={{ className: "rounded-[16px]" }}
            src={img}
            alt={file.name}
            caption={file.name}
          />
        </>
      )}
      <Button startIcon={<UploadFile />} component="label" onClick={fileChange}>
        Upload file
      </Button>
      <input
        {...props}
        ref={ref}
        type="file"
        className="hidden"
        onChange={handleChange}
      />
    </div>
  )
}
