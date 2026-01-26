import Hero from "@/features/Hero/components/Hero";
import { Button } from "@/ui/shadcn/button";

export default async function Home() {


  return <>
    <div>
      <Hero />
      <Button>Click Me</Button>
    </div>
  </>;
}