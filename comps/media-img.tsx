import React, { ReactNode } from "react"

export interface MediaImgProps {
  src: string
  alt: string
  caption?: string
  sources?: { srcSet: string; media?: string }[]
  className?: string
  children?: ReactNode
  secondaryProps?: {
    className?: string
  }
}

const Img: React.FC<MediaImgProps> = ({
  src,
  alt,
  caption,
  sources,
  className,
  children,
  secondaryProps,
}: MediaImgProps) => {
  return (
    <figure className={'w-full' + ' ' + className}>
      <picture>
        {sources &&
          sources.map((source, index) => (
            <source key={index} srcSet={source.srcSet} media={source.media} />
          ))}
        <img
          src={src}
          alt={alt}
          className={"w-full h-full " + secondaryProps?.className}
        />
      </picture>
      {caption && (
        <figcaption className="mt-2 text-center text-gray-600">
          {caption}
        </figcaption>
      )}
      {children}
    </figure>
  )
}

export default Img
