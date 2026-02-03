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
    <div className="relative py-32.5 w-full">
      <div className="flex gap-2.5">
        <div className="flex flex-col md:flex-row gap-2.5 z-0  w-full h-auto">
          {/*Hero Image*/}
          <div className="flex-[1.9324] flex rounded-md overflow-hidden">
            <CloudinaryImage
              src={data.bio_picture_cloudinary_id}
              alt="Hero Image"
              width={500}
              height={500}
              className="w-full h-auto object-cover"
            />
          </div>

          {/*Hero Description*/}
          <div className="flex-[7.9] ">
            <div className="flex  flex-col gap-4">
              {/* Name and Social Icons Row */}
              <div className="flex gap-2.5 justify-start items-end">
                <div className="flex-1 flex flex-col justify-start">
                  <div className="font-heading text-3xl font-semibold text-primary">
                    {data.name}
                  </div>
                  <div className="font-sans text-lg">{data.name_subtext}</div>
                </div>
                <div className="flex-[3.15]"></div>
                <div className="flex-1 hidden md:flex justify-center items-center">
                  <Button variant={"ghost"}>
                    <Mail />
                  </Button>
                </div>
                <div className="flex-1 hidden md:flex justify-center items-center">
                  <Button variant={"ghost"}>
                    <Github />
                  </Button>
                </div>
                <div className="flex-1 hidden md:flex justify-center items-center">
                  <Button variant={"ghost"}>
                    <Linkedin />
                  </Button>
                </div>
                <div className="flex-1 hidden md:flex justify-center items-center">
                  <Button variant={"ghost"}>
                    <Instagram />
                  </Button>
                </div>
              </div>

              {/* Description */}
              <div className="font-sans text-lg">{data.hero_description}</div>

              {/* Bottom Buttons Row */}
              <div className="flex gap-2.5">
                <div className="flex-1 hidden md:flex justify-center items-center">
                  <Button variant={"ghost"}>
                    Work <ChevronRight />
                  </Button>
                </div>
                <div className="flex-1 hidden md:flex justify-center items-center">
                  <Button variant={"ghost"}>
                    Skills <ChevronRight />
                  </Button>
                </div>
                <div className="flex-1 hidden md:flex justify-center items-center">
                  <Button variant={"ghost"}>
                    Education <ChevronRight />
                  </Button>
                </div>
                <div className="flex-1 hidden md:flex justify-center items-center">
                  <Button variant={"ghost"}>
                    Resume <ArrowDownToLine />
                  </Button>
                </div>
                <div className="flex-[4.15]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
