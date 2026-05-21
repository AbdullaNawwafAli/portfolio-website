import Image from "next/image"
import { Button } from "../../../ui/shadcn/button"
import { ReactNode } from "react"
import Link from "next/link"

interface NavBarProps {
  children: ReactNode
}

const Navbar = ({ children }: NavBarProps) => {
  const navBarButtons = [
    { label: "Projects", route: "/projects" },
    { label: "Home", route: "/" },
  ]

  return (
    <>
      <div className="navbar-container">
        {/* Logo in invisible column*/}
        <div className="logo-container">
          <Image
            src={"/navBarSVG.svg"}
            alt={"Website logo/text"}
            loading="eager"
            priority
            width={175}
            height={100}
            style={{ width: "100%", height: "auto" }}
          />
        </div>

        {/*Invisible columns to pad so that it makes sure Navbar UI elements stay in line with columns in background*/}
        {[...Array(7).keys()].map((key) => (
          <div className="navbar-button-container" key={key}></div>
        ))}

        {/*Buttons in invisible columns*/}
        {navBarButtons.map((button) => (
          <div className="navbar-button-container" key={button.label}>
            <Button
              variant={"ghost"}
              className="px-0 font-nav font-semibold hover:bg-transparent"
              asChild
            >
              <Link href={button.route}>{button.label}</Link>
            </Button>
          </div>
        ))}
      </div>

      {children}

      {/* Mobile Navbar */}
      <div className="navbar-container">
        {navBarButtons.map((button) => (
          <div className="mobile-navbar-button-container" key={button.label}>
            <Button
              variant={"ghost"}
              className="px-0 font-nav font-semibold"
              asChild
            >
              <Link href={button.route}>{button.label}</Link>
            </Button>
          </div>
        ))}
      </div>
    </>
  )
}

export default Navbar
