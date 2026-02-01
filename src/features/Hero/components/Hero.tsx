import {
  ArrowDownToLine,
  ChevronRight,
  Github,
  Instagram,
  Linkedin,
  Mail,
} from "lucide-react";
import CloudinaryImage from "../../../ui/CloudinaryImage";
import { Button } from "../../../ui/shadcn/button";

interface HeroProps {
  data: {
    name: string;
    name_subtext: string;
    hero_description: string;
    email: string;
    bio_picture_cloudinary_id: string;
    resume_pdf_cloudinary_id: string;
    instagram_url: string;
    linked_in_url: string;
  };
}

const Hero = ({ data }: HeroProps) => {
  return (
    <div className="flex flex-col md:flex-row items-start justify-between py-32.5 w-full gap-2.5">
      <CloudinaryImage
        src={data.bio_picture_cloudinary_id}
        alt="Hero Image"
        width={361}
        height={500}
      />
      <div className="flex flex-col items-start justify-start w-full gap-1">
        {/* Top Row Name and Social Icons */}
        <div className=" w-full flex flex-row justify-end items-center gap-2.5 ">
          <div className="flex flex-col box-border justify-center items-start w-[129px] h-full flex-auto self-stretch grow">
            <div className="h-full font-heading text-2xl font-semibold flex justify-center items-center">
              {data.name}
            </div>
            <div className="font-sans text-lg">{data.name_subtext}</div>
          </div>
          <div className="hidden md:flex box-border justify-end items-start gap-2.5 w-[129px] h-full flex-auto self-stretch grow"></div>
          <div className="hidden md:flex box-border justify-end items-start gap-2.5 w-[129px] h-full flex-auto self-stretch grow"></div>
          <div className="hidden md:flex box-border justify-end items-start gap-2.5 w-[129px] h-full flex-auto self-stretch grow"></div>
          <div className="hidden md:flex box-border justify-center items-start gap-2.5 w-[129px] h-full flex-auto self-stretch grow">
            <Button variant={"ghost"}>
              <Mail />
            </Button>
          </div>
          <div className="hidden md:flex box-border justify-center items-center gap-2.5 w-[129px] h-full flex-auto self-stretch grow">
            <Button variant={"ghost"}>
              <Github />
            </Button>
          </div>
          <div className="hidden md:flex box-border justify-center items-center gap-2.5 w-[129px] h-full flex-auto self-stretch grow">
            <Button variant={"ghost"}>
              <Linkedin />
            </Button>
          </div>
          <div className="hidden md:flex box-border justify-center items-center gap-2.5 w-[129px] h-full flex-auto self-stretch grow">
            <Button variant={"ghost"}>
              <Instagram />
            </Button>
          </div>
        </div>

        {/* Descriptions*/}
        <div className="font-sans text-lg">{data.hero_description}</div>

        {/* Bottom Row ButtonsS */}
        <div className="top-0 left-0 w-full flex flex-row justify-start items-center gap-2.5">
          <div className="hidden md:flex box-border justify-center items-start gap-2.5 w-[129px] h-full flex-auto self-stretch grow">
            <Button variant={"ghost"}>
              Work <ChevronRight />
            </Button>
          </div>
          <div className="hidden md:flex box-border justify-center items-start gap-2.5 w-[129px] h-full flex-auto self-stretch grow">
            <Button variant={"ghost"}>
              Skills
              <ChevronRight />
            </Button>
          </div>
          <div className="hidden md:flex box-border justify-center items-start gap-2.5 w-[129px] h-full flex-auto self-stretch grow">
            <Button variant={"ghost"}>
              Education
              <ChevronRight />
            </Button>
          </div>
          <div className="hidden md:flex box-border justify-center items-start gap-2.5 w-[129px] h-full flex-auto self-stretch grow">
            <Button variant={"ghost"}>
              Resume
              <ArrowDownToLine />
            </Button>
          </div>
          <div className="hidden md:flex box-border justify-end items-start gap-2.5 w-[129px] h-full flex-auto self-stretch grow"></div>
          <div className="hidden md:flex box-border justify-end items-start gap-2.5 w-[129px] h-full flex-auto self-stretch grow"></div>
          <div className="hidden md:flex box-border justify-end items-start gap-2.5 w-[129px] h-full flex-auto self-stretch grow"></div>
          <div className="hidden md:flex box-border justify-end items-start gap-2.5 w-[129px] h-full flex-auto self-stretch grow"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
