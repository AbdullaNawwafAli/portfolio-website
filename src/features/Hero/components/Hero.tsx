"use client"
import {
  ArrowDownToLine,
  ChevronRight,
  Github,
  Instagram,
  Linkedin,
  Mail,
} from "lucide-react"
import CloudinaryImage from "../../../ui/CloudinaryImage"
import { Button } from "../../../ui/shadcn/button"
import { bioData } from "@/types/bioData"
import WorkSheet from "./WorkSheet/WorkSheet"
import EducationSheet from "./EducationSheet/EducationSheet"
import { toast } from "sonner"
import Link from "next/link"

interface HeroProps {
  data: bioData
}

const Hero = ({ data }: HeroProps) => {
  const handleEmailCopyClick = async (email: string) => {
    await navigator.clipboard.writeText(email)
    toast.success("Email copied to clipboard")
  }

  return (
    <div className="hero-container">
      <div className="hero-flex-wrapper">
        <div className="hero-inner">
          {/*Hero Image*/}
          <div className="hero-image-container">
            <CloudinaryImage
              src={data.bio_picture_cloudinary_id}
              alt="Hero Image"
              width={500}
              height={500}
              className="hero-image"
            />
          </div>

          {/*Hero Description*/}
          <div className="hero-description-container">
            <div className="hero-content">
              {/* Name and Social Icons Row */}
              <div className="hero-name-row">
                <div className="hero-name">{data.name}</div>
                <div className="hero-social-row">
                  <div className="hero-name-subtext">{data.name_subtext}</div>

                  {[...Array(3).keys()].map((key) => (
                    <div key={key} className="hero-spacer" />
                  ))}

                  <div className="hero-social-button">
                    <Button
                      variant={"ghost"}
                      onClick={() => handleEmailCopyClick(data.email)}
                    >
                      <Mail />
                    </Button>
                  </div>
                  <div className="hero-social-button">
                    <Button asChild variant={"ghost"}>
                      <Link href={data.github_url} target="_blank">
                        <Github />
                      </Link>
                    </Button>
                  </div>
                  <div className="hero-social-button">
                    <Button asChild variant={"ghost"}>
                      <Link href={data.linked_in_url} target="_blank">
                        <Linkedin />
                      </Link>
                    </Button>
                  </div>
                  <div className="hero-social-button">
                    <Button asChild variant={"ghost"}>
                      <Link href={data.instagram_url} target="_blank">
                        <Instagram />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="hero-body-container">
                <div className="hero-description-text">
                  {data.hero_description}
                </div>

                {/* Bottom Buttons Row */}
                <div className="hero-bottom-row">
                  <div className="hero-nav-button">
                    <WorkSheet />
                  </div>
                  <div className="hero-nav-button">
                    <Button variant={"ghost"}>
                      Skills <ChevronRight />
                    </Button>
                  </div>
                  <div className="hero-nav-button">
                    <EducationSheet />
                  </div>
                  <div className="hero-nav-button">
                    <Button variant={"ghost"}>
                      Resume <ArrowDownToLine />
                    </Button>
                  </div>
                  {[...Array(4).keys()].map((key) => (
                    <div key={key} className="hero-spacer" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
