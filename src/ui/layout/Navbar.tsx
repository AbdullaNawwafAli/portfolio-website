import Image from "next/image";
import { Button } from "../shadcn/button";
import { ralewayNav } from "@/app/layout";
import { ReactNode } from "react";

//styles
const navBarButtonStyle = "hidden md:flex box-border justify-end items-start gap-2.5 w-[129px] h-full flex-auto self-stretch grow"
interface NavBarProps {
  children: ReactNode;
}

const Navbar = ({ children }: NavBarProps) => {
  const navBarButtons = [{ label: "Home", route: '/' }, { label: "Projects", route: '/' }, { label: "Hobbies", route: '/' }, { label: "About Me", route: '/' }]

  return (<>

    <div className="top-0 left-0 w-full flex flex-row justify-start items-center gap-2.5">

      {/* Logo in invisible column*/}
      <div className="box-border flex flex-row justify-start items-center md:w-[129px] h-full flex-auto grow">
        <Image src={"navBarSVG.svg"} alt={"here"} width={175} height={100} style={{ minWidth: 175, objectFit: 'contain' }} />
      </div>

      {/*Invisible columns to pad so that it makes sure Navbar UI elements stay in line with columns in background*/}
      {[...Array(5).keys()].map((key) => (
        <div className={navBarButtonStyle} key={key}>
        </div>
      ))}

      {/*Buttons in invisible columns*/}
      {navBarButtons.map((button) => (
        <div className={navBarButtonStyle} key={button.label}>
          <Button variant={"ghost"} className="px-0">
            <span className={ralewayNav.className}>{button.label}</span>
          </Button>
        </div>
      ))}
    </div>

    {children}

    {/* Mobile Navbar */}
    <div className="top-0 left-0 w-full flex flex-row justify-start items-center gap-2.5">
      {navBarButtons.map((button) => (
        <div className="flex md:hidden box-border justify-end items-start gap-2.5 w-[129px] h-full flex-auto self-stretch grow" key={button.label}>
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
