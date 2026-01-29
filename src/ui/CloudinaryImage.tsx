"use client";
import { CldImage } from "next-cloudinary";

export interface CloudinaryImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const CloudinaryImage = ({ src, alt, width, height }: CloudinaryImageProps) => {
  return <CldImage src={src} alt={alt} width={width} height={height} />;
};

export default CloudinaryImage;
