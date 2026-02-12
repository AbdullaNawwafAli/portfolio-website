import {
  ArrowDownToLine,
  ChevronRight,
  Github,
  Instagram,
  Linkedin,
  Mail,
} from "lucide-react";
import CloudinaryImage from "@/ui/CloudinaryImage";
import { heroData } from "../types/hero-data";
import { Button } from "@/ui/shadcn/button";

interface AdminHeroProps {
  data: heroData;
}

const AdminHero = ({ data }: AdminHeroProps) => {
  return (
    <div className="hero-container">
      <div className="hero-flex-wrapper">
        <div className="hero-inner">
          {/*Hero Image*/}
          <div className="hero-image-container">
            <div className="w-full h-full relative  hover:cursor-pointer group">
              <CloudinaryImage
                src={data.bio_picture_cloudinary_id}
                alt="Hero Image"
                width={500}
                height={500}
                className="w-full h-auto object-cover transition-opacity duration-300 group-hover:opacity-30"
              />
              <div className="duration-300 opacity-0 absolute top-1/2 left-1/2  group-hover:opacity-100 transition-all color-bg  text-center -translate-x-1/2 -translate-y-1/2">
                EDIT
              </div>
            </div>
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
                    <Button variant={"ghost"}>
                      <Mail />
                    </Button>
                  </div>
                  <div className="hero-social-button">
                    <Button variant={"ghost"}>
                      <Github />
                    </Button>
                  </div>
                  <div className="hero-social-button">
                    <Button variant={"ghost"}>
                      <Linkedin />
                    </Button>
                  </div>
                  <div className="hero-social-button">
                    <Button variant={"ghost"}>
                      <Instagram />
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
                    <Button variant={"ghost"}>
                      Work <ChevronRight />
                    </Button>
                  </div>
                  <div className="hero-nav-button">
                    <Button variant={"ghost"}>
                      Skills <ChevronRight />
                    </Button>
                  </div>
                  <div className="hero-nav-button">
                    <Button variant={"ghost"}>
                      Education <ChevronRight />
                    </Button>
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
  );
};

export default AdminHero;
