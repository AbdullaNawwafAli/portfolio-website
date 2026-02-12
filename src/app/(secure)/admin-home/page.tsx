import AdminHero from "@/features/Hero/components/AdminHero";
import Hero from "@/features/Hero/components/AdminHero";
import { getBio } from "@/server/api-calls/bio";
import GithubLogoutButton from "@/ui/GithubLogoutButton";
import React from "react";

const AdminHomePage = async () => {
  const bioData = await getBio();
  return (
    <div className="flex flex-col gap-2 flex-1 h-full justify-between py-10 w-full">
      <AdminHero data={bioData} />
    </div>
  );
};

export default AdminHomePage;
