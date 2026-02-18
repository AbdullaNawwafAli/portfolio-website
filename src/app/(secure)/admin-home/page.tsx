import AdminHero from "@/features/Hero/components/AdminHero"
import { getBio } from "@/server/api-calls/bio"

const AdminHomePage = async () => {
  const bioData = await getBio()
  return (
    <div className="flex flex-col gap-2 flex-1 h-full justify-between py-10 w-full">
      <AdminHero data={bioData} />
    </div>
  )
}

export default AdminHomePage
