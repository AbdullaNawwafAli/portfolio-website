import AdminHero from "@/features/Hero/components/AdminHero"
import { getBioApi } from "@/lib/api-calls/bio"

const AdminHomePage = async () => {
  const bioData = await getBioApi()
  return (
    <div className="flex flex-col gap-2 flex-1 h-full justify-between py-10 w-full">
      <AdminHero data={bioData} />
    </div>
  )
}

export default AdminHomePage
