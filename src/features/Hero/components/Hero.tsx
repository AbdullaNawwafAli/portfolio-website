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
import { heroData } from "../types/hero-data";

interface HeroProps {
  data: heroData;
}

const Hero = ({ data }: HeroProps) => {
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

export default Hero;
