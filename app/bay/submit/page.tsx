import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import SubmissionForm from "./form";
import { fetchHackatimeProjects } from "@/lib/hackatime";

export default async function Page() {
  const session = await getServerSession();

  if (session == null) redirect("/api/auth/signin");

  const user: { display: string; id: string } = session?.user
    ?.name as unknown as { display: string; id: string };

  return (
    <>
      <div className="text-center flex justify-center mx-6 my-8">
        <div>
          <h1 className="text-2xl font-semibold underline">Submission Page</h1>
          <span>Welcome, {user.display}!</span>

          <div className="flex justify-center">
            <p className="mr-4">Not you?</p>
            <Link
              href="/api/auth/signin"
              className="bg-indigo-500 hover:bg-indigo-700 text-white hover:underline rounded px-4 py-.5 hover:font-semibold"
            >
              Login
            </Link>
          </div>
        </div>
      </div>

      <SubmissionForm
        email={session.user!.email!}
        slackId={user.id}
        projects={await fetchHackatimeProjects(user.id)}
      ></SubmissionForm>
    </>
  );
}
