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
import styles from "../styles/Hero.module.css";

interface HeroProps {
  data: heroData;
}

const Hero = ({ data }: HeroProps) => {
  return (
    <div className={styles["hero-container"]}>
      <div className={styles["hero-flex-wrapper"]}>
        <div className={styles["hero-inner"]}>
          {/*Hero Image*/}
          <div className={styles["hero-image-container"]}>
            <CloudinaryImage
              src={data.bio_picture_cloudinary_id}
              alt="Hero Image"
              width={500}
              height={500}
              className={styles["hero-image"]}
            />
          </div>

          {/*Hero Description*/}
          <div className={styles["hero-description-container"]}>
            <div className={styles["hero-content"]}>
              {/* Name and Social Icons Row */}
              <div className={styles["hero-name-row"]}>
                <div className={styles["hero-name"]}>{data.name}</div>
                <div className={styles["hero-social-row"]}>
                  <div className={styles["hero-name-subtext"]}>
                    {data.name_subtext}
                  </div>

                  {[...Array(3).keys()].map((key) => (
                    <div key={key} className={styles["hero-spacer"]} />
                  ))}

                  <div className={styles["hero-social-button"]}>
                    <Button variant={"ghost"}>
                      <Mail />
                    </Button>
                  </div>
                  <div className={styles["hero-social-button"]}>
                    <Button variant={"ghost"}>
                      <Github />
                    </Button>
                  </div>
                  <div className={styles["hero-social-button"]}>
                    <Button variant={"ghost"}>
                      <Linkedin />
                    </Button>
                  </div>
                  <div className={styles["hero-social-button"]}>
                    <Button variant={"ghost"}>
                      <Instagram />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className={styles["hero-body-container"]}>
                <div className={styles["hero-description-text"]}>
                  {data.hero_description}
                </div>

                {/* Bottom Buttons Row */}
                <div className="hero-bottom-row">
                  <div className={styles["hero-nav-button"]}>
                    <Button variant={"ghost"}>
                      Work <ChevronRight />
                    </Button>
                  </div>
                  <div className={styles["hero-nav-button"]}>
                    <Button variant={"ghost"}>
                      Skills <ChevronRight />
                    </Button>
                  </div>
                  <div className={styles["hero-nav-button"]}>
                    <Button variant={"ghost"}>
                      Education <ChevronRight />
                    </Button>
                  </div>
                  <div className={styles["hero-nav-button"]}>
                    <Button variant={"ghost"}>
                      Resume <ArrowDownToLine />
                    </Button>
                  </div>
                  {[...Array(4).keys()].map((key) => (
                    <div key={key} className={styles["hero-spacer"]} />
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
