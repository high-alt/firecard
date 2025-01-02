"use client"
import React, { useRef, useState } from "react"
import "filepond/dist/filepond.min.css"
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css"
import { FancyIcon } from "./icons"
import Button from "comps/button"
import UploadIcon from "@mui/icons-material/Upload"
import GraphicEqIcon from "@mui/icons-material/GraphicEq"
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo"
import { FileInput } from "./file-input"

const Uploader = () => {
  const [path, setPath] = useState<string>("user-id")
  const [url, setUrl] = useState<string>()
  const [file, setFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleUpload = async () => {
    // const mutation = useM(uploadToS3)
    // const upload = async () => {
    //   const presignedUrl = await presign()
    //   if (!file || !presignedUrl) return
    //   mutation.mutate(
    //     { file, presignedUrl },
    //     {
    //       onSuccess: (data) => {
    //         console.log(data)
    //       },
    //       onError: (error: any) => {
    //         console.error('Error uploading file:', error)
    //       },
    //     }
    //   )
    // }
    // return upload
  }

  const handleInputClick = () => {
    if (fileInputRef.current) fileInputRef.current.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
    }
  }

  return (
    <form className="w-[540px] shadow-lg border-2 text-center border-charcoal/20 rounded-3xl relative bg-white space-y-4 p-8">
      <h2 className="t-h2">Upload your audio or video files here</h2>
      <FancyIcon Icon1={OndemandVideoIcon} Icon2={GraphicEqIcon} />
      <h4 className="t-h4 ">Upload your audio or video files here</h4>
      <div className="w-full space-x-2">
        <FileInput
          ref={fileInputRef}
          variant="contained"
          onFileChange={handleFileChange}
          onClick={() => handleInputClick()}
        >
          <UploadIcon />
          <span className="">Choose an Audio or video file</span>
        </FileInput>
        {file && (
          <Button
            onClick={() => {
              handleUpload()
            }}
          >
            Upload
          </Button>
        )}
      </div>
      <Button
        onClick={() => {
          handleUpload()
        }}
      >
        Upload
      </Button>
    </form>
  )
}

export default Uploader
