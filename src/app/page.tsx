import Cards from "@/ui/Cards";
import Hero from "@/ui/Hero";

export default async function Home() {
  return (
    <>
      <div className="flex flex-col gap-2 flex-1 h-full justify-between py-10 w-full">
        <Hero />
        <Cards />
      </div>
    </>
  );
}
