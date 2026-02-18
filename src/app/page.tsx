import { getBio } from "@/server/api-calls/bio"
import { getProjects } from "@/server/db/queries/projects"
import Cards from "@/ui/Cards"
import Hero from "@/features/Hero/components/AdminHero"

export default async function Home() {
  const bioData = await getBio()
  console.log(bioData)

  return (
    <>
      <div className="flex flex-col gap-2 flex-1 h-full justify-between py-10 w-full">
        <Hero data={bioData} />
        <Cards />
      </div>
    </>
  )
}
