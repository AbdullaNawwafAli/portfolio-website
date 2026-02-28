"use client"
import { CldImage } from "next-cloudinary"

export interface CloudinaryImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  version?: number
}

const CloudinaryImage = ({
  src,
  alt,
  width,
  height,
  className,
  version,
}: CloudinaryImageProps) => {
  return (
    <CldImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      version={version}
    />
  )
}

export default CloudinaryImage
