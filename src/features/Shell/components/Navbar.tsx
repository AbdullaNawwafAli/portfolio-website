import Image from "next/image";
import { Button } from "../../../ui/shadcn/button";
import { ralewayNav } from "@/app/layout";
import { ReactNode } from "react";


interface NavBarProps {
  children: ReactNode;
}

const Navbar = ({ children }: NavBarProps) => {
  const navBarButtons = [{ label: "Home", route: '/' }, { label: "Projects", route: '/' }, { label: "Hobbies", route: '/' }, { label: "About Me", route: '/' }]

  return (<>

    <div className="navBarContainer">

      {/* Logo in invisible column*/}
      <div className="logoContainer">
        <Image src={"navBarSVG.svg"} alt={"here"} width={175} height={100} style={{ minWidth: 175, objectFit: 'contain' }} />
      </div>

      {/*Invisible columns to pad so that it makes sure Navbar UI elements stay in line with columns in background*/}
      {[...Array(5).keys()].map((key) => (
        <div className="navBarButtonContainer" key={key}>
        </div>
      ))}

      {/*Buttons in invisible columns*/}
      {navBarButtons.map((button) => (
        <div className="navBarButtonContainer" key={button.label}>
          <Button variant={"ghost"} className="px-0">
            <span className={ralewayNav.className}>{button.label}</span>
          </Button>
        </div>
      ))}
    </div>

    {children}

    {/* Mobile Navbar */}
    <div className="navBarContainer">
      {navBarButtons.map((button) => (
        <div className="mobileNavBarButtonContainer" key={button.label}>
          <Button variant={"ghost"} className="px-0">
            <span className={ralewayNav.className}>{button.label}</span>
          </Button>
        </div>
      ))}
    </div>
  </>
  );
};

export default Navbar;
