import Image from "next/image";
import { Button } from "../shadcn/button";
import {ralewayNav } from "@/app/layout";

const Navbar = () => {
  return (
    <>
      <div className="flex w-full justify-between px-[30px] py-2 items-center">
        <div>
          <Image src={"navBarSVG.svg"} alt={"here"} width={175} height={50} />
        </div>
        <div className="hidden md:flex gap-[20px]">
          <div className="flex w-[129px] justify-end">
            <Button variant={"ghost"} className="px-0">
              <span className={ralewayNav.className}>Home</span>
            </Button>
          </div>
          <div className="flex w-[129px] justify-end">
            <Button variant={"ghost"} className="px-0">
              <span className={ralewayNav.className}>Projects</span>
            </Button>
          </div>
          <div className="flex w-[129px] justify-end">
            <Button variant={"ghost"} className="px-0">
              <span className={ralewayNav.className}>Hobbies</span>
            </Button>
          </div>
          <div className="flex w-[129px] justify-end">
            <Button variant={"ghost"} className="px-0">
              <span className={ralewayNav.className}>About Me</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
