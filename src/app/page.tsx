import { getUsers } from "@/server/queries/users";
import { Button } from "@/ui/shadcn/button";

export default async function Home() {
  const users= await getUsers();

  return (
    <div>
      <Button>
        hello
      </Button>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </div>
  );
}
