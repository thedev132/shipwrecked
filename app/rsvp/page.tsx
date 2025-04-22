import ProgressBar from "@/components/common/ProgressBar";
import { getServerSession } from "next-auth";
import { opts } from "@/app/api/auth/[...nextauth]/route";
import Form from "./form";

// Registration Page (/bay/intro/register)
// Guides the user to fill out a registration form
export default async function Page() {
  const session = await getServerSession(opts);

  return (
      <div className="flex w-screen h-screen flex-col items-center justify-center w-[100vw] bg-[url(/hut.png)] bg-no-repeat bg-cover py-12">
        <Form/>
      </div>
  );
}
