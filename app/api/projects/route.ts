import { fetchHackatimeProjects } from "@/lib/hackatime";

export async function GET(request: Request) { 
    const josiasSlackID = "U01PJ08PR7S";
    const hackatimeProjects = await fetchHackatimeProjects(josiasSlackID);

    return Response.json(hackatimeProjects);
}