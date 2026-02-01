import {
  ArrowDownToLine,
  ChevronRight,
  Github,
  Instagram,
  Linkedin,
  Mail,
} from "lucide-react";
import CloudinaryImage from "./CloudinaryImage";
import { Button } from "./shadcn/button";

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
    <div className="flex flex-col md:flex-row items-start justify-between py-32.5 w-full">
      <div className="flex flex-col items-start justify-start w-full">
        <div className="flex justify-between items-center font-heading text-2xl font-semibold w-full">
          <div>{data.name}</div>
          {/* email/git/linkedin/insta icon buttons */}
          <div>
            <Button variant={"ghost"}>
              <Mail />
            </Button>
            <Button variant={"ghost"}>
              <Github />
            </Button>
            <Button variant={"ghost"}>
              <Linkedin />
            </Button>
            <Button variant={"ghost"}>
              <Instagram />
            </Button>
          </div>
        </div>
        <div>{data.name_subtext}</div>
        <div>{data.hero_description}</div>
        <div>
          <Button variant={"ghost"}>
            Work <ChevronRight />
          </Button>
          <Button variant={"ghost"}>
            Skills
            <ChevronRight />
          </Button>
          <Button variant={"ghost"}>
            Education
            <ChevronRight />
          </Button>
          <Button variant={"ghost"}>
            Resume
            <ArrowDownToLine />
          </Button>
        </div>
      </div>

      <CloudinaryImage
        src={data.bio_picture_cloudinary_id}
        alt="Hero Image"
        width={361}
        height={300}
      />
    </div>
  );
};

export default Hero;
