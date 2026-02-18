import { Button } from "./shadcn/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "./shadcn/card"
import Image from "next/image"

const Cards = () => {
  return (
    <div className="flex justify-between gap-2.5 h-[400px] items-end">
      {[...Array(5).keys()].map((key) => (
        <Card key={key} className="w-full flex align-center">
          <CardHeader className="flex justify-between">
            <CardTitle className="font-nav font-semibold text-lg text-center">
              0{key + 1}
            </CardTitle>
            <CardTitle className="font-nav font-semibold text-lg text-center">
              Software Project
            </CardTitle>
          </CardHeader>
          <div className="w-full rounded overflow-hidden">
            <Image
              src={"/stock.jpg"}
              alt={"Website logo/text"}
              width={200}
              height={200}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
          <CardContent className="flex justify-center"></CardContent>
          <CardFooter className="flex justify-between items-center">
            <span className="font-sans">21 April 2025</span>
            <Button
              variant={"ghost"}
              className="px-0 font-sans  text-background"
            >
              Sample Button
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

export default Cards
