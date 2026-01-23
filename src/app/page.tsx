import { Button } from "@/ui/shadcn/button";
import Image from "next/image";

export default async function Home() {
  // const users= await getUsers();

  return (
    <div>
      <Button variant={"ghost"}>hello</Button>
      <Button>do da</Button>
      <div>
        <Image src={'navBarSVG.svg'} alt = {'here'} width={175} height={50}/>
      </div>
    </div>
  );
}
