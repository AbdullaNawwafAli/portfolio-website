import { getProjects } from "@/server/queries/projects";
import Cards from "@/ui/Cards";
import Hero from "@/ui/Hero";

export default async function Home() {
  const getProj = await getProjects();
  console.log(getProj);

  return (
    <>
      <div className="flex flex-col gap-2 flex-1 h-full justify-between py-10 w-full">
        <Hero />
        <Cards />
      </div>
    </>
  );
}
