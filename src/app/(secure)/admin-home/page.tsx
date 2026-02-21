"use client"
import AdminHero from "@/features/Hero/components/AdminHero"
import createBioQueryOptions from "@/lib/TanstackQueries/createBioQueryOptions"
import { useQuery } from "@tanstack/react-query"

const AdminHomePage = () => {
  const { data, isPending } = useQuery(createBioQueryOptions())

  return (
    <div className="flex flex-col gap-2 flex-1 h-full justify-between py-10 w-full">
      <AdminHero data={data} />
    </div>
  )
}

export default AdminHomePage
