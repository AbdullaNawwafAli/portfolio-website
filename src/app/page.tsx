import Hero from "@/features/Hero/features/Hero/features/Hero/components/Hero"
import { getBioApi } from "../features/Hero/features/Hero/services/bio"
import AdminPageCards from "@/features/Projects/components/AdminPageCards"

export default async function Home() {
  const bioData = await getBioApi()

  return (
    <>
      <div className="flex flex-col gap-2 flex-1 h-full justify-between py-10 w-full">
        <Hero data={bioData} />
        <AdminPageCards />
      </div>
    </>
  )
}
