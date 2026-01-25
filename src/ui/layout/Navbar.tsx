import Image from "next/image";
import { Button } from "../shadcn/button";
import { ralewayNav } from "@/app/layout";

const Navbar = () => {
  const keys = [...Array(5).keys()]

  const navBarButtons = [{ label: "Home", route: '/' }, { label: "Projects", route: '/' }, { label: "Hobbies", route: '/' }, { label: "About Me", route: '/' }]
  return (
      <div className="navbar-container">

        {/* Logo in invisible column*/}
        <div className="navbar-logo">
          <Image src={"navBarSVG.svg"} alt={"here"} width={175} height={50} />
        </div>

        {/*invisible columns to make sure buttons and navbar stay in position regardless of screen size*/}
        {keys.map((key) => (
          <div className="navbar-buttons" key={key}>
          </div>
        ))}

        {/*buttons in invisible columns*/}
        {navBarButtons.map((button) => (
          <div className="navbar-buttons" key={button.label}>
            <Button variant={"ghost"} className="px-0">
              <span className={ralewayNav.className}>{button.label}</span>
            </Button>
          </div>
        ))}
      </div>
  );
};

export default Navbar;
