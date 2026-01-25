import Image from "next/image";
import { Button } from "../shadcn/button";
import { ralewayNav } from "@/app/layout";


const navBarButtonStyle = "hidden md:flex box-border justify-end items-start gap-2.5 w-[129px] h-full flex-auto self-stretch grow"

const Navbar = () => {
  const navBarButtons = [{ label: "Home", route: '/' }, { label: "Projects", route: '/' }, { label: "Hobbies", route: '/' }, { label: "About Me", route: '/' }]

  return (
    <div className="fixed top-0 left-0 w-full flex flex-row justify-start items-start p-[10px_30px] gap-2.5 z-1">

      {/* Logo in invisible column*/}
      <div className="box-border flex flex-row justify-start items-start gap-2.5 w-[20px] md:w-[129px] h-full flex-auto self-stretch grow">
        <Image src={"navBarSVG.svg"} alt={"here"} width={200} height={50} style={{ minWidth: 175, objectFit:'contain'}} />
      </div>

      {/*Invisible columns to make sure buttons and navbar stay in position regardless of screen size*/}
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
  );
};

export default Navbar;
