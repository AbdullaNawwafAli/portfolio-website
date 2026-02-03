"use client";
import { CldImage } from "next-cloudinary";

export interface CloudinaryImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

const CloudinaryImage = ({
  src,
  alt,
  width,
  height,
  className,
}: CloudinaryImageProps) => {
  return (
    <CldImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      sizes="(max-width: 768px) 100vw, 258px"
    />
  );
};

export default CloudinaryImage;
