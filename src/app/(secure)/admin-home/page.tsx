import AdminHero from "@/features/Hero/components/AdminHero/AdminHero"
import { getQueryClient } from "@/features/TanStackQuery/getQueryClient"
import { getBioApi } from "@/lib/api-calls/bio"
import { getEducationApi } from "@/lib/api-calls/education"
import { getSkillsApi } from "@/lib/api-calls/skills"
import { getWorkApi } from "@/lib/api-calls/work"

const AdminHomePage = async () => {
  const queryClient = getQueryClient()

  await queryClient.prefetchQuery({
    queryKey: ["bio"],
    queryFn: () => getBioApi(),
  })

  queryClient.prefetchQuery({
    queryKey: ["education"],
    queryFn: () => getEducationApi(),
  })

  queryClient.prefetchQuery({
    queryKey: ["skills"],
    queryFn: () => getSkillsApi(),
  })

  queryClient.prefetchQuery({
    queryKey: ["work"],
    queryFn: () => getWorkApi(),
  })

  return (
    <div className="flex flex-col gap-2 flex-1 h-full justify-between py-10 w-full">
      <AdminHero />
    </div>
  )
}

export default AdminHomePage
