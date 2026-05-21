import Hero from "@/features/Hero/features/Hero/components/Hero"
import { getBioApi } from "@/features/Hero/services/bio"
import AdminPageCards from "@/features/Projects/components/AdminPageCards"
import PageLayoutWrapper from "@/ui/wrappers/PageLayoutWrapper"

export default async function Home() {
  const bioData = await getBioApi()

  return (
    <PageLayoutWrapper className="gap-2 justify-between">
      <Hero data={bioData} />
      <AdminPageCards />
    </PageLayoutWrapper>
  )
}
