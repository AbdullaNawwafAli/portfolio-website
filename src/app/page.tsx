import Hero from "@/ui/Hero";
import { Button } from "@/ui/shadcn/button";
import { Card, CardContent } from "@/ui/shadcn/card";
import Image from "next/image";

export default async function Home() {
  return (
    <>
      <div>
        <Hero />
        <Button>Click Me</Button>
        <div className="flex justify-between gap-2.5  ">
          {[...Array(5).keys()].map((key) => (
            <Card key={key} className="w-full ">
              <CardContent>
                <Image
                  src={"navBarSVG.svg"}
                  alt={"Website logo/text"}
                  width={175}
                  height={100}
                  style={{ minWidth: 175, objectFit: "contain" }}
                />
              </CardContent>{" "}
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
