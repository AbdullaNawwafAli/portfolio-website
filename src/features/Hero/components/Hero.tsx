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
          <div className="flex-[1.95] flex rounded-md overflow-hidden">
            <CloudinaryImage
              src={data.bio_picture_cloudinary_id}
              alt="Hero Image"
              width={500}
              height={500}
              className="w-full h-auto object-cover"
            />
          </div>

          {/*Hero Description*/}
          <div className="flex-[8] ">
            <div className="flex  flex-col ">
              {/* Name and Social Icons Row */}
              <div className="flex flex-col">
                <div className="font-heading text-3xl font-semibold text-primary">
                  {data.name}
                </div>
                <div className="flex gap-2.5 justify-start items-center">
                  <div className="flex-1 hidden md:flex font-sans text-lg">
                    {data.name_subtext}
                  </div>

                  {[...Array(3).keys()].map((key) => (
                    <div key={key} className="flex-[1]"></div>
                  ))}

                  <div className="flex-1 hidden md:flex justify-center items-center">
                    <Button variant={"ghost"} className="">
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
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1">
                <div className="font-sans text-lg">{data.hero_description}</div>

                {/* Bottom Buttons Row */}
                <div className="flex gap-2.5">
                  <div className="flex-[1] hidden md:flex justify-center items-center">
                    <Button variant={"ghost"}>
                      Work <ChevronRight />
                    </Button>
                  </div>
                  <div className="flex-[1] hidden md:flex justify-center items-center">
                    <Button variant={"ghost"}>
                      Skills <ChevronRight />
                    </Button>
                  </div>
                  <div className="flex-[1] hidden md:flex justify-center items-center">
                    <Button variant={"ghost"}>
                      Education <ChevronRight />
                    </Button>
                  </div>
                  <div className="flex-[1] hidden md:flex justify-center items-center">
                    <Button variant={"ghost"}>
                      Resume <ArrowDownToLine />
                    </Button>
                  </div>
                  {[...Array(4).keys()].map((key) => (
                    <div key={key} className="flex-[1]"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
