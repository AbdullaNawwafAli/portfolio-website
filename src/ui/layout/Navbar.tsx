import Image from "next/image";
import { Button } from "../shadcn/button";
import { raleway } from "@/app/layout";

const Navbar = () => {
  return (
    <div className="flex  justify-between px-8 py-3 items-center">
      <div>
        <Image src={"navBarSVG.svg"} alt={"here"} width={175} height={50} />
      </div>
      <div className="flex gap-5">
        <div className="flex min-w-[129px] justify-end">
          <Button variant={"ghost"} className="">
          <span className={raleway.className}>Home</span>
          </Button>
        </div>
        <div className="flex min-w-[129px] justify-end">
          <Button variant={"ghost"} className="">
            <span className={raleway.className}>Projects</span>
          </Button>
        </div>
        <div className="flex min-w-[129px] justify-end">
          <Button variant={"ghost"} className="">
          <span className={raleway.className}>Hobbies</span>
          </Button>
        </div>
        <div className="flex min-w-[129px] justify-end">
          <Button variant={"ghost"} className="">
          <span className={raleway.className}>About Me</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
